import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, Button } from "@mui/material"

import { stdlib, getBalance } from "../../Util";
import AppContext from "../../context/AppContext"

import Loading from "./Loading";
import ConnectAccount from "./ConnectAccount";



export default function AccountDetails() {

    const { account } = useContext(AppContext);

    const [ isLoading, setIsLoading ] = useState(true);
    const [ address, setAddress ] = useState('');
    const [ balance, setBalance ] = useState(0);
    const [ standardUnit, setStandardUnit ] = useState('');
    const [ isConnectingAccount, setIsConnectingAccount ] = useState(false);

    
    useEffect(() => {
        (async ()=> {
            if (!account) return;
            setIsConnectingAccount(false);
            
            const bal = await getBalance(account);
            setAddress(account.getAddress());
            setBalance(bal);
            setStandardUnit(stdlib.standardUnit);
            setIsLoading(false);
        })();
    }, [account]);


    const isNotConnected = !account;


    return <Card sx={{ minWidth: 275 }} className='my-4'>
        <CardContent>

        {
            isConnectingAccount ?
            <ConnectAccount />
            :
            isNotConnected ?
            <Typography variant="subtitle1" className='lead'>
                You are currently not connected to any wallet. 
                <Button onClick={()=> setIsConnectingAccount(true)}>Connect Now</Button>
            </Typography>
            :
            isLoading ?
            <Loading message="Loading account details..." /> 
            :
            <>
                <Typography variant="h6" className='mb-4'>
                    Your Account Details
                </Typography>

                <Typography color="text.secondary" gutterBottom>
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