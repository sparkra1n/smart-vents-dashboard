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

const queryString = "a";

// Create a function to make the GET request
const fetchVentHistory = async (): Promise<any> => {
  const response = await fetch(
    `http://smart-vents-api.azurewebsites.net/Thermostat/VentHistory?id=${encodeURIComponent(
      queryString
    )}`
  );

  if (!response.ok) throw new Error(`Request failed with status: ${response.status}`);
  const data = await response.json();
  return data;
};

fetchVentHistory()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
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
