import * as React from "react";
import Room, { IRoomProps } from "./Room";
import { DefaultPalette, Slider, Stack, IStackStyles, IStackTokens } from "@fluentui/react";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { themeOptions } from "../App";

interface VentSummary {
  _id: string;
  _temp: number;
  _targetTemp: number;
  _isOccupied: boolean;
}

const fetchVentSummaries = async (): Promise<any> => {
  const response = await fetch("http://smart-vents-api.azurewebsites.net/Thermostat/VentSummaries");
  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

const RoomGrid = () => {
  const roomGrid: JSX.Element[] = [];
  const [ventSummaries, setVentSummaries] = useState<VentSummary[]>([]);

  useEffect(() => {
    fetchVentSummaries().then((response: VentSummary[]) => {
      setVentSummaries(response);
    });
  }, []);

  return (
    <>
      <Stack enableScopedSelectors horizontal wrap tokens={{ childrenGap: 30 }}>
        {ventSummaries.map((vent: VentSummary, index: number) => {
          console.log(vent);
          return (
            <span key={index}>
              <Room
                name={vent._id}
                isOccupied={vent._isOccupied}
                imageUrl="https://mui.com/static/images/cards/live-from-space.jpg"
                temp={vent._temp}
                targetTemp={vent._targetTemp}
              />
            </span>
          );
        })}

        {/* <span>
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
        </span> */}
      </Stack>
    </>
  );
};

export default RoomGrid;
