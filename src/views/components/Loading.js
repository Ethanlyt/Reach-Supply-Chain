import React from "react";
import { Box } from "@mui/material";



export default function Loading({
    message = "Loading. Please Wait",
}) {
    return <>
        <Box sx={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            flexDirection: 'column' 
        }}>
            <img src={process.env.PUBLIC_URL + '/img/CubeLoading.svg'} alt='Loading cubes' className='my-3' />
            <p className='text-center lead'> {message} </p>
        </Box>
    </>;
}