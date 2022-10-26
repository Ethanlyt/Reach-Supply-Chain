import * as React from 'react';
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
    } = React.useContext(AppContext);
    const { showSuccessToast } = React.useContext(SnackbarContext)

    const toHome = () => {
        navigate('/')
    } 
    const connectWallet = async() => {
        try {
            const acc = await reach.getDefaultAccount();
            showSuccessToast("Account successfully connected: " + acc.getAddress());
            setAccount(acc);
            
        }
        catch (err) {
            setError({ title: 'Error connecting account', detail: err.message || "Unable to connect to your wallet" });
            navigate('/error');
        }
    }

    const displayAddress = () => {
        const address = parseAddress(account.getAddress())
        return address.substr(0,9) + "..."
    }
    
    return (
        <AppBar position="static">
            <Toolbar>
                <Button onClick={toHome} sx={{color: "white"}}>
                    <img 
                        src={process.env.PUBLIC_URL + '/img/Logo.png'} 
                        alt='logo' 
                        style={{ width: '40px', height: '40px', marginRight: '10px' }}
                        
                    />

                    <Typography variant="h5" className='display' component="div">
                        SourceSmart
                    </Typography>
                </Button>
                <Box sx={{flexGrow:1}}/>
                {account ? 
                <Typography  component="div" sx={{ flexGrow: 0 }}>
                        {stdlib.standardUnit === "ALGO" ? 
                        <img 
                            src="https://img.icons8.com/external-black-fill-lafs/32/000000/external-Algorand-cryptocurrency-black-fill-lafs.png"
                            alt='ALgorand logo'
                        /> 
                        : 
                        <img src="https://img.icons8.com/stickers/32/000000/metamask-logo.png" alt='Metamask logo' />} {displayAddress()} 
                </Typography>
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