// React
import React from "react";

// Material-UI Core
import { Box, Card, CardContent, Typography } from "@mui/material";

// Material-UI Icons
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// React Circular Progressbar
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Custom Theme Options
import { themeOptions } from "../App";
import Graph from "./Graph";

interface IRoomProps {
  name: string;
  temp: number;
  targetTemp: number;
  isOccupied: boolean;
}

const Room: React.FunctionComponent<IRoomProps> = (props: IRoomProps) => {
  const theme = themeOptions;

  const RightWidget = () => {
    if (props.isOccupied) {
      return (
        <CircularProgressbarWithChildren
          value={66}
          strokeWidth={10}
          styles={buildStyles({
            pathColor: "#7F71CA",
            trailColor: "#2C2F33",
            textColor: theme.palette.text.primary
          })}
        >
          <AccessTimeIcon sx={{ color: theme.palette.text.primary }} />
        </CircularProgressbarWithChildren>
      );
    }

    return (
      <Graph ventId="a" color="#7F71CA" mini={true} />
    );
  };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          width: "100%",
          height: "auto",
          position: "relative",
          backgroundColor: theme.palette.background.paper
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            zIndex: 1
          }}
          aria-label="Edit"
          // onClick={handleOpen}
        >
          <MoreVertIcon sx={{ color: theme.palette.text.primary }} />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "space-between",
            width: "100%",
            backgroundColor: theme.palette.background.paper
          }}
        >
          <CardContent
            sx={{
              flex: "1 0 auto",
              marginRight: "2em"
            }}
          >
            <Typography
              variant="h6"
              color="text.secondary"
              component="div"
              sx={{ color: theme.palette.text.primary }}
            >
              {props.name}
            </Typography>
          </CardContent>

          <Box sx={{ display: "flex" }}>
            <CardContent sx={{ flex: "1" }}>
              <Box
                sx={{
                  flex: "1 0 auto",
                  display: "flex"
                }}
              >
                <Typography
                  variant="h6"
                  color="text.secondary"
                  component="div"
                  sx={{
                    textAlign: "left",
                    mr: "2em",
                    display: "flex",
                    alignSelf: "flex-end",
                    color: theme.palette.text.primary
                  }}
                >
                  {props.isOccupied ? "Active" : "Standby"}
                </Typography>
              </Box>

              <Box
                sx={{
                  flex: "1 0 auto",
                  display: "flex"
                }}
              >
                <Typography
                  variant="h4"
                  color="text.secondary"
                  component="div"
                  sx={{
                    textAlign: "left",
                    mr: "2em",
                    display: "flex",
                    alignSelf: "flex-end",
                    color: theme.palette.text.primary
                  }}
                >
                  <strong>{props.temp}&deg;</strong>
                </Typography>
              </Box>
            </CardContent>

            <CardContent sx={{ flex: "1", marginRight: "0" }}>
              <Box
                sx={{
                  ml: "auto",
                  height: "70px",
                  width: "70px"
                }}
              >
                <RightWidget />
              </Box>
            </CardContent>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default Room;
export type { IRoomProps };
