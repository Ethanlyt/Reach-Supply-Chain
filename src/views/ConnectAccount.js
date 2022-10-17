import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loadStdlib } from "@reach-sh/stdlib";

import Loading from "./components/Loading";
import AppContext from "../context/AppContext";
import SnackbarContext from "../context/SnackbarContext";



const reach = loadStdlib(process.env);


export default function ConnectAccount() {

    const navigate = useNavigate();

    const { 
        account, setAccount, 
        setError,
    } = useContext(AppContext);

    const { showSuccessToast } = useContext(SnackbarContext);

    

    useEffect(() => {
        (async ()=> {
            try {
                const acc = await reach.getDefaultAccount();
                showSuccessToast("Account successfully connected: " + acc.getAddress() );
                setAccount(acc);
                // TODO: Move to main menu screen
                navigate('/home')
            } 
            catch (err) {
                setError({ title: 'Error connecting account', detail: err.message || "Unable to connect to your wallet" });
                navigate('/error');
            }
        })();
    }, [account, setAccount, showSuccessToast, setError, navigate]);


    return <Loading message="Attempting to retrieve wallet information..." />;
}