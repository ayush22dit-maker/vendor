import React from 'react'
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    };


    return (
        <AppBar
            position='fixed'
            sx={{
                zIndex: 1201
            }}>
            <Toolbar>
                <Typography
                variant='h6'
                sx={{
                    flexGrow:1
                }}>
                    Admin Panel
                </Typography>
                <Button
                color='inherit'
                onClick={handleLogout}>
                    Logout
                </Button>
            </Toolbar>

        </AppBar>
    );
};

export default Navbar;
