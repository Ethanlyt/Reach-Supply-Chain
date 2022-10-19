// * Main utilities and functions to interact with the backend and reach standard library



import { loadStdlib, ALGO_MyAlgoConnect } from "@reach-sh/stdlib";
import * as backend from "./reach-backend/index.main.mjs";


const CONTRACT_STATES = {
    0: "Pending Supplier's Review",
    1: "Approved",
    2: "Rejected",
    3: "Delivered",
};



export const stdlib = loadStdlib({
    ...process.env,
    // 'REACH_CONNECTOR_MODE': 'ALGO',
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


export async function getContractViews(account, ctcInfo, parentAddress) {
    let ctc;
    if (account) ctc = await account.contract( backend, ctcInfo );
    else ctc = await stdlib.contract(backend, ctcInfo);

    return {
        name: await ctc.v.Explorer.name(),
        buyerAddress: await ctc.v.Explorer.buyerAddress(),
        supplierAddress: await ctc.v.Explorer.supplierAddress(),
        listOfIngredients: await ctc.v.Explorer.listOfIngredients(),
        rejectReason: await ctc.v.Explorer.rejectReason(),
        state: await ctc.v.Explorer.state(),
        parent: parentAddress,
    };
}
