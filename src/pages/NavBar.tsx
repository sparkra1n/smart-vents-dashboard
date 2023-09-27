import React, { ReactNode, useEffect, useState } from "react";
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
import { IconButton, InputBase, Theme, alpha, styled, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@emotion/react";
import { themeOptions } from "../App";

interface NavBarProps {
  children: ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({ children }) => {
  const theme = themeOptions;
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
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`
    }
  }));

  const [title, setTitle] = useState("Dashboard");

  const navigate = useNavigate();
  const navigateToPath = (path: string) => {
    navigate(path);
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 240;
  const drawer = (
    <>
      <Toolbar />
      <Divider sx={{ backgroundColor: theme.palette.divider }} />
      <List>
        <ListItem key={"Dashboard"} disablePadding>
          <ListItemButton
            onClick={() => {
              navigateToPath("/");
              setTitle("Dashboard");
            }}
            sx={{ color: theme.palette.text.primary }}
          >
            <ListItemIcon>
              {<DashboardIcon sx={{ color: theme.palette.text.primary }} />}
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"History"} disablePadding>
          <ListItemButton
            onClick={() => {
              navigateToPath("/history");
              setTitle("History");
            }}
            sx={{ color: theme.palette.text.primary }}
          >
            <ListItemIcon>
              {<TimelineIcon sx={{ color: theme.palette.text.primary }} />}
            </ListItemIcon>
            <ListItemText primary={"History"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ backgroundColor: theme.palette.divider }} />
      <List>
        <ListItem key={"Account"} disablePadding>
          <ListItemButton
            onClick={() => {
              navigateToPath("/c");
              setTitle("Account");
            }}
            sx={{ color: theme.palette.text.primary }}
          >
            <ListItemIcon>{<PersonIcon sx={{ color: theme.palette.text.primary }} />}</ListItemIcon>
            <ListItemText primary={"Account"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Settings"} disablePadding>
          <ListItemButton
            onClick={() => {
              handleLeftNavBarClick("Settings");
              setTitle("Settings");
            }}
            sx={{ color: theme.palette.text.primary }}
          >
            <ListItemIcon>
              {<SettingsIcon sx={{ color: theme.palette.text.primary }} />}
            </ListItemIcon>
            <ListItemText primary={"Settings"} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <Box sx={{ display: "flex"}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: theme.palette.background.paper,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar
          sx={{
            backgroundColor: "#23262A",
            display: "flex"
            // justifyContent: "space-between"
          }}
        >
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "#BDBEC0" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ color: "#BDBEC0" }}>
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
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: theme.palette.background.paper,
              borderRight: 1,
              borderColor: theme.palette.divider
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: theme.palette.background.paper,
              color: "#BDBEC0",
              borderRight: 1,
              borderColor: theme.palette.divider
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
      <Outlet />
    </Box>
  );
  //FIXME: Use exported theme and fix borders
};

export default NavBar;
