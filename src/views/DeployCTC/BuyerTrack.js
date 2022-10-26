import React, { useContext, useState, useEffect, useCallback } from "react"
import Title from "../components/Title"
import { Button, Card, CardContent, Typography, TextField } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import SnackbarContext from "../../context/SnackbarContext"
import AppContext from "../../context/AppContext"
import ContractDetailsTable from "../components/ContractDetailsTable"
import StateStepper from "../components/StateStepper"
import { getContractViews, getContractHandler, buyerDelivered } from "../../Util"
import Loading from "../components/Loading"

export default function BuyerTrack() {
    const navigate = useNavigate()
    const {ctcInfo} = useParams()
    const {showErrorToast, showSuccessToast} = useContext(SnackbarContext)
    const {account} = useContext(AppContext)
    const [isLoading, setIsLoading] = useState(true)
    const [isRetrievingCtc, setIsRetrievingCtc] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [buttonDissapear, setButtonDissapear] = useState(false)
    const [url, setUrl] = useState("")

    const [ctc, setCtc] = useState({})
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
        setIsRetrievingCtc(true);
        (async () => {
            try {
                const res = await getContractHandler(account, ctcInfo);
                setCtc(res)
            } catch (e) {
                showErrorToast(e.message);
            }

        })();
        setUrl(`http://localhost:3000/#/view/${encodeURI(ctcInfo)}`)
        setIsRetrievingCtc(false);
    }, [ctcInfo, navigate, showErrorToast, setIsRetrievingCtc, setIsSubmit]);

    useEffect(() => {
        if (!ctc) return;
        updateContractViews();
    }, [ctc, updateContractViews, setIsSubmit]);
    
    const onReceived = async() => {
        setButtonDissapear(true)
        setIsSubmit(true)
        setIsLoading(true)
        await buyerDelivered(ctc)
        setIsSubmit(false)
        setIsLoading(false)
    }

    if(isRetrievingCtc) return <Loading message="Retrieving contract" />

    return <>
        <Title />
        <h3><i>You are <strong>Buyer</strong></i></h3>
        <StateStepper state={res.state} />
        {res.state === 1 && buttonDissapear === true &&
            <Button variant="contained" color="primary" className='mt-4' onClick={onReceived}>
                Order Received
            </Button>
        }
        {isSubmit && <Loading message="Approving delivered" />}
        {res.state === 3 &&
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
            <Card sx={{ minWidth: 175, height: 280 }}>
                <CardContent>
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=150x150`} />
                </CardContent>
            </Card>
            <h2 className="text-success">Please Print This QR At Your Product</h2>
            </>
        }
        

    </>
}