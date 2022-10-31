import React, { useContext, useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";

import Loading from "../components/Loading";
import Title from '../components/Title';
import AccountDetails from "../components/AccountDetails";
import ContractDetailsTable from "../components/ContractDetailsTable";
import ConnectAccount from "../components/ConnectAccount";

import AppContext from "../../context/AppContext";
import SnackbarContext from "../../context/SnackbarContext";

import { getContractHandler, getContractViews } from "../../Util";


export default function Order() {
    const navigate = useNavigate();
    const { ctcInfo } = useParams();
    const { account } = useContext(AppContext);
    const { showSuccessToast, showErrorToast} = useContext(SnackbarContext);
    const [isLoading, setIsLoading] = useState(true);

    const [ctc, setCtc] = useState({});
    const [res , setRes] = useState({});
    
    const updateContractViews = useCallback(async () => {
        setIsLoading(true);

        try {
            setRes(await getContractViews({ account: account, ctcInfo: ctcInfo }));
        } catch (e) {
            showErrorToast(e.message);
            console.error(e);
        }

        showSuccessToast(`Contract retrieve successfully`);
        setIsLoading(false);
    }, [showErrorToast, account, ctcInfo, showSuccessToast]);


    useEffect(() => {
        if (!ctcInfo) {
            showErrorToast("No contract info provided");
            return navigate("/");
        }

        (async () => {
            try {
                const res = await getContractHandler(account, ctcInfo);
                setCtc(res);
            } catch (e) {
                showErrorToast(e.message);
                console.error(e);
            }
        })();
    }, [account, ctcInfo, navigate, showErrorToast]);

    useEffect(() => {
        if (!ctc) return;
        updateContractViews();
    }, [ctc, updateContractViews]);



    if (!account) return <ConnectAccount />;

    return <>
        <Title />
        <AccountDetails />

        <Typography variant='h4' className='mb-3'>
            You are <strong>Supplier</strong>
        </Typography>
        
        {
            !ctc ? 
            <Loading message="Displaying contract..." />
            :
            <>
                <Card sx={{ mb: 3 }}>
                <CardContent>
                    <ContractDetailsTable
                        isLoading={isLoading}

                        contractAddress={res.contractAddress}
                        name={res.name}
                        buyerAddress={res.buyerAddress}
                        supplierAddress={res.supplierAddress}
                        state={res.state}
                        listOfIngredients={res.listOfIngredients}
                        rejectReason={res.rejectReason}
                        deployedNetworkTime={res.deployedNetworkTime}
                        reviewedNetworkTime={res.reviewedNetworkTime}
                        deliveredNetworkTime={res.deliveredNetworkTime}
                    />
                </CardContent>
                </Card>

                {
                    res.state === 0 &&
                    <div className="d-flex justify-content-center gap-2">
                        <Button variant="outlined" onClick={()=> navigate(`/seller/accept/${ctcInfo}`)}>
                            Accept Order
                        </Button>
                    
                        <Button variant="outlined" onClick={()=> navigate(`/seller/reject/${ctcInfo}`)}>
                            Reject Order
                        </Button>
                    </div>
                }
            </>
        }
    </>
}