// ? Author: AdmiJW, Ethanlyt
// ?
// ? The page shown when the buyer attaches to the contract.
// ? Displays contract information and its state.
// ? If the contract is approved, the buyer can mark the contract as delivered.


import React, { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";

import SnackbarContext from "../../context/SnackbarContext";
import AppContext from "../../context/AppContext";

import Title from "../components/Title";
import ContractDetailsTable from "../components/ContractDetailsTable";
import StateStepper from "../components/StateStepper";
import Loading from "../components/Loading";

import { getContractViews, getContractHandler, buyerDelivered, getAppLink } from "../../Util";
import ConnectAccount from "../components/ConnectAccount";



export default function BuyerTrack() {
    const navigate = useNavigate();
    const {ctcInfo} = useParams();
    
    const {showErrorToast, showSuccessToast} = useContext(SnackbarContext);
    const {account} = useContext(AppContext);

    const [isRetrievingCtc, setIsRetrievingCtc] = useState(false);
    const [isSubmittingDelivered, setIsSubmittingDelivered] = useState(false);
    const [url, setUrl] = useState("");
    const [ctc, setCtc] = useState({});
    const [res, setRes] = useState({});


    const updateContractViews = useCallback(async (ctc)=> {
        setIsRetrievingCtc(true);

        try {
            setRes(await getContractViews({ ctc }));
        } catch (err) {
            showErrorToast(err.message || "Unable to retrieve contract views");
        } finally {
            setIsRetrievingCtc(false);
        }
    }, [showErrorToast]);


    const onReceivedButtonClick = async () => {
        setIsSubmittingDelivered(true);

        try {
            await buyerDelivered(ctc);
            showSuccessToast(`Contract updated: Marked order as delivered`);
            await updateContractViews(ctc);
        } catch (e) {
            showErrorToast(e.message);
        } finally {
            setIsSubmittingDelivered(false);
        }
    }


    useEffect(() => {
        if (!account) return showErrorToast("No account connected. You have to connect to your account to perform actions.");
        if (!ctcInfo) {
            showErrorToast("No contract info provided. You have to provide the contract info");
            navigate("/");
        }

        (async () => {
            try {
                const ctc = await getContractHandler(account, ctcInfo);
                setCtc(ctc);
                await updateContractViews(ctc);
                setUrl(`${ getAppLink() }${ encodeURI(ctcInfo) }`);
            } catch (e) {
                showErrorToast(e.message);
            }
        })();
    }, [account, showErrorToast, ctcInfo, navigate, updateContractViews]);



    if (!account) return <ConnectAccount />;
    if( isRetrievingCtc ) return <Loading message="Retrieving contract information" />;

    return <>
        <Title />

        <Typography variant='h4' className='mb-3'>
            You are <strong>Buyer</strong>
        </Typography>

        <Card>
        <CardContent>
            <StateStepper state={res.state} />
        </CardContent>
        </Card>


        {
            isSubmittingDelivered ?
            <Loading message="Approving delivery" />
            :
            res.state === 1 &&
            <Button variant="contained" color="primary" className='mt-4' onClick={onReceivedButtonClick}>
                Confirm Order Received
            </Button>
        }


        {
            res.state === 3 &&
            <>
                <Card className='mt-3'>
                    <CardContent>
                        <ContractDetailsTable
                            isLoading={isRetrievingCtc}

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
                        <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=150x150`} 
                            alt='QR to view contract details'
                        />
                    </CardContent>
                </Card>

                <Typography className="text-success my-3">
                    Please Print This QR At Your Product For Public to View
                </Typography>
            </>
        }
    </>
}