import React, { useState, useContext, useCallback, useEffect } from "react"
import Title from "../components/Title"
import { Button, Card, CardContent, Typography, TextField } from "@mui/material"
import ContractDetailsTable from "../components/ContractDetailsTable"
import { useNavigate, useParams } from "react-router-dom"
import StateStepper from "../components/StateStepper"
import * as backend from '../../reach-backend/index.main.mjs'
import AppContext from "../../context/AppContext"
import SnackbarContext from "../../context/SnackbarContext"
import { getContractViews, getContractHandler } from "../../Util"


export default function SellerTrack () {
    const {ctcInfo} = useParams()
    const {account} = useContext(AppContext)
    const {showErrorToast, showSuccessToast} = useContext(SnackbarContext)
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)
    const [ctc, setCtc] = useState(null)
    const [res, setRes] = useState(null)

    const updateContractViews = useCallback(async () => {
        setIsLoading(true);

        try {
            setRes(await getContractViews({ ctc: ctc }))
        } catch (e) {
            showErrorToast(e.message);
        }
        showSuccessToast(`Contract retrieve successfully`)
        setIsLoading(false);
    }, [ctc, showErrorToast]);

    useEffect(() => {
        if (!ctcInfo) navigate("/")

        try {
            const ctc = getContractHandler(account, decodeURI(ctcInfo));
            setCtc(ctc);
        } catch (e) {
            showErrorToast(e.message);
        }
    }, [ctcInfo, navigate, showErrorToast]);

    useEffect(() => {
        if (!ctc) return;
        updateContractViews();
    }, [ctc, updateContractViews]);

    return <>
        <Title />
        <Card>
            <CardContent>
                <ContractDetailsTable
                    isLoading={isLoading}

                    contractAddress={res.contractAddress}
                    name={res.name}
                    buyerAddress={res.buyerAddress}
                />
            </CardContent>
        </Card>
        <br />
        <StateStepper state={res.state} />

        {res.state === 4 && 
            <h2>Contract Ended</h2>    
        }
        
    </>
}