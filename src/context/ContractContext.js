import React, { useState, createContext, useCallback } from "react";


const ContractContext = createContext(null);



function ContractContextProvider({ children }) {

    const [ contract, setContract ] = useState(null);


    // API calls
    const accept = useCallback(async (listOfIngredients) => {
        return await contract.a.Seller.accept(listOfIngredients);
    }, [contract]);

    const reject = useCallback(async (reason)=> {
        return await contract.a.Seller.reject(reason);
    }, [contract]);

    const confirmReceive = useCallback(async ()=> {
    return await contract.a.Buyer.confirmReceive();
    }, [contract]);



    // Put exposed states here
    const state = { 
        contract, setContract, 
        accept, 
        reject,
        confirmReceive };


    return (
        <ContractContext.Provider value={ state }>
            {children}
        </ContractContext.Provider>
    );
}


export { ContractContextProvider }
export default ContractContext;