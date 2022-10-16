import React, { useContext, useEffect } from "react";
import { Typography, Card, CardContent, CircularProgress } from "@mui/material"

import { stdlib, getBalance } from "../../Util";
import AppContext from "../../context/AppContext"

import Loading from "./Loading";



export default function AccountDetails() {

    const { account } = useContext(AppContext);

    const [ isLoading, setIsLoading ] = React.useState(true);
    const [ address, setAddress ] = React.useState('');
    const [ balance, setBalance ] = React.useState(0);
    const [ standardUnit, setStandardUnit ] = React.useState('');

    
    useEffect(() => {
        (async ()=> {
            if (!account) return setIsLoading(true);
            
            const bal = await getBalance(account);
            setAddress(account.getAddress());
            setBalance(bal);
            setStandardUnit(stdlib.standardUnit);
            setIsLoading(false);
        })();
    }, [account]);


    
    return <Card sx={{ minWidth: 275 }} className='my-4'>
        <CardContent>

        {
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