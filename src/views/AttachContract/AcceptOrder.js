import React, { useState, useContext,useCallback, useEffect} from "react"
import Title from "../components/Title"
import { Button, Typography, TextField, Card, CardContent } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import ContractContext from "../../context/ContractContext"
import * as backend from '../../reach-backend/index.main.mjs'
import ContractDetailsTable from "../components/ContractDetailsTable"
import SnackbarContext from "../../context/SnackbarContext"
import AppContext from "../../context/AppContext"
import Loading from "../components/Loading"
import { getContractHandler, getContractViews , supplierAddIngredient, supplierAccept} from "../../Util"
import ConnectAccount from "../ConnectAccount"

export default function AcceptOrder () {
    const navigate = useNavigate()
    const {ctcInfo} = useParams()
    const {account} = useContext(AppContext)
    const { showErrorToast, showSuccessToast } = useContext(SnackbarContext);
    const [ctc, setCtc] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [res, setRes] = useState({})

    const [ingredientToAdd, setIngredientToAdd] = useState("");

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


    const handleSubmit = async () => {
        await supplierAccept(ctc)
        showSuccessToast("Contract has been approved");
        navigate(`/seller/track/${ctcInfo}`)
    } 

    const submitAddIngredient = async () => {
        setIsSubmitting(true);

        try {
            await supplierAddIngredient(ctc, ingredientToAdd);
            showSuccessToast("Ingredient added successfully");
            setIngredientToAdd("");
            updateContractViews();
        } catch (e) {
            showErrorToast(e.message);
        }

        setIsSubmitting(false);
    }

    if (!account) return <ConnectAccount />

    return <>
        <Card sx={{ minWidth: 675 }}>
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
        {isSubmitting ? <Loading message='Submitting ingredient...' /> :
            <Card sx={{ minWidth: 675 }} >
            <CardContent>
                <TextField
                        sx={{ minWidth: 575 }}
                    className='mb-1 mt-3'
                    label="Ingredient to add"
                    variant="filled"
                    value={ingredientToAdd}
                    onChange={(e) => setIngredientToAdd(e.target.value)}
                />
                <br />
                    <Button variant="contained" color="primary" className='mt-4' onClick={submitAddIngredient}>
                    Add ingredient
                </Button>
            </CardContent>
        </Card>
        }
        <br/>
        <Button variant="outlined" onClick={handleSubmit}>
            Accept Order
        </Button>

    </>
}