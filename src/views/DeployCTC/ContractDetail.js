import React,{useContext, useState, useEffect} from 'react'
import { Typography, Card, CardContent, Button } from "@mui/material";
import Title from '../components/Title'
import { useNavigate,useLocation } from 'react-router-dom';
import Loading from '../components/Loading';

import AccountDetails from '../components/AccountDetails';
import AppContext from '../../context/AppContext';
import ContractContext from '../../context/ContractContext';
import SnackbarContext from '../../context/SnackbarContext';
import { saveAs } from 'file-saver';



export default function ContractDetail () {
    const navigate = useNavigate();
    const location = useLocation();
    const [ctcInfo, setCtcInfo] = useState();

    const {contract} = useContext(ContractContext);
    const {account} = useContext(AppContext)
    const { showSuccessToast } = useContext(SnackbarContext)

    const [url, seturl] = useState("")

    useEffect(() => {
        (async () => {
            const ctcInfo = await contract.getInfo();
            setCtcInfo(JSON.stringify(ctcInfo));
        })();
        seturl(`http://localhost:3000/Morra-Smart-Contract#/seller/order/${encodeURI(ctcInfoInput) }`)
    }, [contract]);

    //Share to other platform 
    const handleShareLink = () => {
        navigator.clipboard.writeText(url);
        showSuccessToast("Link Copied to Clipboard, please share link to the seller");
    }
    const handleShareQR = () => {
        saveAs(`https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=150x150`,'source-smart-qr.jpg')
        showSuccessToast("Saved QR, please share QR to the seller");
    }
    

    return <>
        {ctcInfo}
        <Title />
        <AccountDetails />
        <h3><i>You are <strong>Buyer</strong></i></h3>
        <span>Deploy New Contract</span>
        <br />
        <Card sx={{ minWidth: 300, maxWidth: '90vw', width: '100%'}}>
            <CardContent>
                <h2 className='text-center'><b>Contract Details</b></h2>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Ingredient Name: {location.state.ingredient}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Seller Address: {location.state.sellerAddress}
                </Typography>
            </CardContent>    
        </Card>

        <br /><br />

        <div className='d-flex justify-content-between w-75'>
            <div className='flex-column d-flex justify-content-center'>
                <Card sx={{ minWidth: 275, height: 180 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                            {url}
                        </Typography>
                    </CardContent>
                </Card>
                <br />
                <Button variant='outlined' onClick={handleShareLink}>Share Link</Button>
            </div>
            <div className='flex-column d-flex justify-content-center'>
                <Card sx={{ minWidth: 175, height: 180 }}>
                    <CardContent>
                        <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=150x150`} />
                    </CardContent>
                </Card>
                <br />
                <Button variant='outlined' onClick={handleShareQR}>Share QR</Button>
            </div>
        </div>

    </>
}