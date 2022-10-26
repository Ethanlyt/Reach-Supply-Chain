import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, TextField } from "@mui/material";
import ConnectAccount from "../components/ConnectAccount";
import SnackbarContext from "../../context/SnackbarContext";
import Title from "../components/Title";
import AppContext from "../../context/AppContext";
import Loading from "../components/Loading";

import { parseAddress, getContractViews } from "../../Util";

export default function AttachRole () {
    const navigate = useNavigate();

    const [ctcInfoInput, setCtcInfoInput] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const { showErrorToast, showSuccessToast } = useContext(SnackbarContext);
    const { account } = useContext(AppContext)
    const [res, setRes] = useState({})

    const onSubmit = async () => {
        setIsLoading(true)

        if (!ctcInfoInput) return showErrorToast('Please enter the contract information');

        try {
            parseAddress(ctcInfoInput)
            const result = await getContractViews({
                account: account,
                ctcInfo: ctcInfoInput,
                contractAddress: false,
                listOfIngredients: false,
                rejectReason: false,
                deployedNetworkTime: false,
                reviewedNetworkTime: false,
                deliveredNetworkTime: false
            })
            if (result.buyerAddress === account.getAddress() && result.state === 1) return navigate(`/buyer/track/${encodeURI(ctcInfoInput)}`);
            else if (result.supplierAddress === account.getAddress() && result.state === 0) return navigate(`/seller/order/${encodeURI(ctcInfoInput)}`); 
        }
        catch (e) { return showErrorToast(e.message) }
        setIsLoading(false)
    
        showSuccessToast(`Displaying contract: ${ctcInfoInput}`);
        navigate(`/view/${encodeURI(ctcInfoInput)}`);
    }

    if (!account) return <ConnectAccount />

    return <>
        <Title />

        <Typography variant="subtitle1" gutterBottom className='lead text-muted mb-4'>
            Please provide the contract information (contract address) to attach you role as BUYER or SUPPLIER:
        </Typography>

        <TextField
            label="Contract Information"
            multiline
            rows={4}
            variant="filled"
            sx={{ minWidth: '300px', maxWidth: '500px', width: '100%' }}
            value={ctcInfoInput}
            onChange={(e) => setCtcInfoInput(e.target.value)}
        />

        {isLoading ? <Loading message="Retrieving contract data" /> :

            <Button onClick={onSubmit} variant="contained" className='my-2'>
                View
            </Button>
        }
    </>;
}