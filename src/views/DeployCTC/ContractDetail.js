import React,{useState} from 'react'
import { Typography, Card, CardContent, Button } from "@mui/material";

export default function ContractDetail () {
    const [] = useState();

    return <>
        <h1>Buyer</h1>
        <span clas>Deploy New Contract</span>
        <br />
        <Card sx={{ minWidth: 675 }}>
            <CardContent>
                <h2 className='text-center'><b>Contract Details</b></h2>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Ingredient Name: 
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Seller Address:
                </Typography>
            </CardContent>    
        </Card>

        <br /><br />

        <div className='d-flex justify-content-between w-75'>
            <div className='flex-column d-flex justify-content-center'>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            www.google.com
                        </Typography>
                    </CardContent>
                </Card>
                <br />
                <Button variant='outlined'>Share Link</Button>
            </div>
            <div className='flex-column d-flex justify-content-center'>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        QRCODE
                    </CardContent>
                </Card>
                <br />
                <Button variant='outlined'>Share QR</Button>
            </div>
        </div>

    </>
}