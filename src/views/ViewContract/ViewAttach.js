import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, TextField } from "@mui/material";

import SnackbarContext from "../../context/SnackbarContext";
import Title from "../components/Title";
import Loading from "../components/Loading";

import { parseAddress } from "../../Util";



export default function ViewAttach() {

    const navigate = useNavigate();
    
    const [ ctcInfoInput, setCtcInfoInput ] = useState('');
    const [ isLoading, setIsLoading] = useState(false);
    const { showErrorToast, showSuccessToast } = useContext(SnackbarContext);

    const onSubmit = async ()=> {
        if (!ctcInfoInput) return showErrorToast("Please fill in the required information");
        setIsLoading(true)
       
        try { 
            parseAddress(ctcInfoInput)
        } 
        catch (e) { 
            console.error(e);
            return showErrorToast(e.message);
        }
        setIsLoading(false);

        showSuccessToast(`Displaying contract: ${ctcInfoInput}`);
        navigate(`/view/${encodeURI(ctcInfoInput)}`);   
    }
    

    return <>
        <Title />

        <Typography variant="subtitle1" gutterBottom className='lead text-muted mb-4'>
            Please provide the contract information (contract address) to view:
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

        {isLoading ? <Loading message="Retrieving contract data" /> :
        
        <Button onClick={ onSubmit } variant="contained" className='my-2'>
            View
        </Button>
        }
    </>;
}