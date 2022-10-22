import React, { useState, useContext,useCallback, useEffect} from "react"
import Title from "../components/Title"
import { Button, Typography, TextField, Card, CardContent } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import ContractContext from "../../context/ContractContext"
import * as backend from '../../reach-backend/index.main.mjs'
import ContractDetailsTable from "../components/ContractDetailsTable"
import SnackbarContext from "../../context/SnackbarContext"
import AppContext from "../../context/AppContext"

export default function AcceptOrder () {
    const navigate = useNavigate()
    const {accept} = useContext(ContractContext);
    const {ctcInfo} = useParams()
    const {account} = useContext(AppContext)
    const { showErrorToast, showSuccessToast } = useContext(SnackbarContext);
    const [ctc, setCtc] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

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
        if (!ctcInfo) navigate("/");

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


    const handleSubmit = () => {
        accept("ingredient")
        navigate(`/seller/track/${ctcInfo}`)
    } 

    return <>
        <Card sx={{ minWidth: 675 }}>
            <CardContent>
                {/* <h2 className='text-center'><b>Contract Details</b></h2>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Ingredient Name: {ctcinfo}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Buyer Address: {ctcinfo}
                </Typography> */}
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
        <Card sx={{ minWidth: 675 }}>
            <CardContent>
                <h2 className='text-center'><b>List of Address</b></h2>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    [address here]
                </Typography>
            </CardContent>
        </Card>
        <br/>
        <Button variant="outlined" onClick={handleSubmit}>
            Accept Order
        </Button>

    </>
}