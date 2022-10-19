'reach 0.1';
'use strict';

const [ 
    isState, 
    PENDING_REVIEW, 
    APPROVED, 
    REJECTED, 
    DELIVERED 
] = makeEnum(4);



const DetailInterface = {
    name: Bytes(128),
    buyerAddress: Address,
    supplierAddress: Address,
};

const DetailsStruct = Struct([
    ['name', Bytes(128)],
    ['buyerAddress', Address],
    ['supplierAddress', Address],
]);




export const main = Reach.App(()=> {

    const Buyer = Participant("Buyer", {
        details: DetailsStruct,
        launched: Fun([], Null),
    });
    const Seller = API("Seller", {
        addIngredient: Fun([Contract], Null),
    });
    const Explorer = View('Explorer', {
        details: DetailsStruct,
        listOfIngredients: Array( Contract, 10 ),
        state: UInt,
        rejectReason: Bytes(128),
        deployedNetworkTime: UInt,
        reviewedNetworkTime: UInt,
        deliveredNetworkTime: UInt,
    });
    init();


    Buyer.only(()=> {
        const details = declassify(interact.details);
    });
    Buyer.publish(details);
    Buyer.interact.launched();
    Explorer.details.set(details);
    Explorer.state.set(PENDING_REVIEW);
    Explorer.rejectReason.set( Bytes(128).pad("Too salty. I Reject") );
    // I am setting all the times to the time when the contract is deployed.
    // In actual implementation, do set these times realistically.
    Explorer.deployedNetworkTime.set( thisConsensusTime() );
    Explorer.reviewedNetworkTime.set( thisConsensusTime() );
    Explorer.deliveredNetworkTime.set( thisConsensusTime() );


    // The array of ingredients, which is contract by itself
    // I am setting here to the current contract address as default value.
    const ingredientContractArray = array(Contract, [
        getContract(), getContract(),
        getContract(), getContract(),
        getContract(), getContract(),
        getContract(), getContract(),
        getContract(), getContract(),
    ]);


    const [listOfIngredients, count] = 
        parallelReduce( [ingredientContractArray, 0 ])
        .invariant(balance() === 0)
        .define(()=> {
            Explorer.listOfIngredients.set(listOfIngredients);
        })
        .while( true )
        .api_(Seller.addIngredient, (ingredient)=> {
            check( count < 10, "Number of ingredients cannot exceed 10" );

            return [ 0, (ret)=> {
                ret(null);
                return [ listOfIngredients.set(count, ingredient), count + 1 ];
            }];
        });

    commit();
    exit();
});