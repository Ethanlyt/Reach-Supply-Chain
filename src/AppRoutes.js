import React from "react";
import {
    Routes,
    Route,
} from "react-router-dom";

import Home from "./views/Home"
import Error from "./views/Error";
import NotFound from "./views/NotFound";

import DeployCTC from "./views/DeployCTC/DeployCTC"
import ContractDetail from "./views/DeployCTC/ContractDetail"
import BuyerTrack from "./views/DeployCTC/BuyerTrack";

import AttachRole from "./views/AttachContract/AttachRole";
import Order from "./views/AttachContract/Orders";
import AcceptOrder from "./views/AttachContract/AcceptOrder";
import RejectOrder from "./views/AttachContract/RejectOrder";
import SellerTrack from "./views/AttachContract/SellerTrack"

import ViewAttach from "./views/ViewContract/ViewAttach";
import Viewer from "./views/ViewContract/Viewer";




export default function AppRoutes() {
    
    return <Routes>
        <Route path="/" element={<Home />} />
        <Route path="error" element={<Error />} />

        <Route path="/buyer">
            <Route path="deploy" element={<DeployCTC />} />
            <Route path="detail/:ctcInfo" element={<ContractDetail />} />
            <Route path="track/:ctcInfo" element={<BuyerTrack />} />
        </Route>

        <Route path="/contract/role"  element={<AttachRole />} />
        
        <Route path="/seller">
            <Route path="order/:ctcInfo" element={<Order />} />
            <Route path="accept/:ctcInfo" element={<AcceptOrder />} />
            <Route path="reject/:ctcInfo" element={<RejectOrder />} />
            <Route path="track/:ctcInfo" element={<SellerTrack />} />
        </Route>

        <Route path='/view'>
            <Route path='attach' element={ <ViewAttach />} />
            <Route path=':ctcInfo' element={ <Viewer />} />
        </Route>

        <Route path='*' element={<NotFound />} />
    </Routes>
};