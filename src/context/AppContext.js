import React, { useState, createContext } from "react";


const AppContext = createContext(null);



function AppContextProvider({ children }) {
    // Context states
    const [ account, setAccount ] = useState(null);
    const [ contract, setContract ] = useState(null);

    // Error
    const [ error, setError ] = useState({});


    // Put exposed states here
    const state = {
        account, setAccount,
        contract, setContract,

        error, setError,
    };




    return (
        <AppContext.Provider value={ state }>
            {children}
        </AppContext.Provider>
    );
}


export { AppContextProvider }
export default AppContext;