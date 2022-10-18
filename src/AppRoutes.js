import React from "react";
import {
    Routes,
    Route,
} from "react-router-dom";

import Home from "./views/Home"
import DeployCTC from "./views/DeployCTC/DeployCTC"
import ContractDetail from "./views/DeployCTC/ContractDetail"
import Order from "./views/AttachContract/Orders";
import Error from "./views/Error";
import NotFound from "./views/NotFound";
import ConnectAccount from "./views/ConnectAccount";

import ViewAttach from "./views/ViewContract/ViewAttach";
import Viewer from "./views/ViewContract/Viewer";



export default function AppRoutes() {
    
    return <Routes>
        <Route path="/" element={<ConnectAccount />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/deploy" element={<DeployCTC />} />
        <Route path="/home/detail" element={<ContractDetail />} />
        <Route path="/home/attach" element={<Order />} />
        <Route path="/home/view" element={<Home />} />

        <Route path="error" element={<Error />} />

        <Route path='view'>
            <Route path='attach' element={ <ViewAttach />} />
            <Route path=':ctcInfo' element={ <Viewer />} />
        </Route>

        <Route path='*' element={<NotFound />} />
    </Routes>
};