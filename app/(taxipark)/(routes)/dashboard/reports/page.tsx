"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  Coins,
  HandCoins,
  Percent,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export interface CarDetailModel {
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

export interface MyInterface {
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData(url: string): Promise<void> {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: MyInterface = await response.json();
        setData(data);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    const url = "https://taxi-service-68bafebbc66d.herokuapp.com/reports/all";
    fetchData(url);
  }, []);

  return (
    <>
      {loading && (
        <>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <Skeleton className="w-[45px] h-3" />
                  </CardTitle>
                  <Skeleton className="w-[20px] h-5" />
                </CardHeader>
                <Separator className="mt-3 mb-3" />
                <CardContent className="space-y-2">
                  <div className="text-2xl font-bold">
                    <Skeleton className="w-1/4 h-9" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <Skeleton className="w-10 h-2" />
                  </p>
                  <div className="text-2xl font-bold">
                    <Skeleton className="w-1/3 h-9" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <Skeleton className="w-10 h-2" />
                  </p>
                  <div className="text-2xl font-bold">
                    <Skeleton className="w-1/2 h-9" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <Skeleton className="w-10 h-2" />
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <Skeleton className="w-[45px] h-3" />
                  </CardTitle>
                  <Skeleton className="w-[20px] h-5" />
                </CardHeader>
                <Separator className="mt-3 mb-3" />
                <CardContent className="space-y-2">
                  <div className="text-2xl font-bold">
                    <Skeleton className="w-1/4 h-9" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <Skeleton className="w-10 h-2" />
                  </p>
                  <div className="text-2xl font-bold">
                    <Skeleton className="w-1/3 h-9" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <Skeleton className="w-10 h-2" />
                  </p>
                  <div className="text-2xl font-bold">
                    <Skeleton className="w-1/2 h-9" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <Skeleton className="w-10 h-2" />
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <Skeleton className="w-[45px] h-3" />
                  </CardTitle>
                  <Skeleton className="w-[20px] h-5" />
                </CardHeader>
                <Separator className="mt-3 mb-3" />
                <CardContent className="space-y-2">
                  <div className="text-2xl font-bold">
                    <Skeleton className="w-1/4 h-9" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <Skeleton className="w-10 h-2" />
                  </p>
                  <div className="text-2xl font-bold">
                    <Skeleton className="w-1/3 h-9" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <Skeleton className="w-10 h-2" />
                  </p>
                  <div className="text-2xl font-bold">
                    <Skeleton className="w-1/2 h-9" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <Skeleton className="w-10 h-2" />
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <Skeleton className="w-[45px] h-3" />
                  </CardTitle>
                  <Skeleton className="w-[20px] h-5" />
                </CardHeader>
                <Separator className="mt-3 mb-3" />
                <CardContent className="space-y-2">
                  <div className="text-2xl font-bold">
                    <Skeleton className="w-1/4 h-9" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <Skeleton className="w-10 h-2" />
                  </p>
                  <div className="text-2xl font-bold">
                    <Skeleton className="w-1/3 h-9" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <Skeleton className="w-10 h-2" />
                  </p>
                  <div className="text-2xl font-bold">
                    <Skeleton className="w-1/2 h-9" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <Skeleton className="w-10 h-2" />
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <Skeleton className="w-[45px] h-3" />
                  </CardTitle>
                  <Skeleton className="w-[20px] h-5" />
                </CardHeader>
                <Separator className="mt-3 mb-3" />
                <CardContent className="space-y-2">
                  <div className="text-2xl font-bold">
                    <Skeleton className="w-1/4 h-9" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <Skeleton className="w-10 h-2" />
                  </p>
                  <div className="text-2xl font-bold">
                    <Skeleton className="w-1/3 h-9" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <Skeleton className="w-10 h-2" />
                  </p>
                  <div className="text-2xl font-bold">
                    <Skeleton className="w-1/2 h-9" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <Skeleton className="w-10 h-2" />
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <Skeleton className="w-[45px] h-3" />
                  </CardTitle>
                  <Skeleton className="w-[20px] h-5" />
                </CardHeader>
                <Separator className="mt-3 mb-3" />
                <CardContent className="space-y-2">
                  <div className="text-2xl font-bold">
                    <Skeleton className="w-1/4 h-9" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <Skeleton className="w-10 h-2" />
                  </p>
                  <div className="text-2xl font-bold">
                    <Skeleton className="w-1/3 h-9" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <Skeleton className="w-10 h-2" />
                  </p>
                  <div className="text-2xl font-bold">
                    <Skeleton className="w-1/2 h-9" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <Skeleton className="w-10 h-2" />
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-">
              <Card className="col-span-7">
                <CardHeader>
                  <CardTitle>
                    <Skeleton className="w-[120px] h-7" />
                  </CardTitle>
                </CardHeader>
                <Separator className="mb-4" />
                <CardContent className="space-y-2">
                  <Table>
                    <TableHeader>
                      <TableRow className="text-sm font-medium">
                        <TableHead>
                          <Skeleton className="w-[75px] h-3" />
                        </TableHead>
                        <TableHead>
                          <Skeleton className="w-[75px] h-3" />
                        </TableHead>
                        <TableHead>
                          <Skeleton className="w-[75px] h-3" />
                        </TableHead>
                        <TableHead>
                          <Skeleton className="w-[75px] h-3" />
                        </TableHead>
                        <TableHead>
                          <Skeleton className="w-[75px] h-3" />
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="text-2xl font-bold">
                        <TableCell>
                          <Skeleton className="w-[125px] h-5" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-[125px] h-5" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-[125px] h-5" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-[125px] h-5" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-[125px] h-5" />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>
                    <Skeleton className="w-[120px] h-7" />
                  </CardTitle>
                </CardHeader>
                <Separator className="mb-4" />
                <CardContent className="space-y-2">
                  <Table>
                    <TableHeader>
                      <TableRow className="text-sm font-medium">
                        <TableHead>
                          <Skeleton className="w-[75px] h-3" />
                        </TableHead>
                        <TableHead>
                          <Skeleton className="w-[75px] h-3" />
                        </TableHead>
                        <TableHead>
                          <Skeleton className="w-[75px] h-3" />
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="text-2xl font-bold">
                        <TableCell>
                          <Skeleton className="w-[125px] h-5" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-[125px] h-5" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-[125px] h-5" />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>
                    {" "}
                    <Skeleton className="w-[120px] h-7" />
                  </CardTitle>
                </CardHeader>
                <Separator className="mb-4" />
                <CardContent className="space-y-2">
                  <Table>
                    <TableHeader>
                      <TableRow className="text-sm font-medium">
                        <TableHead>
                          <Skeleton className="w-[75px] h-3" />
                        </TableHead>
                        <TableHead>
                          <Skeleton className="w-[75px] h-3" />
                        </TableHead>
                        <TableHead>
                          <Skeleton className="w-[75px] h-3" />
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="text-2xl font-bold">
                        <TableCell>
                          <Skeleton className="w-[125px] h-5" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-[125px] h-5" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="w-[125px] h-5" />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}

      {!loading && data && (
        <>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Доход</CardTitle>
                  <HandCoins className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <Separator className="mt-3 mb-3" />
                <CardContent className="space-y-2">
                  <div className="text-2xl font-bold">
                    {data.amount_total
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                  <p className="text-xs text-muted-foreground">Итого</p>
                  <div className="text-2xl font-bold">
                    {data.day_amount_profit
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                  <p className="text-xs text-muted-foreground">День</p>
                  <div className="text-2xl font-bold">
                    {data.night_amount_profit
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                  <p className="text-xs text-muted-foreground">Ночь</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Дополнительный Доход
                  </CardTitle>
                  <Coins className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <Separator className="mt-3 mb-3" />
                <CardContent className="space-y-2">
                  <div className="text-2xl font-bold">
                    {data.variable_cost
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
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
                <CardContent className="space-y-2">
                  <div className="text-2xl font-bold">
                    {data.taxopark_commission
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                  <p className="text-xs text-muted-foreground">Таксопарк</p>
                  <div className="text-2xl font-bold">
                    {data.yandex_commission
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                <CardContent className="space-y-2">
                  <div className="text-2xl font-bold">
                    {data.gas_expense
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                  <p className="text-xs text-muted-foreground">ГСМ</p>
                  <div className="text-2xl font-bold">
                    {data.other_expense
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                  <p className="text-xs text-muted-foreground">Прочие</p>
                  <div className="text-2xl font-bold">
                    {data.salary
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
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
                <CardContent className="space-y-2">
                  <div className="text-2xl font-bold">
                    {data.car_parts
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                  <p className="text-xs text-muted-foreground">Запчасти</p>
                  <div className="text-2xl font-bold">
                    {data.car_service
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                  <p className="text-xs text-muted-foreground">Услуги</p>
                  <div className="text-2xl font-bold">
                    {data.car_maintenance
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                <CardContent className="space-y-2">
                  <div className="text-2xl font-bold">
                    {data.cash_adm_expense
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                  <p className="text-xs text-muted-foreground">Наличные</p>
                  <div className="text-2xl font-bold">
                    {data.cashless_adm_expense
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                  <p className="text-xs text-muted-foreground">Каспи</p>
                  <div className="text-2xl font-bold">
                    {data.total_adm_expense
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </div>
                  <p className="text-xs text-muted-foreground">Итого</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-">
              <Card className="col-span-7">
                <CardHeader>
                  <CardTitle>Прибыль</CardTitle>
                </CardHeader>
                <Separator className="mb-4" />
                <CardContent className="space-y-2">
                  <Table>
                    <TableHeader>
                      <TableRow className="text-sm font-medium">
                        <TableHead>Валовая прибыль</TableHead>
                        <TableHead>Операционная прибыль</TableHead>
                        <TableHead>Налоги</TableHead>
                        <TableHead>Финансовые расходы</TableHead>
                        <TableHead>Чистая прибыль</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="text-2xl font-bold">
                        <TableCell>
                          <span
                            style={{
                              color:
                                data.gross_profit < 0 ? "#FF6B6B" : "#66DE93",
                            }}
                          >
                            {data.gross_profit
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            style={{
                              color:
                                data.operating_profit < 0
                                  ? "#FF6B6B"
                                  : "#66DE93",
                            }}
                          >
                            {data.operating_profit
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </span>
                        </TableCell>
                        <TableCell>
                          {data.tax
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </TableCell>
                        <TableCell>
                          {data.financial_expense
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </TableCell>
                        <TableCell>
                          <span
                            style={{
                              color:
                                data.net_profit < 0 ? "#FF6B6B" : "#66DE93",
                            }}
                          >
                            {data.net_profit
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Автомобили</CardTitle>
                </CardHeader>
                <Separator className="mb-4" />
                <CardContent className="space-y-2">
                  <Table>
                    <TableHeader>
                      <TableRow className="text-sm font-medium">
                        <TableHead>Дневное количество</TableHead>
                        <TableHead>Ночное количество</TableHead>
                        <TableHead>Общее количество</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="text-2xl font-bold">
                        <TableCell>{data.car_day_amount}</TableCell>
                        <TableCell>{data.car_night_amount}</TableCell>
                        <TableCell>{data.car_total_amount}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Средний чек</CardTitle>
                </CardHeader>
                <Separator className="mb-4" />
                <CardContent className="space-y-2">
                  <Table>
                    <TableHeader>
                      <TableRow className="text-sm font-medium">
                        <TableHead>Дневной</TableHead>
                        <TableHead>Ночной</TableHead>
                        <TableHead>Общий</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="text-2xl font-bold">
                        <TableCell>
                          {data.avg_cheque_day
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </TableCell>
                        <TableCell>
                          {data.avg_cheque_night
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </TableCell>
                        <TableCell>
                          {data.avg_cheque_total
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ReportsPage;
