import React, {useState} from 'react'
import { useNavigate } from "react-router-dom"
import { Typography, Button, TextField } from "@mui/material";

export default function DeployCTC () {
    const navigate = useNavigate()

    const {isSubmit, setIsSubmit} = useState(true)

    const handleSubmitDeploy = () => {
        setIsSubmit(false)


    }

    return  <>
        <h1>Buyer</h1>
        <span>Deploy New Contract</span>
        <br />
        <div className="d-flex flex-column">
            <TextField
                label="Ingredient Name"
                rows={1}
                variant="filled"
                sx={{ minWidth: '400px', maxWidth: '700px' }}
            />
            <br />
            <TextField
                label="Seller Address"
                multiline
                rows={4}
                variant="filled"
                sx={{ minWidth: '400px', maxWidth: '700px' }}
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
            <h3>Deploying Contreact ... Please wait</h3>
            }

        </div>    
    </>
}