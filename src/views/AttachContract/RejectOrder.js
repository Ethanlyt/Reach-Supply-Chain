import React, { useContext, useEffect, useState } from "react";
import { Button, TextField, Typography, Card, CardContent } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import AppContext from "../../context/AppContext";
import SnackbarContext from "../../context/SnackbarContext";

import ContractDetailsTable from "../components/ContractDetailsTable";
import Title from "../components/Title";
import Loading from "../components/Loading";

import { getContractHandler, supplierReject } from "../../Util";



export default function RejectOrder() {
    const navigate = useNavigate();
    const {ctcInfo} = useParams();

    const {showErrorToast} = useContext(SnackbarContext);
    
    const [reason, setReason] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRetrievingCtc, setIsRetrievingCtc] = useState(true);
    const [ctc, setCtc] = useState({});
    const [isfinish, setIsFinish] = useState(false);

    
    const {
        account
    } = useContext(AppContext);

    useEffect(() => {
        if (!ctcInfo) navigate("/");
        setIsRetrievingCtc(true);

        (async () => {
            try {
                const res = await getContractHandler(account, ctcInfo);
                setCtc(res);
            } catch (e) {
                showErrorToast(e.message);
                console.error(e);
            } finally {
                setIsRetrievingCtc(false);
            }
        })();
    }, [account, ctcInfo, navigate, showErrorToast, setIsRetrievingCtc]);
    

    const handleSubmit = async() => {
        setIsSubmit(true);
        setIsLoading(true);
        
        try {
            await supplierReject(ctc, reason);
        } catch (e) {
            showErrorToast(e.message);
            console.error(e);
        } finally {
            setIsFinish(true);
            setIsSubmit(false);
            setIsLoading(false);
        }
    }



    return <>
        <Title />
    
        <Typography variant='h4' className='mb-3'>
            You are <strong>Supplier</strong>
        </Typography>

        {  
            !isSubmit && !isfinish && 
            <>
                <Typography variant="subtitle1" gutterBottom className='lead text-muted mb-4'>
                    Please state your reason (optional)
                </Typography>

                <TextField
                    label="Enter Text Here..."
                    multiline
                    rows={4}
                    variant="filled"
                    sx={{ minWidth: '300px', maxWidth: '700px' }}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                />
            </>
        }


        {
            isSubmit && isLoading && isfinish && 
            <Loading message="Rejecting contract" />
        }

        {
            !isRetrievingCtc && !isSubmit && !isfinish && 
            <Button
                onClick={handleSubmit}
                variant="contained"
                className='my-2'
            >
                Submit
            </Button>
        }

        {
            !isSubmit && !isRetrievingCtc && isfinish && 
            <>
                <Card>
                <CardContent>
                    <ContractDetailsTable
                        isLoading={isRetrievingCtc}
                        contractAddress={decodeURI(ctcInfo)}
                    />
                </CardContent>
                </Card>

                <Typography variant='h6' className='my-3 text-danger'>
                    Contract has been rejected
                </Typography>

                <Button
                    onClick={()=> navigate('/')}
                    variant="contained"
                    className='my-2'
                >
                    Back to home
                </Button>
            </>
        }

    </>
}