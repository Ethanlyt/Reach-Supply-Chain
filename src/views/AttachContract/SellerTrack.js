import React, { useState, useContext, useCallback, useEffect } from "react"
import Title from "../components/Title"
import { Button, Card, CardContent, Typography, TextField } from "@mui/material"
import ContractDetailsTable from "../components/ContractDetailsTable"
import { useNavigate, useParams } from "react-router-dom"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import * as backend from '../../reach-backend/index.main.mjs'
import AppContext from "../../context/AppContext"
import SnackbarContext from "../../context/SnackbarContext"


export default function SellerTrack () {
    const {ctcInfo} = useParams()
    const {account} = useContext(AppContext)
    const {showErrorToast} = useContext(SnackbarContext)
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)
    const [ingredient, setIngredient] = useState("")
    const [buyerAddress, setBuyerAddress] = useState("")
    const [cState, setCState] = useState(2)
    const [ctc, setCtc] = useState(null)

    const steps = [
        'Contract Approved. Waiting buyer to verify deliver',
        'Product Delivered. Buyer verified the product',
    ];

    const updateContractViews = useCallback(async () => {
        setIsLoading(true)
        try {
            const { ingredientName, buyerAddress, state } = await ctc.unsafeViews.Explorer.details()
            setIngredient(ingredientName)
            setBuyerAddress(buyerAddress)
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
            const ctc = account.contract(backend, JSON.parse(decodeURI(ctcInfo)));
            setCtc(ctc);
        } catch (e) {
            showErrorToast(e.message);
        }
    }, [ctcInfo, navigate, showErrorToast]);

    return <>
        <Title />
        <Card>
            <CardContent>
                <ContractDetailsTable
                    isLoading={isLoading}

                    contractAddress={JSON.stringify(JSON.parse(decodeURI(ctcInfo)))}
                    name={ingredient}
                    buyerAddress={buyerAddress}
                />
            </CardContent>
        </Card>
        <br />
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={cState} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
        {cState === 4 && 
            <h2>Contract Ended</h2>    
        }
        
    </>
}