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

interface VentData {
  isOccupied: boolean;
  temp: number;
  timestamp: string;
}

interface IGraphProps {
  ventId: string;
  color: string;
  mini?: boolean;
}

const fetchVentHistory = async (queryString: string): Promise<any> => {
  const response = await fetch(
    `http://smart-vents-api.azurewebsites.net/Thermostat/VentHistory?id=${encodeURIComponent(
      queryString
    )}`
  );
  const data = await response.json();
  return data;
};

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
  const height = 400;

  const [ventData, setVentData] = useState<VentData[]>([]);
  const theme = themeOptions;

  useEffect(() => {
    fetchVentHistory(props.ventId).then((response: VentData[]) => {
      setVentData(response);
      console.log(response);
    });
  }, []);

  if (props.mini ?? false) {
    const data = [
      { month: "Jan", value: 10 },
      { month: "Feb", value: 15 },
      { month: "Mar", value: 20 }
    ];
    return (
      <div style={{ width: "70px", height: "70px" }}>
        <LineChart width={70} height={70} data={data}>
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
    );
  }

  return (
    <>
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

              <Area type="monotoneX" dataKey="temp" stroke={props.color} fill="url(#color)" />

              <XAxis
                dataKey="timestamp"
                axisLine={false}
                tickLine={false}
                color={theme.palette.text.primary}
                tickFormatter={(str) => {
                  return formatDate(str, false);
                }}
              />

              <YAxis
                dataKey="temp"
                axisLine={false}
                tickLine={false}
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
    </>
  );
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

export default Graph;
export type { VentData, IGraphProps };
export { fetchVentHistory };
