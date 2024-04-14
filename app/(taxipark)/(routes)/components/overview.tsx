"use client";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface NetProfitByMonth {
  
}

const data = [
  {
    name: "Январь",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Февраль",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Март",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Апрель",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Май",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Июнь",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Июль",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Август",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Сентябрь",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Октябрь",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Ноябрь",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Декабрь",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart width={150} height={40} data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-ring"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
