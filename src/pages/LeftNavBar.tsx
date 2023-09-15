import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import TimelineIcon from "@mui/icons-material/Timeline";
import { Outlet, useNavigate } from "react-router-dom";

const LeftNavBar = () => {
  const handleLeftNavBarClick = (id: string) => {
    alert(`pressed ${id}`);
  };

  const [title, setTitle] = useState("Dashboard");

  const navigate = useNavigate();
  const navigateToPath = (path: string) => {
    navigate(path);
  };

  const drawerWidth = 240;
  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem key={"Dashboard"} disablePadding>
            <ListItemButton
              onClick={() => {
                navigateToPath("/");
                setTitle("Dashboard")
              }}
            >
              <ListItemIcon>{<DashboardIcon />}</ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"History"} disablePadding>
            <ListItemButton
              onClick={() => {
                navigateToPath("/b");
                setTitle("History")
              }}
            >
              <ListItemIcon>{<TimelineIcon />}</ListItemIcon>
              <ListItemText primary={"History"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem key={"Account"} disablePadding>
            <ListItemButton
              onClick={() => {
                navigateToPath("/c");
                setTitle("Account")
              }}
            >
              <ListItemIcon>{<PersonIcon />}</ListItemIcon>
              <ListItemText primary={"Account"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"Settings"} disablePadding>
            <ListItemButton
              onClick={() => {
                handleLeftNavBarClick("Settings");
                setTitle("Settings");
              }}
            >
              <ListItemIcon>{<SettingsIcon />}</ListItemIcon>
              <ListItemText primary={"Settings"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Outlet />
    </>
  );
};

export default LeftNavBar;
