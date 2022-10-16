import React, { useState, useCallback, createContext } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const SnackbarContext = createContext(null);


function SnackbarContextProvider({ children }) {
    // Toast
    const [ isToastShown, setIsToastShown ] = useState(false);
    const [ toastMessage, setToastMessage ] = useState('');
    const [ toastSeverity, setToastSeverity ] = useState('info');

    // Toast methods
    const setToast = useCallback((message, severity) => {
        setToastMessage(message);
        setToastSeverity(severity);
        setIsToastShown(true);
    }, [setToastMessage, setToastSeverity, setIsToastShown]);


    const showSuccessToast = useCallback((message) => setToast(message, 'success'), [setToast]);
    const showErrorToast = useCallback((message) => setToast(message, 'error'), [setToast]);
    const showInfoToast = useCallback((message) => setToast(message, 'info'), [setToast]);  
    const showWarningToast = useCallback((message) => setToast(message, 'warning'), [setToast]);

    const handleToastClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setIsToastShown(false);
    };


    const state = {
        showSuccessToast,
        showErrorToast,
        showInfoToast,
        showWarningToast
    };


    return (
        <SnackbarContext.Provider value={state}>
            { children }

            <Snackbar
                open={isToastShown}
                autoHideDuration={6000}
                onClose={handleToastClose}
            >
                <Alert severity={toastSeverity} sx={{ width: '100%' }}>
                    {toastMessage}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    );
};


export { SnackbarContextProvider };
export default SnackbarContext;