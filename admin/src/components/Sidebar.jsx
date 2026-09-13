import React from "react";
import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";

import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box"
                }
            }}
        >
            <Toolbar />

            <List>
                <ListItemButton
                    onClick={() => navigate("/dashboard")}
                >
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>

                    <ListItemText
                        primary="Dashboard"
                    />
                </ListItemButton>

                <ListItemButton
                    onClick={() => navigate("/categories")}
                >
                    <ListItemIcon>
                        <CategoryIcon />
                    </ListItemIcon>

                    <ListItemText
                        primary="Categories"
                    />
                </ListItemButton>

                <ListItemButton
                    onClick={() => navigate("/products")}
                >
                    <ListItemIcon>
                        <InventoryIcon />
                    </ListItemIcon>

                    <ListItemText
                        primary="Products"
                    />
                </ListItemButton>
            </List>
        </Drawer>
    );
};

export default Sidebar;