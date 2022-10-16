import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import WidgetsIcon from '@mui/icons-material/Widgets';

export default function NavBar() {
    return (
        <AppBar position="static">
            <Toolbar >
                <WidgetsIcon sx={{  mr: 1 }} />

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Reach Supply Chain
                </Typography>
            </Toolbar>
        </AppBar>
    );
}