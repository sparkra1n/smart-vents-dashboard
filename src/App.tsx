import { createTheme, useTheme, ThemeProvider, ThemeOptions } from "@mui/material/styles";
import LeftNavBar from "./pages/LeftNavBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Graph from "./pages/Graph";

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
  return (
    <ThemeProvider theme={themeOptions}>
      <Box sx={{ display: "flex" }}>
        <LeftNavBar />
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
          <Toolbar />
          <Dashboard />
          <Rooms />
          <Graph />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
