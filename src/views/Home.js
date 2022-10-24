import { Button } from "@mui/material";
import React from 'react'
import {useNavigate} from 'react-router-dom'
import Title from './components/Title'
import AccountDetails from "./components/AccountDetails";

export default function Home() {
    
    const navigate = useNavigate();

    return <>
        <Title />
        <AccountDetails />
        
        <div className="d-flex flex-column gap-3">

            <Button
                variant="outlined"
                size="large"
                onClick= { ()=> navigate('/buyer/deploy') }
            >
                Deploy New CTC
            </Button>

            <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/contract/role') }
            >
                Attach Contract
            </Button>

            <Button
                variant="outlined"
                size="large"
                onClick={ ()=> navigate('/view/attach') }
            >
                View Contract
            </Button>
            
        </div>
    </>;
}