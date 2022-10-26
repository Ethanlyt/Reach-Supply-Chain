import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, TextField } from "@mui/material";

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
    // const [res ,setRes] = useState(null)
    const { account } = useContext(AppContext)
    const [res, setRes] = useState({})

    const onSubmit = async () => {
       

        if (!ctcInfoInput) return showErrorToast('Please enter the contract information');

        try {
            parseAddress(ctcInfoInput)
            setRes(await getContractViews({
                account: account,
                ctcInfo: ctcInfoInput,
                contractAddress: false,
                listOfIngredients: false,
                rejectReason: false,
                deployedNetworkTime: false,
                reviewedNetworkTime: false,
                deliveredNetworkTime: false
            }))
        }
        catch (e) { return showErrorToast(e.message) }
        setIsLoading(false)

        if (res.buyerAddress === account.getAddress() && res.state !== 1) return navigate(`/buyer/track/${encodeURI(ctcInfoInput)}`);
        else if (res.supplierAddress === account.getAddress() && res.state === 0) return navigate(`/seller/order/${encodeURI(ctcInfoInput)}`);

        showSuccessToast(`Displaying contract: ${ctcInfoInput}`);
        navigate(`/view/${encodeURI(ctcInfoInput)}`);
    }

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