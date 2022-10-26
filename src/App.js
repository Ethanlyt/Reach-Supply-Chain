import React from "react";
import { HashRouter } from "react-router-dom";

import NavBar from "./views/components/Navbar";
import AppRoutes from "./AppRoutes";
import { Container } from "@mui/material";

import RoutedContextGroup from "./context/RoutedContextGroup";


function App() {
    return <>
        

        <HashRouter>
            <RoutedContextGroup>
                <NavBar />
                <Container className="d-flex flex-column align-items-center py-5">
                    <AppRoutes />
                </Container>
            </RoutedContextGroup>
        </HashRouter>
    </>;
}



export default App;