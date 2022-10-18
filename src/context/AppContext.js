import React, { useState, createContext } from "react";


const AppContext = createContext(null);



function AppContextProvider({ children }) {
    const [ account, setAccount ] = useState(null);

    const [ error, setError ] = useState({});


    // Put exposed states here
    const state = {
        account, setAccount,
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