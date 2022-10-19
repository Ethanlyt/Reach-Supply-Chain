import React, {useState, useContext, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import { Typography, Button, TextField } from "@mui/material"; 

import Title from '../components/Title'
import Loading from '../components/Loading'
import ContractContext from '../../context/ContractContext';
import AppContext from '../../context/AppContext';
import SnackbarContext from '../../context/SnackbarContext';
import AccountDetails from '../components/AccountDetails';

import {deployContract} from '../../Util'

export default function DeployCTC () {
    const navigate = useNavigate()
    const [ingredient, setIngredient] = useState("")
    const [sellerAddress, setSellerAddress] = useState("")

    const [isSubmit, setIsSubmit] = useState(true)

    const {
        contract, setContract
    } = useContext(ContractContext)
    const {
        account
    } = useContext(AppContext)
    const {
        showErrorToast
    } = useContext(SnackbarContext)

    const handleSubmitDeploy = () => {
        if(ingredient === "" || sellerAddress === "") return showErrorToast("Please fill in the required information")
        // if (!account || contract) return showErrorToast("Error Occured")

        setIsSubmit(false)
        const ctc = deployContract(account)
        setContract(ctc)

        
        navigate('/buyer/detail',{
            state:{
                ingredient: ingredient,
                sellerAddress: sellerAddress,
            }
        })
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
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
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