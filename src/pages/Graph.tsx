import React, { useState } from "react";
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

interface d {
  date: string;
  value: number;
}

const Graph = () => {
  const data: d[] = [];
  for (let num = 30; num >= 0; --num) {
    data.push({
      date: subDays(new Date(), num).toISOString().substr(0, 10),
      value: 1 + Math.random()
    });
  }

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
          <AreaChart data={data}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7F71CA" stopOpacity={0.4} />
                <stop offset="75%" stopColor="#7F71CA" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <Area type="monotoneX" dataKey="value" stroke="#7F71CA" fill="url(#color)" />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tickFormatter={(str) => {
                const date = parseISO(str);
                if (date.getDate() % 7 === 0) {
                  return format(date, "MMM, d");
                }
                return "";
              }}
            />

            <YAxis
              dataKey="value"
              axisLine={false}
              tickLine={false}
              tickCount={6}
              tickFormatter={(number) => `$${number.toFixed(2)}`}
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
        <h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
        <p>{`${label} : ${payload?.[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export default Graph;
