import React, {useState, useContext, useEffect} from 'react'
import { json, useNavigate } from "react-router-dom"
import { Typography, Button, TextField } from "@mui/material"; 

import Title from '../components/Title'
import Loading from '../components/Loading'
import ContractContext from '../../context/ContractContext';
import AppContext from '../../context/AppContext';
import SnackbarContext from '../../context/SnackbarContext';
import AccountDetails from '../components/AccountDetails';

import {deployContract, stdlib} from '../../Util'

export default function DeployCTC () {
    const navigate = useNavigate()
    const [ingredient, setIngredient] = useState("")
    const [buyerAddress, setBuyerAddress] = useState("")
    const [sellerAddress, setSellerAddress] = useState("")
    const [cState, setCState] = useState(0)

    const [isSubmit, setIsSubmit] = useState(true)

    const {
        contract, setContract
    } = useContext(ContractContext)
    const {
        account
    } = useContext(AppContext)
    const {
        showErrorToast, showSuccessToast
    } = useContext(SnackbarContext)

    const handleSubmitDeploy = async () => {
        if(ingredient === "" || sellerAddress === "") return showErrorToast("Please fill in the required information")
        // if (!account || contract) return showErrorToast("Error Occured")

        setIsSubmit(false)
        const ctc = deployContract(account)

        try {
            const info = await stdlib.withDisconnect(() => ctc.p.Buyer({
                details: {
                    ingredientName : ingredient,
                    buyerAddress: buyerAddress,
                    supplierAddress: sellerAddress,
                    state: cState,
                },
                launched: (info) => stdlib.disconnect(info)
            }))
            showSuccessToast(`Contract deployed successfully : ${JSON.stringify(info)}`)
            setContract(ctc)
            navigate(`/buyer/detail/${encodeURI(JSON.stringify(info))}`)
        } catch (error) {
            showErrorToast(error.message)
            setIsSubmit(true)
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