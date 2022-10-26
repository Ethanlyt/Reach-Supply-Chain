import React, { useContext } from "react";
import { Typography, Button } from "@mui/material";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import AppContext from "../context/AppContext";


export default function Error() {

    const { error: { title, detail } = {} } = useContext(AppContext);

    return <>
        <SentimentVeryDissatisfiedIcon className='my-3' sx={{ fontSize: 75 }} color='error' />

        <Typography variant='h5' className='text-center text-danger' marginBottom={2}>
            { title || "An error occurred." } 
        </Typography>

        <p className='text-center lead fs-5'> { detail } </p>

        <Button variant="contained" size='large' onClick={ ()=> window.location.href = process.env.PUBLIC_URL }>
            Refresh
        </Button>
    </>;
}