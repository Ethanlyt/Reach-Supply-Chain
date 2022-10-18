import { Typography, ButtonGroup, Button, Link } from "@mui/material";
import React, {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import Title from './components/Title'
import AppContext from "../context/AppContext";
import AccountDetails from "./components/AccountDetails";

export default function Home() {
    const navigate = useNavigate()
    const {account} = useContext(AppContext)

    const handleDeploy = () => {
        navigate("/home/deploy")
    }
    const handleAttach = () => {
        navigate("/home/attach")
    }
    const handleView = () => {
        navigate("/view")
    }

    return <>
        <Title />
        <AccountDetails />
        <hr />
        <div className="d-flex flex-column">
            <Button
                variant="outlined"
                size="large"
                onClick= { handleDeploy }
            >
                Deploy New CTC
            </Button>
            <br/>
            <Button
                variant="outlined"
                size="large"
                onClick={ handleAttach}
            >
                Attach Contract
            </Button>
            <br />
            <Button
                variant="outlined"
                size="large"
                onClick={ handleView }
            >
                View Contract
            </Button>
        </div>
    </>

}