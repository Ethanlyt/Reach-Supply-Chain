import React from "react";

import { AppContextProvider } from "./AppContext";
import { SnackbarContextProvider } from './SnackbarContext';


export default function RoutedContextGroup({ children }) {
    return <>
        <SnackbarContextProvider>
        <AppContextProvider>
            { children }
        </AppContextProvider>
        </SnackbarContextProvider>
    </>;
}