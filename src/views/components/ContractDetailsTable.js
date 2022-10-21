import React from "react";
import { TableContainer, Table, TableBody, TableRow, TableCell } from "@mui/material";

import Loading from "./Loading";

import { CONTRACT_STATES } from "../../Util";


export default function ContractDetailsTable({
    isLoading,

    contractAddress,
    buyerAddress,
    supplierAddress,
    name,
    state,
    listOfIngredients,
    rejectReason,
    deployedNetworkTime,
    reviewedNetworkTime,
    deliveredNetworkTime,
}) {

    if (isLoading) return <Loading message="Retrieving contract information..." />;

    return <>
        <TableContainer>
        <Table aria-label="Table for contract information">
        <TableBody>

            {
                name? 
                <TableRow>
                    <TableCell align="right" className='fw-bold'>Name</TableCell>
                    <TableCell sx={{ flex: 1 }} align='left'>{ name }</TableCell>
                </TableRow>: null
            }

            {
                contractAddress?
                <TableRow>
                    <TableCell align="right" className='fw-bold'>Contract Address</TableCell>
                    <TableCell sx={{ flex: 1 }} align='left'>{ contractAddress }</TableCell>
                </TableRow>: null
            }

            {
                buyerAddress?
                <TableRow>
                    <TableCell align="right" className='fw-bold'>Buyer Address</TableCell>
                    <TableCell sx={{ flex: 1 }} align='left'>{ buyerAddress }</TableCell>
                </TableRow>: null
            }

            {
                supplierAddress?
                <TableRow>
                    <TableCell align="right" className='fw-bold'>Supplier Address</TableCell>
                    <TableCell sx={{ flex: 1 }} align='left'>{ supplierAddress }</TableCell>
                </TableRow>: null
            }

            {
                (state in CONTRACT_STATES)?
                <TableRow>
                    <TableCell align="right" className='fw-bold'>Status</TableCell>
                    <TableCell sx={{ flex: 1 }} align='left'>{ CONTRACT_STATES[state] }</TableCell>
                </TableRow>: null
            }
            
            {
                (listOfIngredients && listOfIngredients.length > 0)?
                <TableRow>
                    <TableCell align="right" className='fw-bold'>Ingredients</TableCell>
                    <TableCell sx={{ flex: 1 }} align='left'>
                        <ul>
                            { listOfIngredients.map((ing, i)=> {
                                if (ing === contractAddress) return null;
                                return <li key={i}>{ ing }</li>
                            }) }
                        </ul>
                    </TableCell>
                </TableRow>: null
            }

            {
                rejectReason?
                <TableRow>
                    <TableCell align="right" className='fw-bold'>Reject Reason</TableCell>
                    <TableCell sx={{ flex: 1 }} align='left'>{ rejectReason }</TableCell>
                </TableRow>: null
            }

            {
                deployedNetworkTime?
                <TableRow>
                    <TableCell align="right" className='fw-bold'>Deployed Time</TableCell>
                    <TableCell sx={{ flex: 1 }} align='left'>{ deployedNetworkTime }</TableCell>
                </TableRow>: null
            }

            {
                reviewedNetworkTime?
                <TableRow>
                    <TableCell align="right" className='fw-bold'>Reviewed Time</TableCell>
                    <TableCell sx={{ flex: 1 }} align='left'>{ reviewedNetworkTime }</TableCell>
                </TableRow>: null
            }

            {
                deliveredNetworkTime?
                <TableRow>
                    <TableCell align="right" className='fw-bold'>Delivered Time</TableCell>
                    <TableCell sx={{ flex: 1 }} align='left'>{ deliveredNetworkTime }</TableCell>
                </TableRow>: null
            }

        </TableBody>
        </Table>
        </TableContainer>
    </>;
}