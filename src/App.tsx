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
    },
    text: {
      primary: "#BDBEC0"
    },
    divider: "#33363A"
  }
});

const App = () => {
  return (
    <BrowserRouter>
      <NavBar>
        <Routes>
          <Route path="/" element={<></>} />
          <Route
            index
            element={
              <>
                <RoomGrid /> 
                {/* <MainGraph /> */}
              </>
            }
          />
          <Route path="history" element={<Graph ventId="Bedroom" color="#7F71CA" />} />
        </Routes>
      </NavBar>
    </BrowserRouter>
  );
};

export default App;
export { themeOptions };
