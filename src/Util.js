// ? Author: AdmiJW, Ethanlyt
// ?
// ? This module export functions and data that interact with the reach backend 



import { loadStdlib, ALGO_MyAlgoConnect } from "@reach-sh/stdlib";
import * as backend from "./reach-backend/index.main.mjs";
import QrCode from "qrcode";


const QRCODE_OPTIONS = {
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
}


export const STATE_COLORS = {
    0: "#2196f3",
    1: "#4caf50",
    2: "#aa2e25",
    3: "#357a38"
};

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


// .env should have two links: REACT_APP_DEV_URL and REACT_APP_PROD_LINK
// Retrieves the one that matches the current environment
export function getAppLink() {
    const { REACT_APP_DEV_URL, REACT_APP_PROD_LINK } = process.env;
    return process.env.NODE_ENV === 'development' ? REACT_APP_DEV_URL : REACT_APP_PROD_LINK;
}


// Get a QR code in the form of Data URL, which can be set as <img>'s src attribute
export async function getQrCodeDataUrl(data) {
    return await QrCode.toDataURL(data, QRCODE_OPTIONS);
}



// Deploys the contract with given account and details object
// Once completed, await will return the contract address
export async function deployContract(account, details) {
    if (!account) throw Error("No account provided");
    
    const ctc = account.contract(backend);
    await stdlib.withDisconnect(() => ctc.p.Buyer({
        details,
        launched: (info) => stdlib.disconnect(info),
    }));

    return parseAddress(await ctc.getInfo() );
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


// From URL, tries to extract the portion containing the contract address
// The available URL formats are only the ones defined in the regex
export function extractContractInfoFromUrl(url) {
    url = decodeURI(url);

    for (let regex of [
        /view\/(.*)/g,
        /seller\/order\/(.*)/g,
    ]) {
        const match = regex.exec(url);
        if (!match || !match[1]) continue;
        
        let ctcInfo = match[1];
        try { ctcInfo = JSON.parse(ctcInfo) }
        catch (e) {}

        return parseAddress(ctcInfo);
    }
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
    // If provided with a stringified JSON, parse it first 
    try { address = JSON.parse(address); } 
    catch (e) {}

    const type = typeof address;
    if (type === 'string' || type === 'number') return address;
    if (address.type === 'BigNumber') return address.hex;
    if (address._isBigNumber) return address._hex;

    throw new Error("Unknown address type: " + address);
}


export function removeNullChar(str) {
    return str.replace(/\0/g, '');
}


export async function networkTimeToDateString(networkTime) {
    if (parseInt(networkTime) <= 0) return "N/A";
    const secs = parseInt( await stdlib.getTimeSecs( networkTime ) );
    return new Date(secs * 1000).toLocaleString();
}



export async function getContractViews({ 
    account, ctcInfo,       // Either these 2 info to get contract
    ctc,                    // Or you pass contract directly
    // What to include?
    name = true,
    buyerAddress = true,
    supplierAddress = true,
    contractAddress = true,
    state = true,
    listOfIngredients = true,
    rejectReason = true,
    deployedNetworkTime = true,
    reviewedNetworkTime = true,
    deliveredNetworkTime = true,
}) {
    if (!ctc) ctc = await getContractHandler(account, ctcInfo);
    
    const res = {};
    if (name) res.name = removeNullChar( await ctc.unsafeViews.Explorer.name() );
    if (buyerAddress) res.buyerAddress = parseAddress( await ctc.unsafeViews.Explorer.buyerAddress() );
    if (supplierAddress) res.supplierAddress = parseAddress( await ctc.unsafeViews.Explorer.supplierAddress() );
    if (contractAddress) res.contractAddress = parseAddress( await ctc.getInfo() );
    if (state) res.state = parseInt( await ctc.unsafeViews.Explorer.state() );
    if (listOfIngredients) res.listOfIngredients = (await ctc.unsafeViews.Explorer.listOfIngredients() ).map(parseAddress);
    if (rejectReason) res.rejectReason = removeNullChar( await ctc.unsafeViews.Explorer.rejectReason() );
    if (deployedNetworkTime) res.deployedNetworkTime = await networkTimeToDateString( await ctc.unsafeViews.Explorer.deployedNetworkTime() );
    if (reviewedNetworkTime) res.reviewedNetworkTime = await networkTimeToDateString( await ctc.unsafeViews.Explorer.reviewedNetworkTime() );
    if (deliveredNetworkTime) res.deliveredNetworkTime = await networkTimeToDateString( await ctc.unsafeViews.Explorer.deliveredNetworkTime() );

    return res;
}


// APIS. Better to use try {} catch {} to handle errors
export async function supplierReject(contract, reason) {
    return await contract.a.SellerAPI.reject(reason);
}

export async function supplierAddIngredient(contract, ingredient) {
    return await contract.a.SellerAPI.addIngredient(ingredient);
}

export async function supplierAccept(contract) {
    return await contract.a.SellerAPI.approve();
}

export async function buyerDelivered(contract) {
    return await contract.a.BuyerAPI.delivered();
}