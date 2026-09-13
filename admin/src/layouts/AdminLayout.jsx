import React from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const drawerWidth = 240;

const AdminLayout = () => {
    return (
        <Box
            sx={{
                display: "flex"
            }}
        >
            <Navbar />

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: `calc(100% - ${drawerWidth}px)`
                }}
            >
                <Toolbar />

                <Outlet />
            </Box>
        </Box>
    );
};

export default AdminLayout;