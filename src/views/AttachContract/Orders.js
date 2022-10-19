import React,{useContext, useState} from "react"
import Loading from "../components/Loading"
import { Button, Card, Typography, CardContent } from "@mui/material"
import Title from '../components/Title'
import AccountDetails from "../components/AccountDetails"
import ContractContext from "../../context/ContractContext"
import AppContext from "../../context/AppContext"
import SnackbarContext from "../../context/SnackbarContext"
import { useNavigate } from "react-router-dom"

export default function Order () {
    const navigate = useNavigate()
    const { contract } = useContext(ContractContext);
    const { account } = useContext(AppContext)
    const { showSuccessToast, showErrorToast} = useContext(SnackbarContext)
    
    const handleAccept = () =>{
        console.log("triggered")
        navigate("/seller/accept")
    }
    const handleReject = () => {
        navigate("/seller/reject")
    }


    return <>
        <Title />
        <AccountDetails />
        <h3><i>You are <strong>Seller</strong></i></h3>

        
        {contract ? <Loading message="Displaying contract..." />
        :
        <div>
            <Card sx={{ minWidth: 675 }}>
                <CardContent>
                    <h2 className='text-center'><b>Contract Details</b></h2>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Ingredient Name:
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Buyer Address:
                    </Typography>
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