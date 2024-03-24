"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import {
  Landmark,
  Minus,
  Percent,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

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

const ReportsPage = () => {
  const [data, setData] = useState<MyInterface | null>(null);

  useEffect(() => {
    async function fetchData(url: string): Promise<void> {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: MyInterface = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    const url = "https://taxi-service-68bafebbc66d.herokuapp.com/reports/all";
    fetchData(url);
  }, []);

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <Heading title="Отчеты" description="" />
            <DatePickerWithRange />
          </div>
          <Separator />
          {data && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Доход</CardTitle>
                  <Landmark
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  />
                </CardHeader>
                <Separator className="mt-3 mb-3" />
                <CardContent>
                  <div className="text-2xl font-bold">{data.amount_total}</div>
                  <p className="text-xs text-muted-foreground">Итого</p>
                  <div className="text-2xl font-bold pt-3">
                    {data.day_amount_profit}
                  </div>
                  <p className="text-xs text-muted-foreground">День</p>
                  <div className="text-2xl font-bold pt-3">
                    {data.night_amount_profit}
                  </div>
                  <p className="text-xs text-muted-foreground">Ночь</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Дополнительный Доход
                  </CardTitle>
                  <TrendingUp
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  />
                </CardHeader>
                <Separator className="mt-3 mb-3" />
                <CardContent>
                  <div className="text-2xl font-bold">{data.variable_cost}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Коммисия
                  </CardTitle>
                  <div>
                    <Percent
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    />
                  </div>
                </CardHeader>
                <Separator className="mt-3 mb-3" />
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.taxopark_commission}
                  </div>
                  <p className="text-xs text-muted-foreground">Таксопарк</p>
                  <div className="text-2xl font-bold pt-3">
                    {data.yandex_commission}
                  </div>
                  <p className="text-xs text-muted-foreground">Яндекс</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Постоянные расходы
                  </CardTitle>
                  <TrendingDown
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  />
                </CardHeader>
                <Separator className="mt-3 mb-3" />
                <CardContent>
                  <div className="text-2xl font-bold">{data.gas_expense}</div>
                  <p className="text-xs text-muted-foreground">ГСМ</p>
                  <div className="text-2xl font-bold pt-3">
                    {data.other_expense}
                  </div>
                  <p className="text-xs text-muted-foreground">Прочие</p>
                  <div className="text-2xl font-bold pt-3">{data.salary}</div>
                  <p className="text-xs text-muted-foreground">
                    Зарплата факт.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Переменные расходы
                  </CardTitle>
                  <TrendingUp
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  />
                </CardHeader>
                <Separator className="mt-3 mb-3" />
                <CardContent>
                  <div className="text-2xl font-bold">{data.car_parts}</div>
                  <p className="text-xs text-muted-foreground">Запчасти</p>
                  <div className="text-2xl font-bold pt-3">
                    {data.car_service}
                  </div>
                  <p className="text-xs text-muted-foreground">Услуги</p>
                  <div className="text-2xl font-bold pt-3">
                    {data.car_maintenance}
                  </div>
                  <p className="text-xs text-muted-foreground">Мойка</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Административные расходы
                  </CardTitle>
                  <div>
                    <Percent
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    />
                  </div>
                </CardHeader>
                <Separator className="mt-3 mb-3" />
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.cash_adm_expense}
                  </div>
                  <p className="text-xs text-muted-foreground">Наличные</p>
                  <div className="text-2xl font-bold pt-3">
                    {data.cashless_adm_expense}
                  </div>
                  <p className="text-xs text-muted-foreground">Каспи</p>
                  <div className="text-2xl font-bold pt-3">
                    {data.total_adm_expense}
                  </div>
                  <p className="text-xs text-muted-foreground">Итого</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReportsPage;
