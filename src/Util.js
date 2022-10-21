// * Main utilities and functions to interact with the backend and reach standard library



import { loadStdlib, ALGO_MyAlgoConnect } from "@reach-sh/stdlib";
import * as backend from "./reach-backend/index.main.mjs";


export const CONTRACT_STATES = {
    0: "Pending Supplier's Review",
    1: "Approved",
    2: "Rejected",
    3: "Delivered",
};



export const stdlib = loadStdlib({
    ...process.env,
    'REACH_CONNECTOR_MODE': 'ALGO',
});

stdlib.setWalletFallback(stdlib.walletFallback({
    providerEnv: 'TestNet', ALGO_MyAlgoConnect,
}));


export function deployContract(account) {
    return account.contract(backend);
}

// Atomic unit to standard
export function formatCurrency(amount) {
    if ( isNaN(amount) ) return '-';
    return stdlib.formatCurrency(amount, 4);
}


// Standard to atomic unit
export function parseCurrency(amount) {
    if ( isNaN(amount) ) return 0;
    return stdlib.parseCurrency(amount);
}


// Get balance of provided account (address)
export async function getBalance(account) {
    return formatCurrency(await stdlib.balanceOf(account) );
}



export async function getContractHandler(account, ctcInfo) {
    if (!account) return await stdlib.contract(backend, ctcInfo);
    return account.contract( backend, ctcInfo );
}


// On Etherium, contractInfo is a string, return as it is.
// On Algorand, contractInfo is an BigNumber object, return after parseInt.
export function parseAddress(address) {
    if (typeof address === 'string') return address;
    if (address.type === 'BigNumber') return address.hex;
    if (address._isBigNumber) return address._hex;
    throw new Error("Unknown address type: " + address);
}


export async function networkTimeToDateString(networkTime) {
    if (parseInt(networkTime) <= 0) return "N/A";
    const secs = parseInt( await stdlib.getTimeSecs( networkTime ) );
    return new Date(secs * 1000).toLocaleString();
}


export async function getContractViews({ account, ctcInfo, ctc }) {
    if (!ctc) ctc = await getContractHandler(account, ctcInfo);
    const details = await ctc.unsafeViews.Explorer.details();


    return {
        name: details.name,
        buyerAddress: details.buyerAddress,
        supplierAddress: details.supplierAddress,
        contractAddress: parseAddress( await ctc.getInfo() ),
        state: parseInt( await ctc.unsafeViews.Explorer.state() ),
        listOfIngredients: (await ctc.unsafeViews.Explorer.listOfIngredients() ).map(parseAddress),
        rejectReason: await ctc.unsafeViews.Explorer.rejectReason(),
        // deployedNetworkTime: parseInt(await ctc.unsafeViews.Explorer.deployedNetworkTime() ),
        deployedNetworkTime: await networkTimeToDateString( await ctc.unsafeViews.Explorer.deployedNetworkTime() ),
        reviewedNetworkTime: await networkTimeToDateString( await ctc.unsafeViews.Explorer.reviewedNetworkTime() ),
        deliveredNetworkTime: await networkTimeToDateString( await ctc.unsafeViews.Explorer.deliveredNetworkTime() ),
    };
}


