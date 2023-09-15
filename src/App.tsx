import { createTheme, useTheme, ThemeProvider, ThemeOptions } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import LeftNavBar from "./pages/LeftNavBar";
import Dashboard from "./pages/Dashboard";
import RoomGrid from "./pages/RoomGrid";
import Graph from "./pages/Graph";
import { IRoomProps } from "./pages/Room";
import { useEffect, useState } from "react";

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

const App = () => {

  // fetchVentSummaries()
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });

  return (
    <ThemeProvider theme={themeOptions}>
      <Box sx={{ display: "flex" }}>
        <LeftNavBar />
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
          <Toolbar />
          <Dashboard />
          <RoomGrid />
          <Graph />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
