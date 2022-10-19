import React, {useState, useContext} from "react"
import Title from "../components/Title"
import { Button, Typography, TextField } from "@mui/material"
import ContractContext from "../../context/ContractContext";


export default function RejectOrder() {
    const [reason, setReason] = useState("");
    const [isSubmit, setIsSubmit] = useState(false)

    const {reject} = useContext(ContractContext);

    const handleSubmit = () => {
        reject(reason)
        setIsSubmit(true)
    }

    return <>
        <Title />
    
        <h3><i>You are <strong>Seller</strong></i></h3>


        {!isSubmit ? <>
        <Typography variant="subtitle1" gutterBottom className='lead text-muted mb-4'>
            Please state your reason (optional)
        </Typography>

        <TextField
            label="Enter Text Here..."
            multiline
            rows={4}
            variant="filled"
            sx={{ minWidth: '400px', maxWidth: '700px' }}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
        />

        <Button
            onClick={handleSubmit}
            variant="contained"
            className='my-2'
        >
            Submit
        </Button>
        </>
        :
            <h1><br /><br /> Contract Ended</h1>
        }

    </>
}