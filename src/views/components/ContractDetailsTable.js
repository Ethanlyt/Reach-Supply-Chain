import React from "react";
import { TableContainer, Table, TableBody, TableRow, TableCell } from "@mui/material";

import Loading from "./Loading";


export default function ContractDetailsTable({
    isLoading,

    contractAddress,
    buyerAddress,
    supplierAddress,
    name,
    description,
}) {

    if (isLoading) return <Loading message="Retrieving contract information..." />;

    return <>
        <TableContainer>
        <Table aria-label="Table for contract information">
        <TableBody>
            <TableRow>
                <TableCell align="right" className='fw-bold'>Name</TableCell>
                <TableCell sx={{ flex: 1 }} align='left'>{ name }</TableCell>
            </TableRow>

            <TableRow>
                <TableCell align="right" className='fw-bold'>Contract Address</TableCell>
                <TableCell sx={{ flex: 1 }} align='left'>{ contractAddress }</TableCell>
            </TableRow>

            <TableRow>
                <TableCell align="right" className='fw-bold'>Buyer Address</TableCell>
                <TableCell sx={{ flex: 1 }} align='left'>{ buyerAddress }</TableCell>
            </TableRow>

            <TableRow>
                <TableCell align="right" className='fw-bold'>Supplier Address</TableCell>
                <TableCell sx={{ flex: 1 }} align='left'>{ supplierAddress }</TableCell>
            </TableRow>


            <TableRow>
                <TableCell align="right" className='fw-bold'>Description</TableCell>
                <TableCell sx={{ flex: 1 }} align='left'>{ description }</TableCell>
            </TableRow>
        </TableBody>
        </Table>
        </TableContainer>
    </>;
}