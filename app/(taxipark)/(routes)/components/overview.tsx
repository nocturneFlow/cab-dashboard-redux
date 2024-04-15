"use client";
import { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  Legend,
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Определение интерфейса для финансовых данных
interface FinancialData {
  month: string; // Строковое поле, указывающее месяц
  net_profit_amount: number; // Числовое поле, указывающее чистую прибыль
}

// Основной компонент Overview
export function Overview() {
  // Состояние для хранения данных из API
  const [data, setData] = useState<FinancialData[]>([]);

  // Список всех месяцев в году на русском языке
  const monthsList = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  // Словарь для сопоставления названий месяцев
  const monthMapping: Record<string, string> = {
    JANUARY: "Январь",
    FEBRUARY: "Февраль",
    MARCH: "Март",
    APRIL: "Апрель",
    MAY: "Май",
    JUNE: "Июнь",
    JULY: "Июль",
    AUGUST: "Август",
    SEPTEMBER: "Сентябрь",
    OCTOBER: "Октябрь",
    NOVEMBER: "Ноябрь",
    DECEMBER: "Декабрь",
  };

  // Функция для объединения данных из API с полным списком месяцев
  function combineDataWithMonths(apiData: FinancialData[]): FinancialData[] {
    // Преобразование названий месяцев из API в русский формат
    const apiDataMapped = apiData.map((item) => ({
      ...item,
      month: monthMapping[item.month.toUpperCase()] || item.month,
    }));

    // Объединение данных из API с полным списком месяцев
    const combinedData = monthsList.map((month) => {
      // Поиск данных для текущего месяца в данных из API
      const monthData = apiDataMapped.find((item) => item.month === month);

      // Если данные для текущего месяца найдены, используем их, иначе устанавливаем нулевое значение чистой прибыли
      return monthData
        ? monthData
        : {
            month: month,
            net_profit_amount: 0,
          };
    });

    return combinedData;
  }

  // Функция для загрузки данных из API
  async function fetchData(): Promise<void> {
    try {
      const response = await axios.get(
        "https://taxi-service-34d2f59aac8f.herokuapp.com/reports/allByMonth"
      );
      const apiData: FinancialData[] = response.data;

      // Объединение данных из API с полным списком месяцев
      const combinedData = combineDataWithMonths(apiData);

      // Установка объединенных данных в состоянии компонента
      setData(combinedData);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  }

  // Загрузка данных из API при загрузке компонента
  useEffect(() => {
    fetchData();
  }, []);

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
      return (
        <div className="custom-tooltip">
          <Card className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md">
            <CardHeader className="pb-2 label">
              <CardTitle className="">{`${label}`}</CardTitle>
              <CardDescription>
                Чистая прибыль - {`${payload[0].value}`}
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      );
    }

    return null;
  };

  // Отображение графика
  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="month" tickLine={false} fontSize={12} />
        <YAxis tickLine={false} fontSize={12} />
        <Tooltip
          content={<CustomTooltip active={false} payload={[]} label={""} />}
        />
        <Bar
          dataKey="net_profit_amount"
          name={"Чистая прибыль"}
          fill="#8884d8"
          radius={[4, 4, 0, 0]}
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
