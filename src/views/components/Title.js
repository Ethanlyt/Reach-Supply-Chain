// ? Author: AdmiJW
// ?
// ? Title component, renders the title of the page on most pages


import React from 'react';
import { Typography } from '@mui/material';


export default function Title() {
    return <>
        <Typography variant="h3" className='display' sx={{ textShadow: '2px 2px #ccc' }}>
            SourceSmart
        </Typography>

        <Typography variant='subtitle2' className=' mb-2' sx={{ color: '#bbb' }}>
            Transparent supply chain for everyone
        </Typography>
    </>;
}