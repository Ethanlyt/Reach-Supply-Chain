import React, {useState, useContext, useEffect} from 'react'
import { json, useNavigate } from "react-router-dom"
import { Typography, Button, TextField } from "@mui/material"; 

import Title from '../components/Title'
import Loading from '../components/Loading'
import AppContext from '../../context/AppContext';
import SnackbarContext from '../../context/SnackbarContext';
import AccountDetails from '../components/AccountDetails';

import {deployContract, parseAddress, stdlib} from '../../Util'

export default function DeployCTC () {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [sellerAddress, setSellerAddress] = useState("")
    const [isSubmit, setIsSubmit] = useState(true)


    const {
        account
    } = useContext(AppContext);

    const {
        showErrorToast, showSuccessToast
    } = useContext(SnackbarContext);

    const handleSubmitDeploy = async () => {
        if(name === "" || sellerAddress === "") return showErrorToast("Please fill in the required information")
        
        setIsSubmit(false);

        try {
            const ctcInfo = await deployContract(account, {
                name: name,
                buyerAddress: account,
                supplierAddress: sellerAddress,
            });
            showSuccessToast(`Contract deployed successfully : ${ parseAddress(ctcInfo) }`);
            //Displaying the qr
            navigate(`/buyer/detail/${encodeURI(ctcInfo)}`)
        } catch (error) {
            showErrorToast(error.message);
            setIsSubmit(true);
        }
    }


    useEffect( () => {
        if (!account) navigate('/')
    }, [account, navigate])

    return  <>
        <Title />
        <AccountDetails />
        <span>Deploy New Contract</span>
        <br />
        <div className="d-flex flex-column">
            <TextField
                required
                label="Ingredient Name"
                rows={1}
                variant="filled"
                sx={{ minWidth: '400px', maxWidth: '700px' }}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br />
            <TextField
                required
                label="Seller Address"
                multiline
                rows={4}
                variant="filled"
                sx={{ minWidth: '400px', maxWidth: '700px' }}
                value={sellerAddress}
                onChange={(e) => setSellerAddress(e.target.value)}
            />
            <br /><br />

            { isSubmit ? <Button
                variant="outlined"
                size="large"
                onClick={handleSubmitDeploy}
            >
                Deploy Contract
            </Button> 
            :
            <div className="text-center"> 
                <Loading message="Deploying Contract ..." />
            </div>
            }

        </div>    
    </>
}