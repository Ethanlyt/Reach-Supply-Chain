import React, { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button, TextField, Box, Card, CardContent, } from "@mui/material";

import AppContext from "../../context/AppContext";
import SnackbarContext from "../../context/SnackbarContext";

import ContractDetailsTable from "../components/ContractDetailsTable";

import Loading from "../components/Loading";

import { getContractViews, parseAddress } from "../../Util";
import * as testbackend from "../../reach-backend/test_deploy/index.main.mjs";



export default function TestDeploy() {

    const navigate = useNavigate();
    const { account } = useContext(AppContext);
    const { showErrorToast, showSuccessToast } = useContext(SnackbarContext);
    const { ctcInfo } = useParams();

    const [ ctc, setCtc ] = useState(null);
    const [ ingredientToAdd, setIngredientToAdd ] = useState("");
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);

    const [ name, setName ] = useState("");
    const [ buyerAddress, setBuyerAddress ] = useState("");
    const [ supplierAddress, setSupplierAddress ] = useState("");
    const [ contractAddress, setContractAddress ] = useState("");
    const [ cState, setCState ] = useState(0);
    const [ listOfIngredients, setListOfIngredients ] = useState([]);
    const [ rejectReason, setRejectReason ] = useState("");
    const [ deployedNetworkTime, setDeployedNetworkTime ] = useState(0);
    const [ reviewedNetworkTime, setReviewedNetworkTime ] = useState(0);
    const [ deliveredNetworkTime, setDeliveredNetworkTime ] = useState(0);

    
    const updateContractViews = useCallback(async ()=> {
        setIsLoading(true);

        try {
            const {
                name, buyerAddress, supplierAddress, contractAddress, state,
                listOfIngredients, rejectReason, deployedNetworkTime, deliveredNetworkTime, reviewedNetworkTime
            } = await getContractViews({ ctc });

            setName(name);
            setBuyerAddress(buyerAddress);
            setSupplierAddress(supplierAddress);
            setContractAddress(contractAddress);
            setCState( state );
            
            setListOfIngredients( listOfIngredients );
            setRejectReason( rejectReason );
            setDeployedNetworkTime( deployedNetworkTime );
            setReviewedNetworkTime( reviewedNetworkTime );
            setDeliveredNetworkTime( deliveredNetworkTime );
        } catch (e) {
            showErrorToast(e.message);
        }

        setIsLoading(false);
    }, [ctc, showErrorToast]);


    const onSubmit = async ()=> {
        setIsSubmitting(true);
        
        try {
            await ctc.a.Seller.addIngredient(ingredientToAdd);
            showSuccessToast("Ingredient added successfully");
            setIngredientToAdd("");
            updateContractViews();
        } catch (e) {
            showErrorToast(e.message);
        }

        setIsSubmitting(false);
    }





    useEffect(()=> {
        if (!account) navigate("/");
    }, [account, navigate]);


    useEffect(()=> {
        if (!ctcInfo) navigate("/");

        try {
            const ctc = account.contract(testbackend, decodeURI(ctcInfo));
            setCtc(ctc);
        } catch (e) {
            showErrorToast(e.message);
        }
    }, [ctcInfo, account, navigate, showErrorToast]);

    useEffect(()=> {
        if (!ctc) return;
        updateContractViews();
    }, [ctc, updateContractViews]);



    


    return <>
        <Box className='d-flex flex-column'>
            <Typography variant="h5" gutterBottom className='mb-4'>
                Deployed Contract
            </Typography>

            <Card>
                <CardContent>
                    <ContractDetailsTable
                        isLoading={isLoading}

                        contractAddress={ parseAddress(contractAddress) }
                        name={name}
                        buyerAddress={buyerAddress}
                        supplierAddress={supplierAddress}
                        state={cState}
                        listOfIngredients={listOfIngredients}
                        rejectReason={rejectReason}
                        deployedNetworkTime={deployedNetworkTime}
                        reviewedNetworkTime={reviewedNetworkTime}
                        deliveredNetworkTime={deliveredNetworkTime}
                    />
                </CardContent>
            </Card>

            {
                isLoading?
                null
                :
                isSubmitting?
                <Loading message='Submitting ingredient...'/>
                :
                <>
                    <TextField 
                        className='mb-1 mt-3'
                        label="Ingredient to add" 
                        variant="filled" 
                        value={ingredientToAdd}
                        onChange={ (e)=> setIngredientToAdd( e.target.value) }
                    />

                    <Button variant="contained" color="primary" className='mt-4' onClick={onSubmit}>
                        Add ingredient
                    </Button>
                </>
            }
        </Box>
    </>;
}