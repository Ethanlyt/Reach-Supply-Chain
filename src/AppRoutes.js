import React from "react";
import {
    Routes,
    Route,
} from "react-router-dom";

import Home from "./views/Home"
import DeployCTC from "./views/DeployCTC/DeployCTC"
import Error from "./views/Error";
import NotFound from "./views/NotFound";
import ConnectAccount from "./views/ConnectAccount";



export default function AppRoutes() {
    
    return <Routes>
        <Route path="/" element={<ConnectAccount />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/deploy" element={<DeployCTC />} />
        <Route path="/home/attach" element={<Home />} />
        <Route path="/home/view" element={<Home />} />

        <Route path="error" element={<Error />} />

        <Route path='*' element={<NotFound />} />
    </Routes>
};