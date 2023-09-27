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
import { InputBase, alpha, styled, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const NavBar = () => {
  const theme = useTheme();
  const handleLeftNavBarClick = (id: string) => {
    alert(`pressed ${id}`);
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.05)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    // color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`
      // transition: theme.transitions.create("width"),
      // width: "100%",
      // [theme.breakpoints.up("sm")]: {
      //   width: "12ch",
      //   "&:focus": {
      //     width: "20ch"
      //   }
      // }
    }
  }));

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
        sx={{
          backgroundColor: theme.palette.background.paper,
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`
        }}
      >
        <Toolbar
          sx={{
            backgroundColor: theme.palette.background.paper,
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
          <Search theme={theme}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{ marginLeft: theme.spacing(1), flex: 1 }}
            />
          </Search>
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
                setTitle("Dashboard");
              }}
            >
              <ListItemIcon>{<DashboardIcon />}</ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"History"} disablePadding>
            <ListItemButton
              onClick={() => {
                navigateToPath("/history");
                setTitle("History");
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
                setTitle("Account");
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

export default NavBar;
