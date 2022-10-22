import React, { useContext, useState, useEffect, useCallback } from "react"
import Loading from "../components/Loading"
import { Button, Card, Typography, CardContent } from "@mui/material"
import Title from '../components/Title'
import AccountDetails from "../components/AccountDetails"
import ContractContext from "../../context/ContractContext"
import AppContext from "../../context/AppContext"
import SnackbarContext from "../../context/SnackbarContext"
import { useNavigate, useParams } from "react-router-dom"
import * as backend from '../../reach-backend/index.main.mjs'

import ContractDetailsTable from "../components/ContractDetailsTable"

export default function Order () {
    const navigate = useNavigate()
    const { contract } = useContext(ContractContext);
    const {ctcInfo} = useParams()
    const { account } = useContext(AppContext)
    const { showSuccessToast, showErrorToast} = useContext(SnackbarContext)
    const [isLoading, setIsLoading] = useState(true)
    const [ctc, setCtc] = useState(null)

    const [name, setName] = useState("");
    const [buyerAddress, setBuyerAddress] = useState("");
    const [supplierAddress, setSupplierAddress] = useState("");
    const [cState, setCState] = useState(0);
    const [listOfIngredients, setListOfIngredients] = useState([]);
    const [rejectReason, setRejectReason] = useState("");
    const [deployedNetworkTime, setDeployedNetworkTime] = useState(0);
    const [reviewedNetworkTime, setReviewedNetworkTime] = useState(0);
    const [deliveredNetworkTime, setDeliveredNetworkTime] = useState(0);
    
    const updateContractViews = useCallback(async () => {
        setIsLoading(true);

        try {
            const { name, buyerAddress, supplierAddress, state } = await ctc.unsafeViews.Explorer.details();
            setName(name);
            setBuyerAddress(buyerAddress);
            setSupplierAddress(supplierAddress);
            setCState(parseInt(state));

            setListOfIngredients(await ctc.unsafeViews.Explorer.listOfIngredients());
            setRejectReason(await ctc.unsafeViews.Explorer.rejectReason());
            setDeployedNetworkTime(parseInt(await ctc.unsafeViews.Explorer.deployedNetworkTime()));
            setReviewedNetworkTime(parseInt(await ctc.unsafeViews.Explorer.reviewedNetworkTime()));
            setDeliveredNetworkTime(parseInt(await ctc.unsafeViews.Explorer.deliveredNetworkTime()));
        } catch (e) {
            showErrorToast(e.message);
        }

        setIsLoading(false);
    }, [ctc, showErrorToast]);

    useEffect(() => {
        if (!account) navigate("/");
    }, [account, navigate]);

    useEffect(() => {
        // if (!ctcInfo) navigate("/");

        try {
            const ctc = account.contract(backend, decodeURI(ctcInfo));
            setCtc(ctc);
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

    useEffect(() => {
        if (!ctc) return;
        updateContractViews();
    }, [ctc, updateContractViews]);

    return <>
        <Title />
        <AccountDetails />
        <h3><i>You are <strong>Seller</strong></i></h3>

        
        {contract ? <Loading message="Displaying contract..." />
        :
        <div>
            {/* <Card sx={{ minWidth: 675 }}>
                <CardContent>
                    <h2 className='text-center'><b>Contract Details</b></h2>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Ingredient Name:
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Buyer Address:
                    </Typography>
                </CardContent>
            </Card> */}
            <Card>
                <CardContent>
                    <ContractDetailsTable
                        isLoading={isLoading}

                        contractAddress={decodeURI(ctcInfo)}
                        name={name}
                        buyerAddress={buyerAddress}
                        supplierAddress={supplierAddress}
                        state={cState}
                        listOfIngredients={listOfIngredients}
                        rejectReason={rejectReason}
                        deployedNetworkTime={deployedNetworkTime}
                        reviewedNetworkTime={reviewedNetworkTime}
                        deliveredNetworkTime={deliveredNetworkTime}
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