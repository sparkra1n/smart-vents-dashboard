import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis
} from "recharts";

import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { Card, CardContent, Theme, Typography, useTheme } from "@mui/material";
import { themeOptions } from "../App";

interface IVentData {
  isOccupied: boolean;
  temp: number;
  timestamp: string;
}

interface IVent {
  id: string;
  targetTemp: number;
  history: IVentData[];
}

interface IGraphProps {
  ventId: string;
  color: string;
}

const formatDate = (dateString: string, includeMMDD: boolean = false): string => {
  const utcDate: Date = new Date(dateString);
  const targetTimeZone: string = "America/Los_Angeles";
  const localTime: Date = new Date(utcDate.toLocaleString("en-US", { timeZone: targetTimeZone }));

  if (includeMMDD) {
    return localTime.toLocaleString("en-US", {
      timeZone: targetTimeZone,
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  } else {
    return localTime.toLocaleString("en-US", {
      timeZone: targetTimeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  }
};

const Graph: React.FunctionComponent<IGraphProps> = (props: IGraphProps) => {
  const theme = themeOptions;
  const height = 400;
  const [ventData, setVentData] = useState<IVentData[]>([]);
  const [ventTemperatures, setVentTemperatures] = useState<number[][]>([]);

  useEffect(() => {
    fetchVentHistory(props.ventId).then((response: IVentData[]) => {
      setVentData(response);
      console.log(response);
    });
  }, []);

  MainGraph();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "auto",
        marginTop: "30px",
        backgroundColor: theme.palette.background.default
      }}
    >
      <CardContent sx={{ flex: "1 0 auto", backgroundColor: theme.palette.background.paper }}>
        <Typography variant="h6" color="text.secondary" component="div">
          {props.ventId}
        </Typography>
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={ventData}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={props.color} stopOpacity={0.4} />
                <stop offset="75%" stopColor={props.color} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area
              type="monotoneX"
              dataKey="temp"
              stroke={props.color}
              fill="url(#color)"
              dot={{ fill: "white", strokeWidth: 2, stroke: "white" }}
            />
            <XAxis
              dataKey="timestamp"
              axisLine={false}
              tickLine={false}
              color={theme.palette.text.primary}
              tick={{
                textAnchor: "start"
              }}
              tickFormatter={(value, index) => {
                return formatDate(value, false);
              }}
            />
            <YAxis
              dataKey="temp"
              axisLine={false}
              tickLine={false}
              domain={[15, 30]} // Set the desired Y-axis range
              tickCount={6}
              tickFormatter={(number) => `${number}℃`}
              color={theme.palette.text.primary}
            />
            <Tooltip
              content={<CustomTooltip />}
              labelStyle={{ color: theme.palette.text.primary }}
            />
            <CartesianGrid opacity={0.1} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const MainGraph = () => {
  const height = 400;
  const theme = themeOptions;
  const [vents, setVents] = useState<IVent[]>([]);
  const [temps, setTemps] = useState<number[][]>([]);

  useEffect(() => {
    fetchVentHistories().then((response: IVent[]) => {
      setVents(response);
    });
  }, []);

  console.log("vents", vents);

  useEffect(() => {
    // Extract unique timestamps and sort them in chronological order
    const uniqueSortedTimestamps = Array.from(
      new Set(vents.flatMap((vent) => vent.history.map((data) => data.timestamp)))
    ).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    console.log("start", uniqueSortedTimestamps);

    // Create a new array with IVentData arrays adjusted to uniqueSortedTimestamps
    const adjustedVents: IVent[] = vents.map((vent) => {
      const adjustedHistory: IVentData[] = [];
      let lastData: IVentData | undefined;

      for (const timestamp of uniqueSortedTimestamps) {
        const existingData = vent.history.find((data) => data.timestamp === timestamp);

        if (existingData) {
          adjustedHistory.push(existingData);
          lastData = existingData;
        } else {
          if (lastData) {
            // If there's a missing timestamp, use the last available data
            adjustedHistory.push({
              timestamp,
              temp: lastData.temp,
              isOccupied: lastData.isOccupied
            });
          } else {
            // If there's a missing timestamp at the beginning, use the next available data
            const nextData = vent.history.find(
              (data) => new Date(data.timestamp).getTime() > new Date(timestamp).getTime()
            );
            if (nextData) {
              adjustedHistory.push({
                timestamp,
                temp: nextData.temp,
                isOccupied: nextData.isOccupied
              });
            }
          }
        }
      }

      return {
        id: vent.id,
        targetTemp: vent.targetTemp,
        history: adjustedHistory
      };
    });
    console.log("adjusted vents", adjustedVents);

    const tempArray: number[][] = adjustedVents.map((vent) =>
      vent.history.map((data) => data.temp)
    );
    setTemps(tempArray);
  }, [vents]);

  return <></>;
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active) {
    return (
      <div className="tooltip" style={{ color: "#BDBEC0" }}>
        <h4>{formatDate(label, true)}</h4>
        <p>{`${parseFloat(payload?.[0].value?.toString() ?? "").toFixed(1)}℃`}</p>
      </div>
    );
  }
  return null;
};

const fetchVentHistory = async (queryString: string): Promise<any> => {
  const response = await fetch(
    `http://smart-vents-api.azurewebsites.net/Thermostat/ventHistory?id=${encodeURIComponent(
      queryString
    )}`
  );
  const data = await response.json();
  return data;
};

const fetchVentHistories = async (): Promise<any> => {
  const response = await fetch("http://smart-vents-api.azurewebsites.net/Thermostat/ventHistories");
  const data = await response.json();
  return data;
};

export default Graph;
export type { IVentData as VentData, IGraphProps };
export { fetchVentHistory };
