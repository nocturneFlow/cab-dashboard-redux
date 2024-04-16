"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Bar,
  BarChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FinancialData {
  month: string;
  net_profit_amount: number;
}

export function Overview() {
  const [data, setData] = useState<FinancialData[]>([]);

  const monthsList = [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек",
  ];

  const monthMapping: Record<string, string> = {
    JANUARY: "Янв",
    FEBRUARY: "Фев",
    MARCH: "Мар",
    APRIL: "Апр",
    MAY: "Май",
    JUNE: "Июн",
    JULY: "Июл",
    AUGUST: "Авг",
    SEPTEMBER: "Сен",
    OCTOBER: "Окт",
    NOVEMBER: "Ноя",
    DECEMBER: "Дек",
  };

  const fullMonthNames: Record<string, string> = {
    Янв: "Январь",
    Фев: "Февраль",
    Мар: "Март",
    Апр: "Апрель",
    Май: "Май",
    Июн: "Июнь",
    Июл: "Июль",
    Авг: "Август",
    Сен: "Сентябрь",
    Окт: "Октябрь",
    Ноя: "Ноябрь",
    Дек: "Декабрь",
  };

  function combineDataWithMonths(apiData: FinancialData[]): FinancialData[] {
    const apiDataMapped = apiData.map((item) => ({
      ...item,
      month: monthMapping[item.month.toUpperCase()] || item.month,
    }));

    const combinedData = monthsList.map((month) => {
      const monthData = apiDataMapped.find((item) => item.month === month);

      return monthData
        ? monthData
        : {
            month,
            net_profit_amount: 0,
          };
    });

    return combinedData;
  }

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://taxi-service-34d2f59aac8f.herokuapp.com/reports/allByMonth"
      );
      const apiData = response.data;

      const combinedData = combineDataWithMonths(apiData);

      setData(combinedData);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active: boolean;
    payload: any[];
    label: string;
  }) => {
    if (active && payload && payload.length) {
      const fullMonthName = fullMonthNames[label] || label;

      return (
        <div className="custom-tooltip">
          <Card className="z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader className="label pb-2">
              <CardTitle className="text-lg">{`${fullMonthName}`}</CardTitle>
              <CardDescription>
                Чистая прибыль -{" "}
                {new Intl.NumberFormat("ru-KZ", {
                  style: "currency",
                  currency: "KZT",
                }).format(payload[0].value)}
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart data={data}>
        <XAxis
          dataKey="month"
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
          tickFormatter={(value) =>
            new Intl.NumberFormat("ru-KZ").format(value)
          }
        />
        <Tooltip
          content={<CustomTooltip active={false} payload={[]} label={""} />}
        />
        <Bar
          dataKey="net_profit_amount"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
          activeBar={<Rectangle stroke="#8884d8" strokeWidth={2} />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
