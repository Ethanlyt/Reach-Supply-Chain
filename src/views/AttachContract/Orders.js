import React, { useContext, useState, useEffect, useCallback } from "react"
import Loading from "../components/Loading"
import { Button, Card, Typography, CardContent } from "@mui/material"
import Title from '../components/Title'
import AccountDetails from "../components/AccountDetails"
import ContractContext from "../../context/ContractContext"
import AppContext from "../../context/AppContext"
import SnackbarContext from "../../context/SnackbarContext"
import { useNavigate, useParams } from "react-router-dom"
import { getContractHandler, getContractViews } from "../../Util"
import ContractDetailsTable from "../components/ContractDetailsTable"

export default function Order () {
    const navigate = useNavigate()
    const { contract } = useContext(ContractContext);
    const {ctcInfo} = useParams()
    const { account } = useContext(AppContext)
    const { showSuccessToast, showErrorToast} = useContext(SnackbarContext)
    const [isLoading, setIsLoading] = useState(true)
    const [ctc, setCtc] = useState(null)

    const [res , setRes] = useState(null)
    
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
        if (!account) navigate("/");
    }, [account, navigate]);

    useEffect(() => {
        // if (!ctcInfo) navigate("/");

        try {
            setCtc(getContractHandler(account, decodeURI(ctcInfo)));
        } catch (e) {
            showErrorToast(e.message);
        }
    }, [ctcInfo, navigate, showErrorToast]);

    useEffect(() => {
        if (!ctc) return;
        updateContractViews();
    }, [ctc, updateContractViews]);


    const handleAccept = () =>{
        navigate(`/seller/accept/${ctcInfo}`)
    }
    const handleReject = () => {
        navigate(`/seller/reject/${ctcInfo}`)
    }

    return <>
        <Title />
        <AccountDetails />
        <h3><i>You are <strong>Seller</strong></i></h3>

        
        {contract ? <Loading message="Displaying contract..." />
        :
        <div>
            <Card>
                <CardContent>
                    <ContractDetailsTable
                        isLoading={isLoading}

                        contractAddress={res.contractAddress}
                        name={res.name}
                        buyerAddress={res.buyerAddress}
                        supplierAddress={res.supplierAddress}
                        state={res.state}
                        listOfIngredients={res.listOfIngredients}
                        rejectReason={res.rejectReason}
                        deployedNetworkTime={res.deployedNetworkTime}
                        reviewedNetworkTime={res.reviewedNetworkTime}
                        deliveredNetworkTime={res.deliveredNetworkTime}
                    />
                </CardContent>
            </Card>
            <br />

            <div className="d-flex justify-content-between">
                <Button variant="outlined" onClick={handleAccept}>
                    Accept Order
                </Button>
            
                    <Button variant="outlined" onClick={handleReject}>
                    Reject Order
                </Button>
            </div>
        </div>}
    </>
}