import React, { useContext, useState, useEffect, useCallback } from "react"
import Title from "../components/Title"
import { Button, Card, CardContent, Typography, TextField } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import SnackbarContext from "../../context/SnackbarContext"
import AppContext from "../../context/AppContext"
import ContractDetailsTable from "../components/ContractDetailsTable"
import * as backend from '../../reach-backend/index.main.mjs'
import StateStepper from "../components/StateStepper"

export default function BuyerTrack() {
    const navigate = useNavigate()
    const {ctcInfo} = useParams()
    const {showErrorToast, showSuccessToast} = useContext(SnackbarContext)
    const {account} = useContext(AppContext)
    const [isLoading, setIsLoading] = useState(true)
    const [ctc, setCtc] = useState(null)

    const [cState, setCState] = useState(0)


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
    
    const onReceived = () => {
        setCState(prevState => prevState + 1)
    }

    return <>
        <Title />
        <StateStepper state={res.state} />
        {cState === 1 && 
            <Button variant="contained" color="primary" className='mt-4' onClick={onReceived}>
                Order Received
            </Button>
        }
        {cState === 3 &&
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
                <h2>Contract Ended</h2>
                <span>QR???</span>
                <h2>Please Print This QR At Your Product</h2>
            </>
        }
        

    </>
}