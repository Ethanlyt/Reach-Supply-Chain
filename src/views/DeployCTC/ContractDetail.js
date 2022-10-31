// ? Author: AdmiJW, Ethanlyt
// ?
// ? The page shown after the buyer deploys the contract.
// ? Displays contract information and means of sharing: QR or link



import React, {useContext, useState, useEffect } from 'react';
import { Typography, Card, CardContent, Button } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';
import QRCode from 'qrcode';
import AppContext from '../../context/AppContext';
import SnackbarContext from '../../context/SnackbarContext';

import AccountDetails from '../components/AccountDetails';
import Title from '../components/Title';
import ContractDetailsTable from '../components/ContractDetailsTable';

import { getContractHandler, getContractViews, getAppLink } from "../../Util"

var opts = {
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    quality: 0.3,
    margin: 1,
    color: {
        dark: "#000000",
        light: "#FFFFFFFF"
    }
}

export default function ContractDetail () {
    const { account } = useContext(AppContext);
    const { showSuccessToast, showErrorToast } = useContext(SnackbarContext);

    const navigate = useNavigate();
    const {ctcInfo} = useParams();
    
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState("");
    const [ctcViews, setCtcViews] = useState({});
    const [qr, setQR] = useState("")
    

    // Copies the link to clipboard
    const handleShareLink = () => {
        navigator.clipboard.writeText(url);
        showSuccessToast("Link Copied to Clipboard, please share link to the seller");
    }
    
    const generateQR = async () => {
        try {
            return await QRCode.toDataURL(url, opts);
        } catch (err) {
            return showErrorToast("Unable to generate QR code");
        }
    }

    // Downloads the QR code image
    const handleShareQR = () => {
        saveAs(qr,'source-smart-qr.jpg');
        showSuccessToast("Saved QR, please share QR to the seller");
    }

    
    useEffect(() => {
        if (!account) {
            navigate("/");
            showErrorToast("Please connect your wallet first");
        }
    }, [account, navigate, showErrorToast]);


    useEffect(() => {
        if (!account || !ctcInfo) return navigate('/');
        setIsLoading(true);

        (async ()=> {
            try {
                const ctc = await getContractHandler(account, decodeURI(ctcInfo));
                setCtcViews(await getContractViews({ ctc }));
                showSuccessToast("Contract information retrieved successfully");
                setUrl(`${ getAppLink() }seller/order/${ctcInfo}`);
                // const qrInfo = await generateQR();
                setQR(generateQR());
            } catch (e) {
                showErrorToast(e.message);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [account, ctcInfo, showSuccessToast, showErrorToast, navigate, qr]);



    return <>
        <Title />
        <AccountDetails />

        <Typography variant='h4'>
            You are <strong>Buyer</strong>
        </Typography>

        <Typography variant='h6' gutterBottom>
            Contract Deployed
        </Typography>

        <Typography variant='subtitle2'>
            To view your contract information, kindly remember the contract address and view the progress in 'Attach Contract'
        </Typography>


        <Card sx={{ minWidth: 300, maxWidth: '90vw', width: '100%', mt: 3 }}>
        <CardContent>
            <ContractDetailsTable
                isLoading={isLoading}
                contractAddress={ctcViews?.contractAddress}
                name={ctcViews?.name}
                supplierAddress={ctcViews?.supplierAddress}
                deployedNetworkTime={ctcViews?.deployedNetworkTime}
                reviewedNetworkTime={ctcViews?.reviewedNetworkTime}
                deliveredNetworkTime={ctcViews?.deliveredNetworkTime}
            />
        </CardContent>    
        </Card>
        

        <div className='d-flex justify-content-center mt-3 gap-1'>

            <div className='flex-column d-flex justify-content-center'>
                <Card sx={{ mb: 2, flex: 1 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 16, wordBreak: 'break-all' }} color="text.secondary" gutterBottom>
                        {url}
                    </Typography>
                </CardContent>
                </Card>
                
                <Button variant='outlined' onClick={handleShareLink}>Copy Link</Button>
            </div>

            <div className='flex-column d-flex justify-content-center'>
                <Card sx={{ minWidth: 175, mb: 2, flex: 1 }}>
                <CardContent>
                    <img 
                        id='qrImage'
                        src={qr} 
                        alt='QR for seller to attach' 
                    />
                </CardContent>
                </Card>
                
                <Button variant='outlined' onClick={handleShareQR}>Download QR</Button>
            </div>
        </div>

    </>
}