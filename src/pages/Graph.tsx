import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis
} from "recharts";

import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { Card, CardContent, Typography } from "@mui/material";

interface VentData {
  timestamp: string;
  temp: number;
}

interface IGraphProps {
  ventId: string;
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
  const [ventData, setVentData] = useState<VentData[]>([]);

  useEffect(() => {
    fetchVentHistory(props.ventId).then((response: VentData[]) => {
      setVentData(response);
    });
  }, []);

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
                return formatDate(str, false);
              }}
            />

            <YAxis
              dataKey="temp"
              axisLine={false}
              tickLine={false}
              tickCount={6}
              tickFormatter={(number) => `${number}℃`}
            />

            <Tooltip content={<CustomTooltip />} />
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
        <h4>{formatDate(label, true)}</h4>
        <p>{`${parseFloat(payload?.[0].value?.toString() ?? "").toFixed(1)}℃`}</p>
      </div>
    );
  }
  return null;
};

export default Graph;
export type { VentData, IGraphProps };