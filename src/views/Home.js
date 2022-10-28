import { Button, Box } from "@mui/material";
import React from 'react'
import {useNavigate} from 'react-router-dom'
import Title from './components/Title'
import AccountDetails from "./components/AccountDetails";

import IosShareIcon from '@mui/icons-material/IosShare';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SearchIcon from '@mui/icons-material/Search';



export default function Home() {
    const navigate = useNavigate();

    return <>
        <Title />
        
        <AccountDetails />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
                variant="outlined"
                size="large"
                onClick= { ()=> navigate('/buyer/deploy') }
            >
                Deploy New CTC
                <IosShareIcon sx={{ ml: 1 }} />
            </Button>

            <Button
                variant="outlined"
                size="large"
                onClick={ () => navigate('/contract/role') }
            >
                Attach Contract
                <PostAddIcon sx={{ ml: 1 }} />
            </Button>

            <Button
                variant="outlined"
                size="large"
                onClick={ ()=> navigate('/view/attach') }
            >
                View Contract
                <SearchIcon sx={{ ml: 1 }} />
            </Button>
        </Box>
    </>;
}