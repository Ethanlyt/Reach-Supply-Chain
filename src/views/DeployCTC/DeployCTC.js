import React, {useState, useContext, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import { Button, TextField, Card, Typography, CardContent } from "@mui/material"; 

import Title from '../components/Title'
import Loading from '../components/Loading'
import AppContext from '../../context/AppContext';
import SnackbarContext from '../../context/SnackbarContext';
import AccountDetails from '../components/AccountDetails';

import {deployContract, parseAddress } from '../../Util';

import IosShareIcon from '@mui/icons-material/IosShare';


export default function DeployCTC () {
    const navigate = useNavigate();
    
    const [name, setName] = useState("");
    const [supplierAddress, setSupplierAddress] = useState("");
    const [isSubmit, setIsSubmit] = useState(true);

    const { account } = useContext(AppContext);

    const {
        showErrorToast, 
        showSuccessToast,
        showWarningToast,
    } = useContext(SnackbarContext);


    const handleSubmitDeploy = async (e) => {
        e.preventDefault();

        if (!name || !supplierAddress) return showErrorToast("Please fill in the required information");
        setIsSubmit(false);

        try {
            const ctcInfo = await deployContract(account, {
                name,
                buyerAddress: account,
                supplierAddress,
            });

            showSuccessToast(`Contract deployed successfully : ${ parseAddress(ctcInfo) }`);
            navigate(`/buyer/detail/${encodeURI(ctcInfo)}`);
        } catch (e) {
            showErrorToast(e.message);
            console.error(e);
        } finally {
            setIsSubmit(true);
        }
    }


    useEffect( () => {
        if (account) return;

        navigate('/');
        showWarningToast("Please connect to an account first!");
    }, [account, navigate, showWarningToast]);


    return  <>
        <Title />
        <AccountDetails />

        <Card>
        <CardContent>
            <Typography variant="h6" sx={{ mb: 3 }}>
                Deploy SmartSource Contract
            </Typography>

            <form className="d-flex flex-column" onSubmit={handleSubmitDeploy}>

                <TextField
                    required
                    label="Ingredient Name"
                    placeholder='e.g. "Apple"'
                    variant="filled"
                    sx={{ minWidth: '300px', maxWidth: '700px', mb: 2 }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />


                <TextField
                    required
                    label="Supplier's Address"
                    placeholder='e.g. "0x1234...45678"'
                    multiline
                    variant="filled"
                    sx={{ minWidth: '300px', maxWidth: '700px', mb: 2 }}
                    value={supplierAddress}
                    onChange={(e) => setSupplierAddress(e.target.value)}
                />

                {
                    isSubmit ? 
                    <Button
                        variant="outlined"
                        size="large"
                        type="submit"
                    >
                        Deploy Contract
                        <IosShareIcon sx={{ ml: 1 }} />
                    </Button> 
                    :
                    <div className="text-center"> 
                        <Loading message="Deploying Contract ..." />
                    </div>
                }

            </form>    
        </CardContent>
        </Card>

        
    </>
}