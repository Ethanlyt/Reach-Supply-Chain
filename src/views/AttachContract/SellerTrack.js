import React, { useState, useContext, useCallback, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import Title from "../components/Title";
import ContractDetailsTable from "../components/ContractDetailsTable";
import StateStepper from "../components/StateStepper";

import AppContext from "../../context/AppContext";
import SnackbarContext from "../../context/SnackbarContext";

import { getContractViews, getContractHandler } from "../../Util";


export default function SellerTrack () {
    const navigate = useNavigate();
    const {ctcInfo} = useParams();

    const {account} = useContext(AppContext);
    const {showErrorToast, showSuccessToast} = useContext(SnackbarContext);

    const [isLoading, setIsLoading] = useState(true);
    const [res, setRes] = useState({});



    const updateContractViews = useCallback(async (ctc) => {
        setIsLoading(true);

        try {
            setRes(await getContractViews({ ctc }));
            showSuccessToast(`Contract retrieved successfully`);
        } catch (e) {
            showErrorToast(e.message);
        } finally {
            setIsLoading(false);
        }
    }, [showSuccessToast, showErrorToast]);



    useEffect(() => {
        if (!ctcInfo) navigate("/");
 
        (async () => {
            try {
                const ctc = await getContractHandler(account, ctcInfo);
                updateContractViews(ctc);
            } catch (e) {
                showErrorToast(e.message);
            }
        })();
    }, [account, ctcInfo, navigate, showErrorToast, updateContractViews]);




    if (!account) return <ConnectAccount />

    return <>
        <Title />
        
        <Typography variant='h4' className='mb-3'>
            You are <strong>Supplier</strong>
        </Typography>


        <Card sx={{ mb: 2 }}>
        <CardContent>
            <ContractDetailsTable
                isLoading={isLoading}

                contractAddress={res.contractAddress}
                name={res.name}
                buyerAddress={res.buyerAddress}
            />
        </CardContent>
        </Card>

        <Card sx={{ mb: 2 }}>
        <CardContent>
            <StateStepper state={res.state} />
        </CardContent>
        </Card>


        {
            res.state === 4 && 
            <Typography variant='h4' className='mb-3'>
                <strong>Contract Completed</strong>
            </Typography>
        }
    </>
}