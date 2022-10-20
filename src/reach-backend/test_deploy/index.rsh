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

    // To set the state
    state: UInt,
};

const DetailsStruct = Struct([
    ['name', Bytes(128)],
    ['buyerAddress', Address],
    ['supplierAddress', Address],
    ['state', UInt],
]);




export const main = Reach.App(()=> {

    // Participant for deploying
    const Buyer = Participant("Buyer", {
        details: DetailsStruct,             // The values used to initialize when deploying the contract
        launched: Fun([Contract], Null),    // To inform the participant that the contract has been deployed, and giving it the contract's address
    });
    // API
    const Seller = API("Seller", {
        addIngredient: Fun([Contract], Null),   // An API that allows the seller to add ingredient contract address
    });
    // Views
    const Explorer = View('Explorer', {
        details: DetailsStruct,
        listOfIngredients: Array( Contract, 10 ),
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
    // Inform the deployer that the contract is deployed
    Buyer.interact.launched( getContract() );
    // Setting the views value
    Explorer.details.set(details);
    Explorer.rejectReason.set( Bytes(128).pad("Too salty. I Reject") );
    // I am setting all the times to the time when the contract is deployed.
    // In actual implementation, do set these times realistically.
    Explorer.deployedNetworkTime.set( thisConsensusTime() );
    Explorer.reviewedNetworkTime.set( thisConsensusTime() );
    Explorer.deliveredNetworkTime.set( thisConsensusTime() );


    // The array of ingredients, which is array of contract addresses
    // I am setting here to the current contract address as default value, and maximum size of 10
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