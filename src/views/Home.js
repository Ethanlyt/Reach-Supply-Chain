import { Typography, ButtonGroup, Button, Link } from "@mui/material";
import React from 'react'
import {useNavigate} from 'react-router-dom'
import Title from './components/Title'


export default function Home() {
    const navigate = useNavigate()

    const handleDeploy = () => {

        navigate("/home/deploy")
    }
    const handleAttach = () => {

        navigate("/home/attach")
    }
    const handleView = () => {

        navigate("/home/view")
    }

    return <>
        <Title />
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