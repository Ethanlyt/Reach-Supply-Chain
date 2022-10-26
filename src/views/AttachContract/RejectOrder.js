import { Button, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { getContractHandler, supplierReject } from "../../Util";
import ContractDetailsTable from "../components/ContractDetailsTable";
import Title from "../components/Title";
import SnackbarContext from "../../context/SnackbarContext";
import Loading from "../components/Loading";

export default function RejectOrder() {
    const navigate = useNavigate()
    const {showErrorToast} = useContext(SnackbarContext)
    const [reason, setReason] = useState("");
    const [isSubmit, setIsSubmit] = useState(false)
    const {ctcInfo} = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [isRetrievingCtc, setIsRetrievingCtc] = useState(true)
    const [ctc, setCtc] = useState({})
    const [isfinish, setIsFinish] = useState(false)

    
    const {
        account
    } = useContext(AppContext);

    useEffect(() => {
        if (!ctcInfo) navigate("/")
        setIsRetrievingCtc(true);
        (async () => {
            try {
                const res = await getContractHandler(account, ctcInfo);
                setCtc(res)
            } catch (e) {
                showErrorToast(e.message);
            }
            
        })();
        setIsRetrievingCtc(false);
    }, [ctcInfo, navigate, showErrorToast, setIsRetrievingCtc]);
    

    const handleSubmit = async() => {
        setIsSubmit(true)
        setIsLoading(true)
        setIsFinish(true)
        await supplierReject(ctc, reason)
        setIsSubmit(false)
        setIsLoading(false)
        
    }
    
    const toHome = () => {
        navigate('/')
    }

    return <>
        <Title />
    
        <h3><i>You are <strong>Seller</strong></i></h3>

        {isSubmit == false && isfinish == false && <>
        <Typography variant="subtitle1" gutterBottom className='lead text-muted mb-4'>
            Please state your reason (optional)
        </Typography>

        <TextField
            label="Enter Text Here..."
            multiline
            rows={4}
            variant="filled"
            sx={{ minWidth: '400px', maxWidth: '700px' }}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
        />
        </>
        }
        {isSubmit && isLoading && isfinish && <Loading message="Rejecting contract" />}

        {isRetrievingCtc == false && isSubmit == false && isfinish == false && 
        <Button
            onClick={handleSubmit}
            variant="contained"
            className='my-2'
        >
            Submit
        </Button>
        }

        {isSubmit == false && isRetrievingCtc == false && isfinish == true && 
        <>
            <ContractDetailsTable
                isLoading={isLoading}
                contractAddress={decodeURI(ctcInfo)}
            />
            <br />
            <h3 className="text-danger" >Contract Rejected Successfully</h3>
            <Button
                onClick={toHome}
                variant="contained"
                className='my-2'
            >
                Back to home
            </Button>
        </>
        
        }

    </>
}