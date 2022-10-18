import React from "react";

import { AppContextProvider } from "./AppContext";
import { SnackbarContextProvider } from './SnackbarContext'
import { ContractContextProvider } from './ContractContext'


export default function RoutedContextGroup({ children }) {
    return <>
        <SnackbarContextProvider>
        <AppContextProvider>
        <ContractContextProvider>
            { children }
        </ContractContextProvider>
        </AppContextProvider>
        </SnackbarContextProvider>
    </>;
}