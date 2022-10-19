import React, { useState, useContext, useEffect } from "react";
import { Typography, Button, TextField } from "@mui/material";

import AppContext from "../../context/AppContext";




export default function TestDeploy() {

    const { account } = useContext(AppContext);

    const [ step, setStep ] = useState(0);

    const [ name, setName ] = useState("");
    const [ buyerAddress, setBuyerAddress ] = useState("");
    const [ supplierAddress, setSupplierAddress ] = useState("");


    useEffect(()=> {

    }, []);



    if (step === 0) return (
        <>
            <Typography variant="h5" gutterBottom className='mb-4'>
                Test Deploy
            </Typography>

            <TextField 
                label="Name" 
                variant="filled" 
                value={name}
                onChange={ (e)=> setName( e.target.value) }
            />

            <TextField 
                label="Buyer Address" 
                variant="filled" 
                value={buyerAddress}
                onChange={ (e)=> setBuyerAddress( e.target.value) }
            />

            <TextField 
                label="Supplier Address" 
                variant="filled" 
                value={supplierAddress}
                onChange={ (e)=> setSupplierAddress( e.target.value) }
            />

            <Button variant="contained" color="primary" className='mt-4'>
                Deploy
            </Button>
        </>
    );
}