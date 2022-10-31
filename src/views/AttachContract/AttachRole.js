import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, TextField } from "@mui/material";

import PostAddIcon from '@mui/icons-material/PostAdd';

import SnackbarContext from "../../context/SnackbarContext";
import AppContext from "../../context/AppContext";

import Title from "../components/Title";
import Loading from "../components/Loading";
import ConnectAccount from "../components/ConnectAccount";

import { parseAddress, getContractViews } from "../../Util";



export default function AttachRole() {
    const navigate = useNavigate();

    const { showErrorToast } = useContext(SnackbarContext);
    const { account } = useContext(AppContext);

    const [ctcInfoInput, setCtcInfoInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    


    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (!ctcInfoInput) throw new Error('Please enter the contract information');
            parseAddress(ctcInfoInput);

            const result = await getContractViews({
                account: account,
                ctcInfo: ctcInfoInput,
                contractAddress: false,
                listOfIngredients: false,
                rejectReason: false,
                deployedNetworkTime: false,
                reviewedNetworkTime: false,
                deliveredNetworkTime: false
            });
            
            // If is buyer, and contract is APPROVED, proceed to buyer track
            if (result.buyerAddress === account.getAddress() && result.state === 1) 
                return navigate(`/buyer/track/${encodeURI(ctcInfoInput)}`);
            // If is supplier, and contract is PENDING_REVIEW, proceed to supplier order page (Accept/Reject)
            else if (result.supplierAddress === account.getAddress() && result.state === 0)
                return navigate(`/seller/order/${encodeURI(ctcInfoInput)}`);
            // Otherwise, redirect to views page
            else return navigate(`/view/${encodeURI(ctcInfoInput)}`);
        }
        catch (e) {
            showErrorToast(e.message);
            console.error(e);
        } finally {
            setIsLoading(false);
        }
        
    }



    if (!account) return <ConnectAccount />;

    return <>
        <Title />

        <Typography variant="subtitle1" gutterBottom className='lead text-muted mb-4'>
            Please provide the contract information to attach you role as BUYER or SUPPLIER:
        </Typography>

        <form onSubmit={onSubmit} className='d-flex flex-column'>
            <TextField
                label="Contract Information"
                multiline
                rows={4}
                variant="filled"
                sx={{ minWidth: '300px', maxWidth: '500px', width: '100%' }}
                value={ctcInfoInput}
                onChange={(e) => setCtcInfoInput(e.target.value)}
            />

            {
                isLoading ? 
                <Loading message="Retrieving contract data..." />
                :
                <Button type='submit' variant="contained" className='my-2'>
                    Attach 
                    <PostAddIcon sx={{ ml: 1 }} />
                </Button>
            }
        </form>
    </>;
}