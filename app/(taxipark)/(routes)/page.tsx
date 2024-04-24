"use client";

import React from "react";

import { useState, useEffect } from "react";

import { Overview } from "./components/overview";
import ReportsPage from "./dashboard/reports/page";
import StaffPage from "./dashboard/staff/page";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Users from "@geist-ui/icons/users";
import Grid from "@geist-ui/icons/grid";
import BarChart2 from "@geist-ui/icons/barChart2";
import { TbCurrencyTenge } from "react-icons/tb";

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
  day_amount_profit?: number;
  night_amount_profit?: number;
  amount_total?: number;
  variable_cost?: number;
  taxopark_commission?: number;
  yandex_commission?: number;
  gas_expense?: number;
  other_expense?: number;
  salary?: number;
  car_parts?: number;
  car_service?: number;
  car_maintenance?: number;
  cash_adm_expense?: number;
  cashless_adm_expense?: number;
  total_adm_expense?: number;
  gross_profit?: number;
  operating_profit?: number;
  tax?: number;
  financial_expense?: number;
  net_profit?: number;
  car_day_amount?: number;
  car_night_amount?: number;
  car_total_amount?: number;
  avg_cheque_day?: number;
  avg_cheque_night?: number;
  avg_cheque_total?: number;
  getCarDetailModel: CarDetailModel[];
}

const DashboardPage = () => {
  const [data, setData] = useState<MyInterface | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData(url: string): Promise<void> {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Сетевой ответ был неудовлетворительным");
        }
        const jsonData = await response.json();
        if (jsonData && Array.isArray(jsonData) && jsonData.length > 0) {
          setData(jsonData[0]);
        } else {
          throw new Error("Данные пусты или не в ожидаемом формате");
        }
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    }

    const url = "https://taxi-service-34d2f59aac8f.herokuapp.com/reports/all";
    fetchData(url);
  }, []);

  return (
    <>
      {loading && (
        <div className="hidden flex-col md:flex">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                <Skeleton className="w-[125px] h-8" />
              </h2>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
              <Skeleton className="w-[233px] h-10" />
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">
                        <Skeleton className="w-[110px] h-3 mb-3" />
                        <Skeleton className="w-[170px] h-7" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        <span
                          style={{}}
                          className="flex items-center gap-2"
                        ></span>
                      </div>
                      <p className="text-xs text-muted-foreground"></p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        <Skeleton className="w-[110px] h-3 mb-3" />
                        <Skeleton className="w-[170px] h-7" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold"></div>
                      <p className="text-xs text-muted-foreground"></p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        <Skeleton className="w-[110px] h-3 mb-3" />
                        <Skeleton className="w-[170px] h-7" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold"></div>
                      <p className="text-xs text-muted-foreground"></p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        <Skeleton className="w-[110px] h-3 mb-3" />
                        <Skeleton className="w-[170px] h-7" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold"></div>
                      <p className="text-xs text-muted-foreground"></p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>
                        <Skeleton className="w-[80px] h-7" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="">
                      <Skeleton className="w-full h-[800px] " />
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>
                        <Skeleton className="w-[150px] h-7" />
                      </CardTitle>
                      <Skeleton className="w-[210px] h-3" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="w-full h-[780px] " />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="reports">
                <ReportsPage />
              </TabsContent>
              <TabsContent value="staff">
                <StaffPage />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}

      {!loading && data && (
        <div className="flex-col md:flex">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Главная</h2>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">
                  <BarChart2 className="w-4 h-4 mr-2" />
                  Обзор
                </TabsTrigger>
                <TabsTrigger value="reports">
                  <Grid className="w-4 h-4 mr-2" />
                  Отчет
                </TabsTrigger>
                <TabsTrigger value="staff">
                  <Users className="w-4 h-4 mr-2" />
                  Персонал
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Чистая прибыль
                      </CardTitle>
                      <TbCurrencyTenge
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        <span
                          className={`${
                            typeof data.net_profit === "number" &&
                            data.net_profit < 0
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {typeof data.net_profit === "number"
                            ? data.net_profit
                                .toFixed(2)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            : "N/A"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground"></p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        В прогрессе
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+2350</div>
                      <p className="text-xs text-muted-foreground"></p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        В прогрессе
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+12,234</div>
                      <p className="text-xs text-muted-foreground"></p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        В прогрессе
                      </CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+573</div>
                      <p className="text-xs text-muted-foreground"></p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Обзор</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <Overview />
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader></CardHeader>
                    <CardContent></CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="reports">
                <ReportsPage />
              </TabsContent>
              <TabsContent value="staff">
                <StaffPage />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardPage;
