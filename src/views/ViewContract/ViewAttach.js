import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, TextField } from "@mui/material";

import SnackbarContext from "../../context/SnackbarContext";
import Title from "../components/Title";


export default function ViewAttach() {

    const navigate = useNavigate();
    
    const [ ctcInfoInput, setCtcInfoInput ] = useState('');
    const { showErrorToast } = useContext(SnackbarContext);




    const onSubmit = async ()=> {
        if (!ctcInfoInput) return showErrorToast('Please enter the contract information');

        try {
            JSON.parse(ctcInfoInput);   // Test if it is valid JSON
        } catch (e) {
            return showErrorToast('Invalid contract information: ' + e.message);
        }

        navigate(`/view/${ encodeURI(ctcInfoInput) }`);
    }

    return <>
        <Title />

        <Typography variant="subtitle1" gutterBottom className='lead text-muted mb-4'>
            Please provide the contract information to view:
        </Typography>

        <TextField
            label="Contract Information"
            multiline
            rows={4}
            variant="filled"
            sx={{ minWidth: '300px', maxWidth: '500px', width: '100%' }}
            value={ctcInfoInput}
            onChange={(e)=> setCtcInfoInput(e.target.value)}
        />

        <Button 
            onClick={ onSubmit } 
            variant="contained"
            className='my-2'
        >
            View
        </Button>
    </>;
}