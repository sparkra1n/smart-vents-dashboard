import { createTheme, useTheme, ThemeProvider, ThemeOptions } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import NavBar from "./pages/NavBar";
import Dashboard from "./pages/Dashboard";
import RoomGrid from "./pages/RoomGrid";
import Graph from "./pages/Graph";
import { useEffect, useState } from "react";
import { BrowserRouter, Link, Outlet, Route, Router, Routes, useNavigate } from "react-router-dom";

const themeOptions = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#7F71CA"
    },
    secondary: {
      main: "#d371bf"
    },
    background: {
      default: "#171A1F",
      paper: "#23262A"
    }
  }
});

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={themeOptions}>
        <Box sx={{ display: "flex" }}>
          <Routes>
            <Route path="/" element={<NavBar />}>
              <Route
                index
                element={
                  <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
                    <Toolbar />
                    <RoomGrid />
                  </Box>
                }
              />
              <Route
                path="history"
                element={
                  <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
                    <Toolbar />
                    <Graph ventId="c" color="#7F71CA" />
                  </Box>
                }
              />
              <Route
                path="c"
                element={
                  <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
                    <Toolbar />
                    <h1>c</h1>
                  </Box>
                }
              />
              <Route
                path="*"
                element={
                  <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
                    <Toolbar />
                    <h1>404</h1>
                  </Box>
                }
              />
            </Route>
          </Routes>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
