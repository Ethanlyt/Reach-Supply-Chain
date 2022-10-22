import React, { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";

import AppContext from "../../context/AppContext";

import { ToggleDrawer, FloatingActionButtonDrawerToggle } from "../components/Drawer";


import Title from "../components/Title";
import Loading from "../components/Loading";
import ContractDetailsTable from "../components/ContractDetailsTable";
import ViewTree from "./ViewTree";

import FeedIcon from '@mui/icons-material/Feed';
import WidgetsIcon from '@mui/icons-material/Widgets';

import { getContractViews } from "../../Util";




export default function ViewAttach() {

    const navigate = useNavigate();
    const { ctcInfo } = useParams();
    
    const { account } = useContext(AppContext);

    const [ currentCtc, setCurrentCtc ] = useState(null);
    const [ contracts, setContracts ] = useState({});

    const [ isDrawerOpen, setIsDrawerOpen ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isChildrenLoading, setIsChildrenLoading ] = useState(false);



    // Given a list of contract address (Information), fetch all of its children and update to contracts(and parents)
    const fetchChildren = useCallback(async (list, currentCtc)=> {
        setIsChildrenLoading(true);

        for (let ing of list) {
            if (ing === currentCtc) continue;
            const view = await getContractViews({ account: account, ctcInfo: ing });
            
            setContracts(prev => ({ ...prev, [ing]: view }) );
        }

        setIsChildrenLoading(false);
    }, [account]);




    // When the url parameter's ctcInfo is changed, we need to update the currentCtc, as the root ctc has changed too
    useEffect(()=> {
        if (!ctcInfo) navigate('/view/attach');
        setCurrentCtc(ctcInfo);
    }, [account, ctcInfo, navigate]);


    // When the currentCtc is changed, we need to fetch its newest contract info from the blockchain
    useEffect(()=> {
        if (!currentCtc) return;
        setIsLoading(true);
        
        (async ()=> {
            const view = await getContractViews({ account: account, ctcInfo: currentCtc });

            setContracts(prev => ({ ...prev, [currentCtc]: view }) );
            fetchChildren(view.listOfIngredients, currentCtc);
            setIsLoading(false);
        })();

    }, [currentCtc, account, fetchChildren]);


    if (isLoading) return <Loading message="Retrieving contract information. Please wait" />;

    const {
        name, buyerAddress, supplierAddress, contractAddress, state,
        listOfIngredients, rejectReason, deployedNetworkTime, deliveredNetworkTime, reviewedNetworkTime
    } = contracts[currentCtc] || {};


    return <>
        <Title />

        <Card sx={{ minWidth: 300, width: '100%', maxWidth: 600 }} className='my-4'>
            <CardContent>
                <Typography variant="h5" className='mb-4 display'>
                    Contract Details 
                    <FeedIcon sx={{ ml: 1 }} />
                </Typography>

                <ContractDetailsTable 
                    name={name}
                    buyerAddress={buyerAddress}
                    supplierAddress={supplierAddress}
                    contractAddress={contractAddress}
                    state={state}
                    rejectReason={rejectReason}
                    deployedNetworkTime={deployedNetworkTime}
                    deliveredNetworkTime={deliveredNetworkTime}
                    reviewedNetworkTime={reviewedNetworkTime}
                />
            </CardContent>
        </Card>


        <Typography variant="h4" className='mb-4 display'>
            Ingredients
            <WidgetsIcon sx={{ ml: 1 }} />
        </Typography>

        {
            (isChildrenLoading) ? 
            <Card sx={{ minWidth: 300, width: '100%', maxWidth: 400 }} className='my-1'>
                <Loading message="Retrieving ingredient info..." />
            </Card> 
            :
            (listOfIngredients?.filter( ing => ing !== currentCtc && contracts[ing] ).length === 0) ?
            <Typography variant="subtitle1" className='mb-4 d-flex align-items-center'>
                This item has no upper-level ingredients.
            </Typography>
            :
            listOfIngredients
                ?.filter(ing => ing !== currentCtc && contracts[ing] )
                .map(ing => <Box key={ing}>
                    <Card sx={{ minWidth: 300, width: '100%', maxWidth: 700 }} className='my-2 p-2 d-flex gap-3'>
                        <ContractDetailsTable 
                            name={ contracts[ing].name }
                            contractAddress={ ing }
                            state={ contracts[ing].state }
                        />

                        <Button variant="contained" color="secondary" className='m-2' onClick={()=> setCurrentCtc(ing)} >
                            View Details
                        </Button>
                    </Card> 
                </Box>
            )
        }


        <Button onClick={()=> navigate(`/view/attach`)} variant="contained" color="warning" className='my-2' >
            Back
        </Button>



        {/* Drawer and Its toggle */}
        <FloatingActionButtonDrawerToggle label='Contracts' onClick={ ()=> setIsDrawerOpen(prev => !prev) } />
        
        <ToggleDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} title='Contracts'>
            <ViewTree 
                contracts={contracts} 
                currentCtc={currentCtc}
                setCurrentCtc={setCurrentCtc}
                setIsDrawerOpen={setIsDrawerOpen}
                rootCtc={ctcInfo}
            />
        </ToggleDrawer>
    </>
}