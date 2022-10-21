import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, TextField, Box, } from "@mui/material";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

import AppContext from "../../context/AppContext";
import SnackbarContext from "../../context/SnackbarContext";

import Loading from "../components/Loading";

import { stdlib, parseAddress } from "../../Util";
import * as testbackend from "../../reach-backend/test_deploy/index.main.mjs";



export default function TestDeploy() {

    const navigate = useNavigate();
    const { account } = useContext(AppContext);
    const { showErrorToast, showSuccessToast } = useContext(SnackbarContext);

    const [ isLoading, setIsLoading ] = useState(false);

    const [ name, setName ] = useState("");
    const [ buyerAddress, setBuyerAddress ] = useState("");
    const [ supplierAddress, setSupplierAddress ] = useState("");
    const [ cState, setCState ] = useState(0);
    


    useEffect(()=> {
        if (!account) navigate("/");
    }, [account, navigate]);


    const onSubmit = async () => {
        setIsLoading(true);
        const ctc = account.contract(testbackend);

        try {
            const info = await stdlib.withDisconnect(()=> ctc.p.Buyer({
                details: {
                    name: name,
                    buyerAddress: buyerAddress,
                    supplierAddress: supplierAddress,
                    state: cState,
                },
                launched: (info) => stdlib.disconnect(info),
            }));

            showSuccessToast("Contract deployed successfully at " + parseAddress(info));
            navigate(`/test/${ encodeURI(parseAddress(info) ) }`);

        } catch (e) {
            showErrorToast(e.message);
            setIsLoading(false);
        }
    };

    if (isLoading) return <Loading message='Contract deploying...'/>;

    return <>
        <Box className='d-flex flex-column'>
            <Typography variant="h5" gutterBottom className='mb-4'>
                Test Deploy
            </Typography>

            <Typography variant="subtitle1" gutterBottom className='text-muted mb-4'>
                Deploy the test contract for use in frontend development
            </Typography>

            <TextField 
                className='mb-3'
                label="Name" 
                variant="filled" 
                value={name}
                onChange={ (e)=> setName( e.target.value) }
            />

            <TextField 
                className='mb-3'
                label="Buyer Address" 
                variant="filled" 
                value={buyerAddress}
                onChange={ (e)=> setBuyerAddress( e.target.value) }
            />

            <TextField 
                className='mb-3'
                label="Supplier Address" 
                variant="filled" 
                value={supplierAddress}
                onChange={ (e)=> setSupplierAddress( e.target.value) }
            />

            <FormControl >
                <InputLabel id='state'>State</InputLabel>
                <Select
                    labelId="state"
                    value={ cState}
                    label="State"
                    onChange={ (e)=> setCState( e.target.value) }
                >
                    <MenuItem value={0}>Pending Review</MenuItem>
                    <MenuItem value={1}>Approved</MenuItem>
                    <MenuItem value={2}>Rejected</MenuItem>
                    <MenuItem value={3}>Delivered</MenuItem>
                </Select>
            </FormControl>

            <Button variant="contained" color="primary" className='mt-4' onClick={onSubmit}>
                Deploy
            </Button>
        </Box>
    </>;
}