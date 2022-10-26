import React, { useContext, useState, useEffect, useCallback } from "react"
import Title from "../components/Title"
import { Button, Card, CardContent, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import SnackbarContext from "../../context/SnackbarContext"
import AppContext from "../../context/AppContext"
import ContractDetailsTable from "../components/ContractDetailsTable"
import StateStepper from "../components/StateStepper"
import { getContractViews, getContractHandler, buyerDelivered } from "../../Util"
import Loading from "../components/Loading"

export default function BuyerTrack() {

    const navigate = useNavigate();
    const {ctcInfo} = useParams();
    
    const {showErrorToast, showSuccessToast} = useContext(SnackbarContext);
    const {account} = useContext(AppContext);

    const [isLoading, setIsLoading] = useState(true);
    const [isRetrievingCtc, setIsRetrievingCtc] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [url, setUrl] = useState("");
    const [ctc, setCtc] = useState({});
    const [res, setRes] = useState({});




    const updateContractViews = useCallback(async ()=> {
        setIsLoading(true);

        try {
            setRes(await getContractViews({ account: account, ctcInfo: ctcInfo }))
        } catch (e) {
            showErrorToast(e.message);
        }
        showSuccessToast(`Contract retrieved successfully`)
        setIsLoading(false);
    }, [account, ctcInfo, showSuccessToast, showErrorToast]);



    useEffect(() => {
        if (!account) showErrorToast("No account connected. You have to connect to your account to perform actions.");
    }, [account, showErrorToast]);


    useEffect(() => {
        if (!ctcInfo) navigate("/");
        setIsRetrievingCtc(true);
        (async () => {
            try {
                const res = await getContractHandler(account, ctcInfo);
                setCtc(res)
            } catch (e) {
                showErrorToast(e.message);
            }

        })();

        setUrl(`http://localhost:3000/#/view/${encodeURI(ctcInfo)}`);
        setIsRetrievingCtc(false);
    }, [account, ctcInfo, navigate, showErrorToast, setIsRetrievingCtc, setIsSubmit]);

    useEffect(() => {
        if (!ctc) return;
        updateContractViews();
    }, [ctc, updateContractViews, setIsSubmit]);
    

    const onReceived = async() => {
        setIsSubmit(true);

        try {
            await buyerDelivered(ctc);
            showSuccessToast(`Contract updated successfully`);
            updateContractViews();
        } catch (e) {
            showErrorToast(e.message);
        } finally {
            setIsSubmit(false);
        }
    }


    if(isRetrievingCtc) return <Loading message="Retrieving contract" />
    if (isLoading) return <Loading message="Please wait..." />


    return <>
        <Title />

        <h3><i>You are <strong>Buyer</strong></i></h3>
        <StateStepper state={res.state} />

        {
            res.state === 1 && isSubmit ?
            <Loading message="Approving delivery" />
            :
            res.state === 1 &&
            <Button variant="contained" color="primary" className='mt-4' onClick={onReceived}>
                Confirm Order Received
            </Button>
        }


        {
            res.state === 3 &&
            <>
                <Card className='mt-3'>
                    <CardContent>
                        <ContractDetailsTable
                            isLoading={isLoading}

                            contractAddress={res.contractAddress}
                            name={res.name}
                            buyerAddress={res.buyerAddress}
                            supplierAddress={res.supplierAddress}
                        />
                    </CardContent>
                </Card>

                <Typography variant='h5' className='my-3'>Contract Ended</Typography>

                <Card sx={{ minWidth: 175, height: 280 }}>
                    <CardContent>
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=150x150`} alt='QR to view contract details'/>
                    </CardContent>
                </Card>

                <Typography className="text-success my-3">Please Print This QR At Your Product For Public to View</Typography>
            </>
        }
    </>
}