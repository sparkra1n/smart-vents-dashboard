import Room from "./Room";
import { Stack } from "@fluentui/react";
import { useEffect, useState } from "react";
import Popup from "./Popup";

interface VentSummary {
  id: string;
  temp: number;
  targetTemp: number;
  isOccupied: boolean;
}

const fetchVentSummaries = async (): Promise<any> => {
  const response = await fetch("http://smart-vents-api.azurewebsites.net/Thermostat/ventSummaries");
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
                name={vent.id}
                isOccupied={vent.isOccupied}
                temp={vent.temp}
                targetTemp={vent.targetTemp}
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
      {/* <Popup /> */}
    </>
  );
};

export default RoomGrid;
