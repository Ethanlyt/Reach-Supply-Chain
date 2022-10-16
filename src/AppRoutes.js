import React from "react";
import {
    Routes,
    Route,
} from "react-router-dom";


import Error from "./views/Error";
import NotFound from "./views/NotFound";
import ConnectAccount from "./views/ConnectAccount";



export default function AppRoutes() {
    
    return <Routes>
        <Route path="/" element={<ConnectAccount />} />
        <Route path="error" element={<Error />} />

        <Route path='*' element={<NotFound />} />
    </Routes>
};