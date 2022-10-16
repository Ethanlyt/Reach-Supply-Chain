import React from "react";
import CircularProgress from '@mui/material/CircularProgress';



export default function Loading({
    message = "Loading. Please Wait",
}) {
    return <>
        <img src={process.env.PUBLIC_URL + '/img/CubeLoading.svg'} alt='Loading cubes' className='my-3' />
        <p className='text-center lead'> {message} </p>
    </>;
}