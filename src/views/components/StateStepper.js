import React from "react";
import { Stepper, Step, StepLabel, StepContent, Typography } from "@mui/material";

import { CONTRACT_STATES, STATE_COLORS } from "../../Util";



const pendingStep = {
    key: 0,
    color: STATE_COLORS[0], 
    label: CONTRACT_STATES[0], 
    description: "The contract has been deployed. Waiting for the supplier to review the contract." 
};

const approvedStep = {
    key: 1,
    color: STATE_COLORS[1], 
    label: CONTRACT_STATES[1], 
    description: "The contract has been approved by the supplier. Waiting for the buyer to receive the goods and close the contract." 
};

const rejectedStep = {
    key: 2,
    color: STATE_COLORS[2],
    label: CONTRACT_STATES[2],
    description: "The contract has been rejected by the supplier.",
    error: true,
};

const deliveredStep = {
    key: 3,
    color: STATE_COLORS[3],
    label: CONTRACT_STATES[3],
    description: "The buyer had confirmed the delivery of the goods. The contract is marked as complete.",
};

const normalFlow = [ pendingStep, approvedStep, deliveredStep ];
const rejectFlow = [ pendingStep, rejectedStep ];




export default function StateStepper({ state }) {

    const flow = (state !== 2)? normalFlow: rejectFlow;
    if (state >= 2) state -= 1;

    return <>
        <Stepper orientation="vertical" activeStep={state}>
            {
                flow.map(step => {
                    return <Step key={ step.key } >
                        <StepLabel error={ step.error } >
                            <Typography sx={{ fontWeight: 'bold'}} color={ step.color } >{ step.label }</Typography>
                        </StepLabel>
                        <StepContent>
                            <Typography>{ step.description }</Typography>
                        </StepContent>
                    </Step>
                })
            }
        </Stepper>
    </>;
}