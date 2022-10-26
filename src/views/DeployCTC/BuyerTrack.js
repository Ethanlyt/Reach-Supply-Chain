import React, { useContext, useState, useEffect, useCallback } from "react"
import Title from "../components/Title"
import { Button, Card, CardContent, Typography, TextField } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import SnackbarContext from "../../context/SnackbarContext"
import AppContext from "../../context/AppContext"
import ContractDetailsTable from "../components/ContractDetailsTable"
import StateStepper from "../components/StateStepper"
import { getContractViews, getContractHandler, buyerDelivered } from "../../Util"

export default function BuyerTrack() {
    const navigate = useNavigate()
    const {ctcInfo} = useParams()
    const {showErrorToast, showSuccessToast} = useContext(SnackbarContext)
    const {account} = useContext(AppContext)
    const [isLoading, setIsLoading] = useState(true)
    const [ctc, setCtc] = useState(null)

    const [cState, setCState] = useState(0)
    const [res, setRes] = useState({})

    const updateContractViews = useCallback(async () => {
        setIsLoading(true);

        try {
            setRes(await getContractViews({ account: account, ctcInfo: ctcInfo }))
        } catch (e) {
            showErrorToast(e.message);
        }
        showSuccessToast(`Contract retrieve successfully`)
        setIsLoading(false);
    }, [ctc, showErrorToast]);

    useEffect(() => {
        if (!ctcInfo) navigate("/")
        (async () => {
            try {
                const res = await getContractHandler(account, ctcInfo);
                setCtc(res)
            } catch (e) {
                showErrorToast(e.message);
            }

        })();
    }, [ctcInfo, navigate, showErrorToast]);

    useEffect(() => {
        if (!ctc) return;
        updateContractViews();
    }, [ctc, updateContractViews]);
    
    const onReceived = async() => {
        await buyerDelivered(ctc)
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