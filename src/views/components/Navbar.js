// ? Author: AdmiJW, Ethanlyt
// ?
// ? Navbar, which shows the logo, and sign in button/ connected wallet address


import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppContext from '../../context/AppContext';
import SnackbarContext from '../../context/SnackbarContext';
import { useNavigate } from 'react-router-dom';
import { loadStdlib } from "@reach-sh/stdlib";
import { parseAddress } from '../../Util';
import { Button } from '@mui/material';
import { stdlib } from '../../Util';
import { Box } from '@mui/system';
const reach = loadStdlib(process.env);


export default function NavBar() {
    const navigate = useNavigate()

    const {
        account, setAccount,
        setError,
    } = useContext(AppContext);
    const { showSuccessToast } = useContext(SnackbarContext);



    const connectWallet = async() => {
        try {
            const acc = await reach.getDefaultAccount();
            showSuccessToast("Account successfully connected: " + acc.getAddress());
            setAccount(acc);
        }
        catch (e) {
            setError({ title: 'Error connecting account', detail: e.message || "Unable to connect to your wallet" });
            console.error(e);
            navigate('/error');
        }
    }


    const displayAddress = () => {
        const address = parseAddress(account.getAddress());
        return address.substr(0,9) + "...";
    }

    const copyAccountAddress = () => {
        navigator.clipboard.writeText(account.getAddress());
        showSuccessToast("Wallet Address Copied to Clipboard");
    }
    

    return (
        <AppBar position="static">
            <Toolbar>

                <Button onClick={()=> navigate('/')} sx={{color: "white"}}>
                    <img 
                        src={process.env.PUBLIC_URL + '/img/Logo.png'} 
                        alt='logo' 
                        style={{ width: '40px', height: '40px', marginRight: '10px' }}
                    />

                    <Typography variant="h6" className='display' component="div">
                        SourceSmart
                    </Typography>
                </Button>

                <Box sx={{ flexGrow:1 }} />

                {
                    account ? 
                    <Button onClick={copyAccountAddress} >
                        {
                            stdlib.standardUnit === "ALGO" ? 
                            <img 
                                src="https://img.icons8.com/external-black-fill-lafs/32/000000/external-Algorand-cryptocurrency-black-fill-lafs.png"
                                alt='ALgorand logo'
                            /> 
                            :
                            <img src="https://img.icons8.com/stickers/32/000000/metamask-logo.png" alt='Metamask logo' />
                        }

                        <Typography variant='subtitle2' sx={{ flexGrow: 0, ml: 1, color: '#fff' }}>
                            { displayAddress() } 
                        </Typography>
                    </Button>
                    :
                    <Button
                        onClick={connectWallet}
                        sx={{color: 'white', borderColor: 'white'}}
                        className="rounded-pill"
                        variant='outlined'
                    >
                        Sign In
                    </Button>
                }
               
            </Toolbar>
        </AppBar>
    );
}