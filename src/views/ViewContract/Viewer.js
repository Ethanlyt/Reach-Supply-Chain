import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Typography, Button, IconButton, Fab, Divider } from "@mui/material";

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import SnackbarContext from "../../context/SnackbarContext";
import { ToggleDrawer } from "../components/Drawer";
import Title from "../components/Title";


export default function ViewAttach() {

    const navigate = useNavigate();
    const { ctcInfo } = useParams();
    
    const [ currentCtc, setCurrentCtc ] = useState(null);
    const [ isDrawerOpen, setIsDrawerOpen ] = useState(false);
    const { showErrorToast } = useContext(SnackbarContext);


    useEffect(()=> {
        if (!ctcInfo) navigate('/view/attach');
    }, [ctcInfo, navigate]);


    return <>
        <Title />

        <Button 
            onClick={ ()=> navigate(`/view/attach`) }
            variant="contained"
            color="primary"
            className='my-2'
        >
            Back
        </Button>

        {/* Drawer and toggle button */}
        <Fab 
            variant="extended"
            onClick={ ()=> setIsDrawerOpen((prev)=> !prev) }
            color='primary'
            className='my-2'
            sx={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
            }}
        >
            <FormatListBulletedIcon sx={{ mr: 1 }} /> 
            Contracts
        </Fab>


        <ToggleDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} title='Contracts'>
        </ToggleDrawer>
    </>;
}