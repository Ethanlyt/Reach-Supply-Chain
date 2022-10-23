'reach 0.1';
'use strict';

const [
    isState,
    PENDING_REVIEW,
    APPROVED,
    REJECTED,
    DELIVERED
] = makeEnum(4);




export const main = Reach.App(()=> {

    // Deployer - The Buyer/Importer
    const Buyer = Participant("Buyer", {
        details: Object({
            name: Bytes(128),
            supplierAddress: Address,
        }),
        launched: Fun([Contract], Null),    // To inform the participant that the contract has been deployed, and giving it the contract's address
    });


    // API
    const SellerAPI = API("SellerAPI", {
        addIngredient: Fun([Contract], Null),
        approve: Fun([], Null),
        reject: Fun([Bytes(128)], Null),
    });

    const BuyerAPI = API("BuyerAPI", {
        delivered: Fun([], Null),
    });


    // Views
    const Explorer = View('Explorer', {
        name: Bytes(128),
        buyerAddress: Address,
        supplierAddress: Address,

        state: UInt,
        listOfIngredients: Array( Contract, 10 ),
        rejectReason: Bytes(128),

        deployedNetworkTime: UInt,
        reviewedNetworkTime: UInt,
        deliveredNetworkTime: UInt,
    });
    init();


    Buyer.only(()=> {
        const { name, supplierAddress } = declassify(interact.details);
    });
    Buyer.publish(name, supplierAddress);

    // Inform the deployer that the contract is deployed
    Buyer.interact.launched( getContract() );
    // Setting the views value
    Explorer.name.set(name);
    Explorer.buyerAddress.set(Buyer);
    Explorer.supplierAddress.set(supplierAddress);
    Explorer.deployedNetworkTime.set( thisConsensusTime() );
    Explorer.reviewedNetworkTime.set(0);
    Explorer.deliveredNetworkTime.set(0);


    // The array of ingredients, which is array of contract addresses
    // I am setting here to the current contract address as default value, and maximum size of 10
    const ingredientContractArray = array(Contract, [
        getContract(), getContract(),
        getContract(), getContract(),
        getContract(), getContract(),
        getContract(), getContract(),
        getContract(), getContract(),
    ]);



    const [ listOfIngredients, count, state, rejectReason, reviewedNetworkTime ] = 
        parallelReduce( [ingredientContractArray, 0, PENDING_REVIEW, Bytes(128).pad(""), 0 ] )
        .invariant( balance() === 0 )
        .invariant( isState(state) )
        .define(()=> {
            Explorer.listOfIngredients.set(listOfIngredients);
            Explorer.state.set(state);
            Explorer.rejectReason.set(rejectReason);
            Explorer.reviewedNetworkTime.set(reviewedNetworkTime);
        })
        .while( state === PENDING_REVIEW )
        .api_(SellerAPI.addIngredient, (ingredient)=> {
            check(this === supplierAddress, "Unauthorized. Your wallet address does not match the supplier's address.");
            check( count < 10, "Bad Request. The total number of ingredients cannot exceed 10" );

            return [ 0, (ret)=> {
                ret(null);
                return [ listOfIngredients.set(count, ingredient), count + 1, state, rejectReason, reviewedNetworkTime ];
            }];
        })
        .api_(SellerAPI.approve, () => {
            check(this === supplierAddress, "Unauthorized. Your wallet address does not match the supplier's address.");

            return [0, (ret)=> {
                ret(null);
                return [ listOfIngredients, count, APPROVED, rejectReason, thisConsensusTime() ];
            }];
        })
        .api_(SellerAPI.reject, (reason) => {
            check(this == supplierAddress, "Unauthorized. Your wallet address does not match the supplier's address.");

            return [0, (ret)=> {
                ret(null);
                return [listOfIngredients, count, REJECTED, reason, thisConsensusTime() ];
            }];
        });
    

        
    const [ state2, deliveredNetworkTime ] = 
        parallelReduce( [state, 0] )
        .invariant( balance() === 0 )
        .invariant( isState(state) )
        .define(()=> {
            Explorer.state.set(state2);
            Explorer.deliveredNetworkTime.set(deliveredNetworkTime);
        })
        .while( true )
        .api_(BuyerAPI.delivered, () => {
            check(this == Buyer, "Unauthorized. Your wallet address does not match the buyer's address.");
            check(state == APPROVED, "Bad Request. You can only finalize a contract that is already approved by supplier.");

            return [0, (ret)=> {
                ret(null);
                return [DELIVERED, thisConsensusTime() ];
            }];
        });

    commit();
    exit();
});