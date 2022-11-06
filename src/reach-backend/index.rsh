'reach 0.1';
'use strict';

// Author: Jing Ling, Yi Chen, AdmiJW
//
// The contract representing a flow of ingredient from the supplier to its buyer.
//
// The flow goes as follows:
//      1. Buyer creates a contract with the ingredient's details and the supplier's address.
//      2. Supplier views the contract, accepts it, and adds the ingredient to the contract. (Or rejects it)
//      3. Buyer receives the goods and finally mark the contract as delivered.
//
// The highlight of this contract is that the ingredient also records a list of parent ingredient's contract address.
// Therefore the entirety of the ingredient's history can be traced back to the core ingredient.
// Imagine 4 contracts:
//      
//                  (Oil)--
//                         \
//      (Wheat)--->(Flour)--->(Bread)
//
// Recording the parent ingredient's contract address allows us to trace the ingredient's history. If I am viewing the
// Bread's contract, I can trace the parent ingredients: Oil, Flour, and Wheat.



// The contract is going to have 4 states:
//
// (Buyer deploy)--->(Pending Review)--->(Accepted)--->(Delivered)
//                              \
//                               \--->(Rejected)
const [
    isState,
    PENDING_REVIEW,
    APPROVED,
    REJECTED,
    DELIVERED
] = makeEnum(4);




export const main = Reach.App(()=> {

    // Contract Deployer - The Buyer/Importer
    const Buyer = Participant("Buyer", {
        details: Object({
            name: Bytes(128),
            supplierAddress: Address,
        }),
        // To inform the participant that the contract has been deployed, 
        // and returning to it the contract's address
        launched: Fun([Contract], Null),    
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


    // Views, publicly available to see the contract's state and details on the order
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


    // Step 1: Buyer deploys the contract and provide the name of goods as well as 
    //         the supplier's wallet address.
    Buyer.only(()=> {
        const { name, supplierAddress } = declassify(interact.details);
    });
    Buyer.publish(name, supplierAddress);

    // Inform the deployer that the contract is deployed
    Buyer.interact.launched( getContract() );
    // Setting the initial views value
    Explorer.name.set(name);
    Explorer.buyerAddress.set(Buyer);
    Explorer.supplierAddress.set(supplierAddress);
    Explorer.deployedNetworkTime.set( thisConsensusTime() );
    Explorer.reviewedNetworkTime.set(0);
    Explorer.deliveredNetworkTime.set(0);


    // The array of ingredients, which is array of contract addresses
    // The array is hardcoded to size 10, which means a contract cannot have more than 10 other ingredients
    // The default value for the array is this contract's address, which will be ignored by the frontend.
    // When the supplier adds an ingredient, the contract address will be overwritten to the new one.
    const ingredientContractArray = array(Contract, [
        getContract(), getContract(),
        getContract(), getContract(),
        getContract(), getContract(),
        getContract(), getContract(),
        getContract(), getContract(),
    ]);


    // Provide API for the supplier to either approve or reject the contract.
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
        // API for supplier to add ingredient
        .api_(SellerAPI.addIngredient, (ingredient)=> {
            check(this === supplierAddress, "Unauthorized. Your wallet address does not match the supplier's address.");
            check( count < 10, "Bad Request. The total number of ingredients cannot exceed 10" );
            
            // The variable `count` is used to keep track of how many ingredients have been added,
            // and the index of the array to be overwritten if new ingredient is added.
            return [ 0, (ret)=> {
                ret(null);
                return [ listOfIngredients.set(count, ingredient), count + 1, state, rejectReason, reviewedNetworkTime ];
            }];
        })
        // API for supplier to approve the contract
        .api_(SellerAPI.approve, () => {
            check(this === supplierAddress, "Unauthorized. Your wallet address does not match the supplier's address.");
3
            return [0, (ret)=> {
                ret(null);
                return [ listOfIngredients, count, APPROVED, rejectReason, thisConsensusTime() ];
            }];
        })
        // API for supplier to reject the contract
        .api_(SellerAPI.reject, (reason) => {
            check(this == supplierAddress, "Unauthorized. Your wallet address does not match the supplier's address.");

            return [0, (ret)=> {
                ret(null);
                return [listOfIngredients, count, REJECTED, reason, thisConsensusTime() ];
            }];
        });
    

    
    // After contract is approved, this API loop allows the buyer to mark the contract as delivered.
    // However, the loop is set to never end to ensure the contract is never self destructed so that
    // the data of the contract remains available to the public.
    const [ state2, deliveredNetworkTime ] = 
        parallelReduce( [state, 0] )
        .invariant( balance() === 0 )
        .invariant( isState(state) )
        .define(()=> {
            Explorer.state.set(state2);
            Explorer.deliveredNetworkTime.set(deliveredNetworkTime);
        })
        // Infinite loop to ensure the contract is never self destructed
        .while( true )
        // API for buyer to mark the contract as delivered
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