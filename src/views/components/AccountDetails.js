import React, { useContext, useEffect, useState } from "react";
import { Typography, Card, CardContent, Button, Box } from "@mui/material"

import AppContext from "../../context/AppContext"
import SnackbarContext from "../../context/SnackbarContext"

import Loading from "./Loading";
import ConnectAccount from "./ConnectAccount";

import { stdlib, getBalance } from "../../Util";

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';


export default function AccountDetails() {

    const { account } = useContext(AppContext);
    const { showErrorToast } = useContext(SnackbarContext);

    const [ isLoading, setIsLoading ] = useState(true);
    const [ address, setAddress ] = useState('');
    const [ balance, setBalance ] = useState(0);
    const [ standardUnit, setStandardUnit ] = useState('');
    const [ isConnectingAccount, setIsConnectingAccount ] = useState(false);

    
    useEffect(() => {
        (async ()=> {
            if (!account) return;
            
            try {
                setAddress(account.getAddress());
                setBalance(await getBalance(account));
                setStandardUnit(stdlib.standardUnit);
            } catch (e) {
                showErrorToast( e.message || 'Unable to retrieve information about your wallet account');
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [account, showErrorToast]);


    return <Card sx={{ minWidth: 275 }} className='my-4'>
        <CardContent>

        {
            isConnectingAccount ?
            <ConnectAccount setIsConnectingAccount={setIsConnectingAccount} />
            :
            !account ?
            <Box className='text-center'>
                <Typography variant="subtitle1" className='lead text-center mb-3'>
                    You are currently not connected to any wallet.
                </Typography>

                <Button variant='contained' onClick={()=> setIsConnectingAccount(true)}>Connect</Button>
            </Box>
            :
            isLoading ?
            <Loading message="Loading account details..." /> 
            :
            <>
                <Typography variant="h6" className='mb-4'>
                    Account Details
                    <AccountBalanceWalletIcon sx={{ ml: 1 }} />
                </Typography>

                <Typography color="text.secondary" gutterBottom sx={{ wordBreak: "break-all" }}>
                    Wallet Address: <strong>{ address }</strong>
                </Typography>

                <Typography color="text.secondary" gutterBottom>
                    Balance: { balance } <strong> { standardUnit } </strong>
                </Typography>
            </>
        }
            
        </CardContent>
    </Card>
}