import React from "react";
import { Drawer, IconButton, Typography, Divider, Fab } from "@mui/material";
import { styled } from "@mui/material/styles";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));



export function FloatingActionButtonDrawerToggle({ children, onClick, label }) {
    return <>
        <Fab 
            variant="extended"
            onClick={ onClick }
            color='primary'
            className='my-2'
            sx={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
            }}
        >
            <FormatListBulletedIcon sx={{ mr: 1 }} /> 
            { label }
        </Fab>
    </>
}


export function ToggleDrawer({ children, isOpen, setIsOpen, title }) {

    return <>
        <Drawer
            variant="temporary"
            open={isOpen}
            onClose={()=> setIsOpen(false)}
            sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', minWidth: 280, maxWidth: 400 }, }}
        >
            
            <DrawerHeader>
                <Typography variant="h5" sx={{ mx: 1, my: 1, flex: 1 }} >
                    { title } 
                </Typography>

                <IconButton onClick={()=> setIsOpen(false)}>
                    <ChevronLeftIcon />
                </IconButton>
            </DrawerHeader>
            
            <Divider variant="middle" />

            {children}
        </Drawer>
    </>;
}