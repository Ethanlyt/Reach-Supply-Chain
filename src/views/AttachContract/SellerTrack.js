import React, { useState } from "react"
import Title from "../components/Title"
import { Button, Card, CardContent, Typography, TextField } from "@mui/material"

export default function SellerTrack () {
    return <>
        <Title />
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

        
    </>
}