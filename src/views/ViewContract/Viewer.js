import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";

import AppContext from "../../context/AppContext";
import SnackbarContext from "../../context/SnackbarContext";

import { ToggleDrawer, FloatingActionButtonDrawerToggle } from "../components/Drawer";


import Title from "../components/Title";
import Loading from "../components/Loading";
import ContractDetailsTable from "../components/ContractDetailsTable";

import FeedIcon from '@mui/icons-material/Feed';

import { getContractViews, getContractHandler } from "../../Util";




export default function ViewAttach() {

    const navigate = useNavigate();
    const { ctcInfo } = useParams();
    
    const { account } = useContext(AppContext);
    const { showErrorToast } = useContext(SnackbarContext);

    const [ rootCtc, setRootCtc ] = useState(null);
    const [ currentCtc, setCurrentCtc ] = useState(null);
    const [ isDrawerOpen, setIsDrawerOpen ] = useState(false);

    const [ isLoading, setIsLoading ] = useState(true);


    useEffect(()=> {
        if (!ctcInfo) navigate('/view/attach');
        
        (async ()=> {
            const ctc = await getContractHandler(account, ctcInfo);
            setRootCtc(ctc);
            setCurrentCtc(ctc);
        })();
    }, [account, ctcInfo, navigate]);


    useEffect(()=> {
        if (!currentCtc) return;

        (async ()=> {
            const view = await getContractViews({ ctc: currentCtc });
            console.dir(view);
        })();
    }, [currentCtc]);



    if (isLoading) return <Loading message="Retrieving contract information. Please wait" />;


    return <>
        <Title />

        <Card sx={{ minWidth: 300, width: '100%', maxWidth: 600 }} className='my-4'>
            <CardContent>
                <Typography variant="h5" className='mb-4 d-flex align-items-center'>
                    Contract Details 
                    <FeedIcon sx={{ ml: 1 }} />
                </Typography>

                <ContractDetailsTable 
                    contractAddress='0x1213123123123213123'
                    buyerAddress='0x1213123123123213123'
                    supplierAddress='0x1213123123123213123'
                    name='Ajinomoto Monosodium Glutamate'
                    state={1}
                    listOfIngredients={['0x1231231232131231', '0x1231231232131231', '0x1231231232131231']}
                    rejectReason='Not enough salt'
                    deployedNetworkTime={1620000000}
                    reviewedNetworkTime={1620000000}
                    deliveredNetworkTime={1620000000}
                />

            </CardContent>
        </Card>


        <Button 
            onClick={ ()=> navigate(`/view/attach`) }
            variant="contained"
            color="primary"
            className='my-2'
        >
            Back
        </Button>



        {/* Drawer and Its toggle */}
        <FloatingActionButtonDrawerToggle label='Contract' onClick={ ()=> setIsDrawerOpen(prev => !prev) } />
        
        <ToggleDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} title='Contracts'>
        </ToggleDrawer>
    </>;
}