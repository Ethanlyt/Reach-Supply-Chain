import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";

import SnackbarContext from "../../context/SnackbarContext";
import { ToggleDrawer, FloatingActionButtonDrawerToggle } from "../components/Drawer";

import FeedIcon from '@mui/icons-material/Feed';

import Title from "../components/Title";
import Loading from "../components/Loading";
import ContractDetailsTable from "../components/ContractDetailsTable";


export default function ViewAttach() {

    const navigate = useNavigate();
    const { ctcInfo } = useParams();
    
    const [ currentCtc, setCurrentCtc ] = useState(null);
    const [ isDrawerOpen, setIsDrawerOpen ] = useState(false);
    const { showErrorToast } = useContext(SnackbarContext);

    const [ isLoading, setIsLoading ] = useState(false);


    useEffect(()=> {
        if (!ctcInfo) navigate('/view/attach');
        // TODO: Load the parent ctcInfo here.
    }, [ctcInfo, navigate]);



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
                    description='Ajinomoto Monosodium Glutamate is a food additive used to enhance the flavor of foods.'
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