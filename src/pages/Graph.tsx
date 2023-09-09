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

import { format, parseISO, subDays } from "date-fns";
import { Card, CardContent, Typography } from "@mui/material";

interface VentData {
  timestamp: string;
  temp: number;
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

const Graph = () => {
  const [ventData, setVentData] = useState<VentData[]>([]);

  useEffect(() => {
    fetchVentHistory("a").then((response: VentData[]) => {
      let ventDatas: VentData[] = [];
      response.forEach((e: VentData) => {
        const utcDate: Date = new Date(e.timestamp);
        const targetTimeZone: string = "America/Los_Angeles";
        const localTime: Date = new Date(
          utcDate.toLocaleString("en-US", { timeZone: targetTimeZone })
        );

        // Format the local time as "MM/dd HH:mm" string
        ventDatas.push({
          temp: e.temp,
          timestamp: localTime.toLocaleString("en-US", {
            timeZone: targetTimeZone,
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
          })
        });
      });
      setVentData(ventDatas);
    });
  }, []);

  console.log("final", ventData);

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "auto",
          marginTop: "30px"
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography variant="h6" color="text.secondary" component="div">
            History
          </Typography>
        </CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={ventData}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7F71CA" stopOpacity={0.4} />
                <stop offset="75%" stopColor="#7F71CA" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <Area type="monotoneX" dataKey="temp" stroke="#7F71CA" fill="url(#color)" />

            <XAxis
              dataKey="timestamp"
              axisLine={false}
              tickLine={false}
              tickFormatter={(str) => {
                return str;
              }}
            />

            <YAxis
              dataKey="temp"
              axisLine={false}
              tickLine={false}
              tickCount={6}
              tickFormatter={(number) => number}
            />

            <Tooltip content={<CustomTooltip />} />
            <Tooltip />

            <CartesianGrid opacity={0.1} vertical={false} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
};

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active) {
    return (
      <div className="tooltip">
        <h4>{label}</h4>
        <p>{`${parseFloat(payload?.[0].value?.toString() ?? "").toFixed(1)}℃`}</p>
      </div>
    );
  }
  return null;
};

export default Graph;
