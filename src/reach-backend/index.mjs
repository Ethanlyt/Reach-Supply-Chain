import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);



async function getContractViews(ctc) {
    console.log("============== View ==============");
    console.log("Name: " + await ctc.unsafeViews.Explorer.name() );
    console.log("Buyer Address: " + await ctc.unsafeViews.Explorer.buyerAddress() );
    console.log("Supplier Address: " + await ctc.unsafeViews.Explorer.supplierAddress() );
    console.log("State: " + await ctc.unsafeViews.Explorer.state() );
    console.log("List of Ingredients: " + await ctc.unsafeViews.Explorer.listOfIngredients() );
    console.log("Reject Reason: " + await ctc.unsafeViews.Explorer.rejectReason() );
    console.log("Deployed Network Time: " + await ctc.unsafeViews.Explorer.deployedNetworkTime() );
    console.log("Reviewed Network Time: " + await ctc.unsafeViews.Explorer.reviewedNetworkTime() );
    console.log("Delivered Network Time: " + await ctc.unsafeViews.Explorer.deliveredNetworkTime() );
    console.log("==================================\n");
}


const sbal = stdlib.parseCurrency(100);
const testAcc1 = await stdlib.newTestAccount(sbal);
const testAcc2 = await stdlib.newTestAccount(sbal);

const addr1 = testAcc1.getAddress();
const addr2 = testAcc2.getAddress();

console.log("Buyer address: " + addr1);
console.log("Supplier address: " + addr2 + "\n");

const acc1Ctc =  testAcc1.contract(backend);


const ctcInfo = await stdlib.withDisconnect(()=> acc1Ctc.p.Buyer({
    details: {
        name: "Carrot",
        supplierAddress: addr2,
    }, 
    launched: stdlib.disconnect,
}));

const acc2Ctc = testAcc2.contract(backend, ctcInfo);

console.log("Contract launched. Info: " + ctcInfo);
await getContractViews(acc1Ctc);
console.log();

await acc2Ctc.a.SellerAPI.addIngredient(1);
await acc2Ctc.a.SellerAPI.addIngredient(2);
await acc2Ctc.a.SellerAPI.addIngredient(3);
await acc2Ctc.a.SellerAPI.approve();

await getContractViews(acc1Ctc);

await acc1Ctc.a.BuyerAPI.delivered();

await getContractViews(acc2Ctc);