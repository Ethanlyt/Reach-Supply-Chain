import React, { useEffect, useContext } from "react";

import Loading from "./Loading";
import AppContext from "../../context/AppContext";
import SnackbarContext from "../../context/SnackbarContext";

import { stdlib } from "../../Util";


export default function ConnectAccount({ setIsConnectingAccount }) {

    const {
        account, 
        setAccount,
    } = useContext(AppContext);


    const { showSuccessToast, showErrorToast } = useContext(SnackbarContext);

    

    useEffect(() => {
        (async ()=> {
            try {
                const acc = await stdlib.getDefaultAccount();
                showSuccessToast("Account successfully connected: " + acc.getAddress() );
                setAccount(acc);
            } 
            catch (err) {
                showErrorToast( err.message || 'Unable to connect to your wallet');
            } finally {
                if (setIsConnectingAccount) setIsConnectingAccount(false);
            }
        })();
    }, [account, setAccount, showSuccessToast, showErrorToast, setIsConnectingAccount]);


    return <Loading message="Attempting to retrieve wallet information..." />;
}
