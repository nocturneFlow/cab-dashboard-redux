import React, { useCallback, useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface CarDetailModel {
  plate_number: string;
  total_applications: number;
  total_hours_online: number;
  total_cash_from_yandex: number;
  total_cashless_from_yandex: number;
  total_from_yandex: number;
  total_yandex_commission: number;
  total_cash_payments: number;
  total_cashless_payments: number;
  total_salary: number;
  total_bonus_from_company: number;
  total_salary_bonus: number;
  total_gsm: number;
  total_other: number;
  total_expense: number;
  total_fixed_costs: number;
  total_variable_costs: number;
}

interface MyInterface {
  day_amount_profit: number;
  night_amount_profit: number;
  amount_total: number;
  taxopark_commission: number;
  yandex_commission: number;
  gas_expense: number;
  other_expense: number;
  salary: number;
  fixed_cost: number;
  car_parts: number;
  car_maintenance: number;
  car_service: number;
  variable_cost: number;
  cash_adm_expense: number;
  cashless_adm_expense: number;
  total_adm_expense: number;
  gross_profit: number;
  operating_profit: number;
  tax: number;
  financial_expense: number;
  net_profit: number;
  car_day_amount: number;
  car_night_amount: number;
  car_total_amount: number;
  avg_cheque_day: number;
  avg_cheque_night: number;
  avg_cheque_total: number;
  getCarDetailModel: CarDetailModel[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="currentColor"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function PieChartReportsIncome() {
  const [dataReports, setDataReports] = useState<MyInterface | null>(null);

  useEffect(() => {
    async function fetchData(url: string): Promise<void> {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: MyInterface = await response.json();
        setDataReports(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    const url = "https://taxi-service-68bafebbc66d.herokuapp.com/reports/all";
    fetchData(url);
  }, []);

  const data = [
    { name: "Итого", value: dataReports?.amount_total },
    { name: "День", value: dataReports?.day_amount_profit },
    { name: "Ночь", value: dataReports?.night_amount_profit },
  ];
  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
