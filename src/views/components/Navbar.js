import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar >
                <img 
                    src={process.env.PUBLIC_URL + '/img/Logo.png'} 
                    alt='logo' 
                    style={{ width: '40px', height: '40px', marginRight: '10px' }} 
                />

                <Typography variant="h5" className='display' component="div" sx={{ flexGrow: 1 }}>
                    SourceSmart
                </Typography>
            </Toolbar>
        </AppBar>
    );
}