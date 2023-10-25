import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
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

  useEffect(() => {
    fetchVentHistory(props.ventId).then((response: IVentData[]) => {
      setVentData(response);
      console.log(response);
    });
  }, []);

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
              dot={false}
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
              domain={[15, 30]}
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

const Lines = (graphData: { timestamp: string }[]) => {
  if (graphData.length === 0) return null; 

  const keys: string[] = Object.keys(graphData[0]);
  keys.shift();

  const strokeColors: string[] = ["#7F71CA", "#72A0CB", "BA72CB"];
  
  return (
    <>
      {keys.map((key, index) => (
        <defs key={`gradient-${index}`}>
          <linearGradient id={`color-${index}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColors[index % 3]} stopOpacity={0.4} />
            <stop offset="75%" stopColor={strokeColors[index % 3]} stopOpacity={0.05} />
          </linearGradient>
        </defs>
      ))}
      {keys.map((key, index) => (
        <Area
          key={key}
          type="monotoneX"
          dataKey={key}
          stroke={strokeColors[index % 3]}
          fill={`url(#color-${index})`}
          dot={false}
        />
      ))}
    </>
  );
};

const MainGraph = () => {
  const height = 400;
  const theme = themeOptions;
  const [vents, setVents] = useState<IVent[]>([]);
  const [mainGraphData, setMainGraphData] = useState<{ timestamp: string }[]>();

  useEffect(() => {
    (async () => {
      const response = await fetchVentHistories();
      setVents(response);
    })();
  }, []);

  useEffect(() => {
    if (vents.length === 0) return;

    const uniqueSortedTimestamps = Array.from(
      new Set(vents.flatMap((vent) => vent.history.map((data) => data.timestamp)))
    ).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    const adjustedVents: IVent[] = vents.map((vent) => {
      const adjustedHistory: IVentData[] = [];
      let lastData: IVentData | undefined = undefined;

      for (const timestamp of uniqueSortedTimestamps) {
        const existingData = vent.history.find((data) => data.timestamp === timestamp);

        if (existingData) {
          adjustedHistory.push(existingData);
          lastData = existingData;
        } else {
          if (lastData) {
            adjustedHistory.push({
              timestamp,
              temp: lastData.temp,
              isOccupied: lastData.isOccupied
            });
          } else {
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

    const graphData = uniqueSortedTimestamps.map((timestamp, index) => {
      const temperatures: { [key: string]: number } = {};

      adjustedVents.forEach((vent) => {
        temperatures[vent.id] = vent.history[index].temp;
      });

      return { timestamp, ...temperatures };
    });

    setMainGraphData(graphData);
  }, [vents]);

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
        <Typography
          variant="h6"
          color="text.secondary"
          component="div"
          sx={{ color: theme.palette.text.primary }}
        >
          History
        </Typography>
        <ResponsiveContainer width="100%" height={height}>
  <AreaChart data={mainGraphData}>
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
      axisLine={false}
      tickLine={false}
      domain={[15, 30]}
      tickCount={6}
      color={theme.palette.text.primary}
    />
    <CartesianGrid opacity={0.1} vertical={false} />
    {Lines(mainGraphData ?? [])}
  </AreaChart>
</ResponsiveContainer>
      </CardContent>
    </Card>
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
export { fetchVentHistory, MainGraph };
