import { createTheme, useTheme, ThemeProvider, ThemeOptions } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import LeftNavBar from "./pages/LeftNavBar";
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
      main: "#CA373E"
    },
    background: {
      default: "#171A1F",
      paper: "#171A1F"
    }
  }
});

const History = () => <Graph ventId="c" />;

const App = () => {
  return (
    <BrowserRouter>
      {/* <ThemeProvider theme={themeOptions}>
        <Box sx={{ display: "flex" }}>
        <LeftNavBar />
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
        </Box>
        </Box>
      </ThemeProvider> */}

      <ThemeProvider theme={themeOptions}>
        <Box sx={{ display: "flex" }}>
          <Routes>
            <Route path="/" element={<LeftNavBar />}>
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
                path="b"
                element={
                  <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
                    <Toolbar />
                    <h1>b</h1>
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

// const NoPage = () => {
//   return <h1>404</h1>;
// };
// const Contact = () => {
//   return <h1>Contact Me</h1>;
// };
// const Blogs = () => {
//   return <h1>Blog Articles</h1>;
// };

// const Home = () => {
//   return <h1>Home</h1>;
// };

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/b">Blogs</Link>
          </li>
          <li>
            <Link to="/c">Contact</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default App;
