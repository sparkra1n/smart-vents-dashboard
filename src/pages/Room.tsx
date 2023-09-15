import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Card, Box, CardContent, Typography, CardMedia, makeStyles, Theme } from "@mui/material";

interface IRoomProps {
  imageUrl: string;
  name: string;
  temp: number;
  isOccupied: boolean;
}

const Room: React.FunctionComponent<IRoomProps> = (props: IRoomProps) => {
  return (
    <>
      <Card
        sx={{
          display: "flex",
          width: "100%",
          height: "auto",
          position: "relative"
        }}
      >
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
          image={props.imageUrl}
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
              {props.name}
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
              <span>{props.temp}</span>&deg;C
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </>
  );
};

export default Room;
export type { IRoomProps };
