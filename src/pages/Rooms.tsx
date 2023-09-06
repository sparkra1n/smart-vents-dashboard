import * as React from "react";
// import Graph from "./Graph";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
// import ReactCardFlip from "react-card-flip";
import { Card, Box, CardContent, Typography, CardMedia, makeStyles, Theme } from "@mui/material";
import { DefaultPalette, Slider, Stack, IStackStyles, IStackTokens } from "@fluentui/react";

// const sectionStackTokens: IStackTokens = { childrenGap: 10 };
// const wrapStackTokens: IStackTokens = { childrenGap: 30 };

// interface IVentData {
//   id: number;
//   temp: number;
//   isOccupied: boolean;
// }

// interface IDashboardProps {
//   vents: IVentData[];
// }

// const fetchVentData = async () => {
//   const data = await fetch("http://smart-vents-api.azurewebsites.net/Thermostat/VentSummaries");
//   return await data.json();
// };

const fetchVentSummaries = async (): Promise<any> => {
  const response = await fetch("http://smart-vents-api.azurewebsites.net/Thermostat/VentSummaries");
  if (!response.ok) throw new Error(`Request failed with status: ${response.status}`);
  const data = await response.json();
  return data;
};

fetchVentSummaries()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

const Rooms: React.FunctionComponent = () => {
  const [checked, setChecked] = React.useState(["wifi"]);

  // const handleToggle = (value: string) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };

  return (
    <>
      <Stack enableScopedSelectors horizontal wrap tokens={{ childrenGap: 30 }}>
        <span>
          <Card sx={{ display: "flex", width: "100%", height: "auto", position: "relative" }}>
            <IconButton
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 1
              }}
              aria-label="More"
            >
              <MoreVertIcon />
            </IconButton>
            <CardMedia
              component="img"
              sx={{ height: "auto", width: "150px" }}
              image="https://mui.com/static/images/cards/live-from-space.jpg"
              alt="Live from space album cover"
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                justifyContent: "space-between",
                width: "100%"
              }}
            >
              <CardContent sx={{ flex: "1 0 auto", marginRight: "2em" }}>
                <Typography variant="h6" color="text.secondary" component="div">
                  Living Room
                </Typography>
              </CardContent>

              <CardContent
                sx={{
                  flex: "1 0 auto",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between"
                }}
              >
                <Typography variant="h4" color="text.secondary" component="div">
                  <span>21</span>&deg;C
                </Typography>
                {/* <Typography variant="h4" color="text.secondary" component="div">
                  <span>21</span>&deg;C
                </Typography> */}
              </CardContent>
            </Box>
          </Card>
        </span>

        <span>
          <Card
            sx={{
              display: "flex",
              width: "150px",
              height: "150px",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconButton>
                <AddIcon sx={{ fontSize: 48 }} />
              </IconButton>
            </div>
          </Card>
        </span>
      </Stack>
    </>
  );
};

export default Rooms;
