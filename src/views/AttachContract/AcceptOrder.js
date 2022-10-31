import React, { useState, useContext,useCallback, useEffect} from "react";
import { Button, Typography, TextField, Card, CardContent, ButtonGroup } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import QrReader from 'react-qr-scanner'

import Title from "../components/Title";
import ContractDetailsTable from "../components/ContractDetailsTable";
import Loading from "../components/Loading";
import ConnectAccount from "../components/ConnectAccount";
import AccountDetails from "../components/AccountDetails";

import SnackbarContext from "../../context/SnackbarContext";
import AppContext from "../../context/AppContext";

import PublishIcon from '@mui/icons-material/Publish';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import { getContractHandler, getContractViews , supplierAddIngredient, supplierAccept, extractContractInfoFromUrl } from "../../Util";


export default function AcceptOrder () {
    const navigate = useNavigate();

    const { ctcInfo } = useParams();
    const { account } = useContext(AppContext);
    const { showErrorToast, showSuccessToast } = useContext(SnackbarContext);
   
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isSubmitting, setIsSubmitting ] = useState(false);
    const [ isScanningQr, setIsScanningQr ] = useState(false);
    const [ isRetrievingCtc, setIsRetrievingCtc ] = useState(true);
    const [ isSubmit, setIsSubmit ] = useState(false);

    const [ ctc, setCtc ] = useState({});
    const [ res, setRes ] = useState({});

    const [ingredientToAdd, setIngredientToAdd] = useState("");

    
    const updateContractViews = useCallback(async () => {
        setIsLoading(true);

        try {
            setRes(await getContractViews({ account: account, ctcInfo: ctcInfo }));
        } catch (e) {
            showErrorToast(e.message);
            console.error(e);
        }

        showSuccessToast(`Contract retrieved successfully`);
        setIsLoading(false);
    }, [showErrorToast, account, ctcInfo, showSuccessToast]);


    const handleSubmit = async () => {
        setIsSubmit(true);

        try {
            await supplierAccept(ctc);
            showSuccessToast("Contract has been successfully approved!");
            navigate(`/seller/track/${ctcInfo}`);
        } catch (e) {
            showErrorToast(e.message);
            console.error(e);
        } finally {
            setIsSubmit(false);
        }
    } 


    const submitAddIngredient = async () => {
        if (!ingredientToAdd) return showErrorToast("Please fill in the address of the ingredient");
        setIsSubmitting(true);

        try {
            await supplierAddIngredient(ctc, ingredientToAdd);
            showSuccessToast("Ingredient added successfully");
            setIngredientToAdd("");
            updateContractViews();
        } catch (e) {
            showErrorToast(e.message);
            console.error(e);
        }

        setIsSubmitting(false);
    }


    const onQrError = (e)=> {
        showErrorToast("Error scanning QR code: " + e.message);
        console.error(e);
        setIsScanningQr(false);
    }

    const onQrScanned = (data) => {
        if (!data || !data.text) return;

        setIsScanningQr(false);
        const ctcInfo = extractContractInfoFromUrl(data.text);

        if (!ctcInfo) {
            showErrorToast("QR code detected but no contract found. See console for QR details");
            console.error("QR code scanned:");
            console.error(data);
        } else {
            showSuccessToast("QR code scanned successfully. Contract: " + ctcInfo);
            setIngredientToAdd(ctcInfo);
        }
    }



    useEffect(() => {
        if (!ctcInfo) navigate("/");

        setIsRetrievingCtc(true);
        (async () => {
            try {
                const res = await getContractHandler(account, ctcInfo);
                setCtc(res)
            } catch (e) {
                showErrorToast(e.message);
                console.error(e);
            } finally {
                setIsRetrievingCtc(false);
            }
        })();
    }, [ctcInfo, account, navigate, showErrorToast, setIsRetrievingCtc]);
    
    useEffect(() => {
        if (!ctc) return;
        updateContractViews();
    }, [ctc, updateContractViews]);



    if (!account) return <ConnectAccount />
    if (isRetrievingCtc) return <Loading message="Retrieving contract" />

    return <>
        <Title />
        <AccountDetails />

        <Typography variant='h4' className='mb-3'>
            You are <strong>Supplier</strong>
        </Typography>

        <Card sx={{ mb: 3 }}>
        <CardContent>
            <ContractDetailsTable
                isLoading={isLoading}

                contractAddress={res.contractAddress}
                name={res.name}
                buyerAddress={res.buyerAddress}
                supplierAddress={res.supplierAddress}
                state={res.state}
                listOfIngredients={res.listOfIngredients}
                rejectReason={res.rejectReason}
                deployedNetworkTime={res.deployedNetworkTime}
                reviewedNetworkTime={res.reviewedNetworkTime}
                deliveredNetworkTime={res.deliveredNetworkTime}
            />
        </CardContent>
        </Card>


        {
            isSubmitting ? 
            <Loading message='Submitting ingredient...' /> 
            :
            isSubmit ?
            <Loading message='Approving order' /> 
            :
            isScanningQr ?
            <>
                <QrReader
                    style={{
                        minHeight: 200,
                        minWidth: 280,
                    }}
                    onError={onQrError}
                    onScan={onQrScanned}
                />
                <Button color="primary" variant="contained" sx={{ mt: 2 }} onClick={()=> setIsScanningQr(false)}>
                    Cancel
                    <CancelOutlinedIcon sx={{ ml: 1 }} />
                </Button>
            </>
            :
            <>
                <Card sx={{ mb: 3 }}>
                <CardContent className='text-center'>
                    <TextField
                        sx={{ minWidth: 300, my: 1 }}
                        label="Add source ingredients"
                        variant="filled"
                        value={ingredientToAdd}
                        onChange={(e) => setIngredientToAdd(e.target.value)}
                    />

                    <br/>

                    <ButtonGroup sx={{ mt: 2 }} variant="contained">
                        <Button color="success" onClick={submitAddIngredient}>
                            Submit
                            <PublishIcon sx={{ ml: 1 }} />
                        </Button>

                        <Button color="secondary" onClick={()=> setIsScanningQr(true)}>
                            Scan QR
                            <QrCodeScannerIcon sx={{ ml: 1 }} />
                        </Button>
                    </ButtonGroup>
                </CardContent>
                </Card>

                <Button variant="outlined" onClick={handleSubmit}>
                    Accept Order
                    <CheckCircleOutlineIcon sx={{ ml: 1 }} />
                </Button>
            </>
        }
    </>
}