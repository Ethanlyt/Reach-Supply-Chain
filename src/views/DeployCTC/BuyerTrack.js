import React, { useContext, useState, useEffect, useCallback } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import SnackbarContext from "../../context/SnackbarContext";
import AppContext from "../../context/AppContext";
import ContractDetailsTable from "../components/ContractDetailsTable";
import { getContractViews, getContractHandler, buyerDelivered } from "../../Util";

import StateStepper from "../components/StateStepper";
import Title from "../components/Title";
import Loading from "../components/Loading";


export default function BuyerTrack() {

    const navigate = useNavigate();

    const {ctcInfo} = useParams();
    const {showErrorToast, showSuccessToast} = useContext(SnackbarContext);
    const {account} = useContext(AppContext);

    const [isLoading, setIsLoading] = useState(true);
    const [isRetrievingCtc, setIsRetrievingCtc] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [buttonDissapear, setButtonDissapear] = useState(false)
    const [url, setUrl] = useState("");
    const [ctc, setCtc] = useState({});
    const [res, setRes] = useState({});

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


    const updateContractViews = useCallback(async () => {
        setIsLoading(true);

        try {
            setRes(await getContractViews({ account: account, ctcInfo: ctcInfo }));
        } catch (e) {
            showErrorToast(e.message);
        }

        showSuccessToast(`Contract retrieved successfully`);
        setIsLoading(false);
       
    }, [ctc, showErrorToast]);


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
            setIsRetrievingCtc(false);
        })();
        setUrl(`http://localhost:3000/#/view/${encodeURI(ctcInfo)}`)
        setIsRetrievingCtc(false);
    }, [ctcInfo, navigate, showErrorToast, setIsRetrievingCtc, setIsSubmit]);


    useEffect(() => {
        if (!ctc) return;
        updateContractViews();
    }, [ctc, updateContractViews, setIsSubmit]);


    
    const onReceived = async() => {
        setIsSubmit(true);
        setIsLoading(true);
        await buyerDelivered(ctc);
        setUrl(`http://localhost:3000/#/view/${encodeURI(ctcInfo)}`);
        setIsSubmit(false);
        setIsLoading(false);
    }

    
    if (isRetrievingCtc) return <Loading message="Retrieving contract" />;

    return <>
        <Title />
        <h3><i>You are <strong>Buyer</strong></i></h3>

        <StateStepper state={res.state} />

        {
            res.state === 1 && buttonDissapear === true &&
            <Button variant="contained" color="primary" className='mt-4' onClick={onReceived}>
                Order Received
            </Button>
        }

        {
            isSubmit && 
            <Loading message="Approving delivered" />
        }

        {
            res.state === 3 &&
            <>
                <Card>
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
                
                <Typography variant="h2">Contract Closed.</Typography>
                
                <Card sx={{ minWidth: 175, height: 280 }}>
                    <CardContent>
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=150x150`} />
                    </CardContent>
                </Card>

                <Typography className="text-success">Please Print This QR At Your Product</Typography>
            </>
        }
    </>
}