import React, { useState, useContext} from "react"
import Title from "../components/Title"
import { Button, Typography, TextField, Card, CardContent } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import ContractContext from "../../context/ContractContext"

export default function AcceptOrder () {
    const navigate = useNavigate()
    const {accept} = useContext(ContractContext);
    const {ctcinfo} = useParams()

    const handleSubmit = () => {
        accept("ingredient")
        navigate('/seller/track')
    } 

    return <>
        <Card sx={{ minWidth: 675 }}>
            <CardContent>
                <h2 className='text-center'><b>Contract Details</b></h2>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Ingredient Name: {ctcinfo}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Buyer Address: {ctcinfo}
                </Typography>
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