// ? Author: AdmiJW, Ethanlyt
// ?
// ? The page shown after the buyer deploys the contract.
// ? Displays contract information and means of sharing: QR or link



import React, {useContext, useState, useEffect } from 'react';
import { Typography, Card, CardContent, Button } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';
import AppContext from '../../context/AppContext';
import SnackbarContext from '../../context/SnackbarContext';

import AccountDetails from '../components/AccountDetails';
import Title from '../components/Title';
import ContractDetailsTable from '../components/ContractDetailsTable';

import { getContractHandler, getContractViews, getAppLink, getQrCodeDataUrl } from "../../Util"
import Loading from '../components/Loading';



export default function ContractDetail () {
    const navigate = useNavigate();
    const {ctcInfo} = useParams();

    const { account } = useContext(AppContext);
    const { showSuccessToast, showErrorToast } = useContext(SnackbarContext);

    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState("");
    const [ctcViews, setCtcViews] = useState({});
    const [qr, setQR] = useState("")
    

    // Copies the link to clipboard
    const handleShareLink = () => {
        navigator.clipboard.writeText(url);
        showSuccessToast("Link Copied to Clipboard, please share link to the seller");
    }
    

    // Downloads the QR code image
    const handleShareQR = () => {
        saveAs(qr, `sourcesmart-${ctcInfo}.jpg`);
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
                
                const url = `${ getAppLink() }seller/order/${ctcInfo}`;
                setUrl(url);
                setQR(await getQrCodeDataUrl(url));
            } catch (e) {
                showErrorToast(e.message);
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [account, ctcInfo, showSuccessToast, showErrorToast, navigate]);



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
                    {
                        qr ?
                        <img src={qr} alt='QR Code' />
                        :
                        <Loading message='Generating QR Code' />
                    }
                </CardContent>
                </Card>
                
                <Button variant='outlined' onClick={handleShareQR}>Download QR</Button>
            </div>
        </div>

    </>
}