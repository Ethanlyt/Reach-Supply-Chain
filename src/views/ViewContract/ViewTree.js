import React from 'react';
import { Box, } from '@mui/material';
import { TreeView, TreeItem  } from '@mui/lab';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';



function getTreeItem(contracts, ctc, activeCtc, setCurrentCtc, setIsDrawerOpen) {
    ctc = contracts[ctc];
    if (!ctc || !ctc.name || !ctc.contractAddress) return null;
    const { contractAddress, name, listOfIngredients } = ctc;

    return <TreeItem 
        key={ contractAddress } 
        nodeId={ contractAddress } 
        label={
            <Box 
                onClick={()=> {
                    setCurrentCtc(contractAddress);
                    setIsDrawerOpen(false);
                }}
                sx={{ fontWeight: (contractAddress === activeCtc)? 'bold': 'normal', py: 1 }}
            >
                {name}
            </Box> 
        }
    >
        {
            listOfIngredients
                .filter( child => child !== contractAddress )
                .map(child => getTreeItem(contracts, child, activeCtc, setCurrentCtc, setIsDrawerOpen))
        }
    </TreeItem>
}



export default function ViewTree({
    contracts,
    currentCtc,
    setCurrentCtc,
    setIsDrawerOpen,
    rootCtc,
}) {
    return <>
        <TreeView
            aria-label="Tree view for ingredients"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            { getTreeItem(contracts, rootCtc, currentCtc, setCurrentCtc, setIsDrawerOpen) }
        </TreeView>
    </>
}