import React,{useContext, useState, useEffect, useCallback} from 'react'
import { Typography, Card, CardContent, Button } from "@mui/material";
import Title from '../components/Title'
import { useNavigate,useLocation, useParams } from 'react-router-dom';
import Loading from '../components/Loading';

import AccountDetails from '../components/AccountDetails';
import AppContext from '../../context/AppContext';
import ContractContext from '../../context/ContractContext';
import SnackbarContext from '../../context/SnackbarContext';

import ContractDetailsTable from '../components/ContractDetailsTable';
import { saveAs } from 'file-saver';
import * as backend from '../../reach-backend/index.main.mjs'



export default function ContractDetail () {
    const { contract } = useContext(ContractContext);
    const { account } = useContext(AppContext)
    const { showSuccessToast, showErrorToast } = useContext(SnackbarContext)

    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false)
    const {ctcInfo} = useParams();

    const [url, seturl] = useState("")
    const [ctc, setCtc] = useState(null)

    const [ingredient, setIngredient] = useState("")
    const [sellerAddress, setSellerAddress] = useState("")
    const [cState, setCState] = useState(0)
    const [deployedNetworkTime, setDeployedNetworkTime] = useState(0);
    const [reviewedNetworkTime, setReviewedNetworkTime] = useState(0);
    const [deliveredNetworkTime, setDeliveredNetworkTime] = useState(0);

    const updateContractViews = useCallback(async() => {
        setIsLoading(true)
        try{
            const { ingredientName, supplierAddress, state} = await ctc.unsafeViews.Explorer.details()
            setIngredient(ingredientName)
            setSellerAddress(supplierAddress)
            setCState(parseInt(state))
            setDeployedNetworkTime(parseInt(await ctc.unsafeViews.Explorer.deployedNetworkTime()));
            setReviewedNetworkTime(parseInt(await ctc.unsafeViews.Explorer.reviewedNetworkTime()));
            setDeliveredNetworkTime(parseInt(await ctc.unsafeViews.Explorer.deliveredNetworkTime()));
        } catch (error) {
            showErrorToast(error.message)
        }
        setIsLoading(false)
    })


    useEffect(() => {
        if (!account) navigate("/");
    }, [account, navigate]);

    useEffect(() => {
        if(!ctcInfo) navigate("/")

        try {
            const ctc = account.contract(backend, JSON.parse(decodeURI(ctcInfo)));
            setCtc(ctc);
        } catch (e) {
            showErrorToast(e.message);
        }
        seturl(`http://localhost:3000/Morra-Smart-Contract#/seller/order/${ctcInfo}`)
    }, [ctcInfo, navigate, showErrorToast]);

    useEffect(() => {
        if (!ctc) return;
        updateContractViews();
    }, [ctc, updateContractViews]);

    useEffect(() => {
        if (cState === 1) navigate(`buyer/track/${ctcInfo}`);
        else if (cState === 2) navigate(`buyer/track/${ctcInfo}`);
        else return showSuccessToast(`Waiting seller to review`)
    }, [cState, navigate]);

    //Share to other platform 
    const handleShareLink = () => {
        navigator.clipboard.writeText(url);
        showSuccessToast("Link Copied to Clipboard, please share link to the seller");
    }
    const handleShareQR = () => {
        saveAs(`https://api.qrserver.com/v1/create-qr-code/?data=${url}&size=150x150`,'source-smart-qr.jpg');
        showSuccessToast("Saved QR, please share QR to the seller");
    }
    

    return <>
        <Title />
        <AccountDetails />
        <h3><i>You are <strong>Buyer</strong></i></h3>
        <span>Deploy New Contract</span>
        <br />
        <Card sx={{ minWidth: 300, maxWidth: '90vw', width: '100%'}}>
            <CardContent>
                {/* <h2 className='text-center'><b>Contract Details</b></h2>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Ingredient Name: {ingredient}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Seller Address: {sellerAddress}
                </Typography> */}
                <ContractDetailsTable
                    isLoading={isLoading}
                    contractAddress={JSON.stringify(JSON.parse(decodeURI(ctcInfo)))}
                    name={ingredient}
                    supplierAddress={sellerAddress}
                    deployedNetworkTime={deployedNetworkTime}
                    reviewedNetworkTime={reviewedNetworkTime}
                    deliveredNetworkTime={deliveredNetworkTime}
                />
            </CardContent>    
        </Card>
        
 

        <br /><br />

        <div className='d-flex justify-content-between w-75'>
            <div className='flex-column d-flex justify-content-center'>
                <Card sx={{ minWidth: 275, height: 280 }}>
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
                <Card sx={{ minWidth: 175, height: 280 }}>
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