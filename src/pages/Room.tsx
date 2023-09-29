// React
import React from "react";

// Material-UI Core
import { Box, Card, CardContent, Modal, Typography, useTheme } from "@mui/material";

// Material-UI Icons
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// React Circular Progressbar
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Custom Theme Options
import { themeOptions } from "../App";


interface IRoomProps {
  imageUrl: string;
  name: string;
  temp: number;
  targetTemp: number;
  isOccupied: boolean;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4
};

const Room: React.FunctionComponent<IRoomProps> = (props: IRoomProps) => {
  const theme = themeOptions;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
          onClick={handleOpen}
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

          <Box
            sx={{
              display: "flex"
            }}
          >
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
                  Standby
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
              </Box>
            </CardContent>
          </Box>
        </Box>
      </Card>

      {/* Edit Vent */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-edit" variant="h6" component="h2">
            Edit Vent
          </Typography>
          <Typography id="modal-edit-vent" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Room;
export type { IRoomProps };
