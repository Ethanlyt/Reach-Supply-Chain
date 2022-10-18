import React from 'react';
import { Typography } from '@mui/material';


export default function Title() {
    return <>
        <Typography variant="h3" className='display'>
            SourceSmart
        </Typography>

        <Typography variant='subtitle2' className=' mb-4' sx={{ color: '#bbb' }}>
            Transparent supply chain for everyone
        </Typography>
    </>;
}