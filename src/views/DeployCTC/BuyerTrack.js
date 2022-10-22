import React, { useContext, useState, useEffect, useCallback } from "react"
import Title from "../components/Title"
import { Button, Card, CardContent, Typography, TextField } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import SnackbarContext from "../../context/SnackbarContext"
import AppContext from "../../context/AppContext"
import ContractDetailsTable from "../components/ContractDetailsTable"
import * as backend from '../../reach-backend/index.main.mjs'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

export default function BuyerTrack() {
    const navigate = useNavigate()
    const {ctcInfo} = useParams()
    const {showErrorToast, showSuccessToast} = useContext(SnackbarContext)
    const {account} = useContext(AppContext)
    const [isLoading, setIsLoading] = useState(true)
    const [ctc, setCtc] = useState(null)

    const [ingredient, setIngredient] = useState("")
    const [sellerAddress, setSellerAddress] = useState("")
    const [buyerAddress, setBuyerAddress] = useState("")
    const [cState, setCState] = useState(0)

    const steps = [
        'Waiting for seller to review',
        'Seller has shipped their product',
        'You have received the product',
    ];

    const updateContractViews = useCallback(async () => {
        setIsLoading(true)
        try {
            const { ingredientName, buyerAddress, supplierAddress, state } = await ctc.unsafeViews.Explorer.details()
            setIngredient(ingredientName)
            setSellerAddress(supplierAddress)
            setBuyerAddress(buyerAddress)
            setCState(parseInt(state))
        } catch (error) {
            showErrorToast(error.message)
        }
        setIsLoading(false)
    })

    useEffect(() => {
        if (!ctcInfo) navigate("/")

        try {
            const ctc = account.contract(backend, decodeURI(ctcInfo));
            setCtc(ctc);
        } catch (e) {
            showErrorToast(e.message);
        }
    }, [ctcInfo, navigate, showErrorToast]);

    const onReceived = () => {
        setCState(prevState => prevState + 1)
    }

    return <>
        <Title />
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={cState} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
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

                            contractAddress={decodeURI(ctcInfo)}
                            name={ingredient}
                            buyerAddress={buyerAddress}
                            supplierAddress={sellerAddress}
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