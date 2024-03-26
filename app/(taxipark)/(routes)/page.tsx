"use client";

import { Heading } from "@/components/ui/heading";
import { TbCurrencyTenge } from "react-icons/tb";
import Autoplay from "embla-carousel-autoplay";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Overview } from "./components/overview";
import React from "react";

import { useState, useEffect } from "react";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ReportsPage from "./dashboard/reports/page";
import { TrendingDown, TrendingUp } from "lucide-react";
import StaffPage from "./dashboard/staff/page";

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

const DashboardPage = () => {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));
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
      {data && (
        <div className="hidden flex-col md:flex">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Главная</h2>
              <div className="flex items-center space-x-2">
                <DatePickerWithRange />
                <Button>Применить</Button>
              </div>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Обзор</TabsTrigger>
                <TabsTrigger value="reports">Отчет</TabsTrigger>
                <TabsTrigger value="staff">Персонал</TabsTrigger>
                <TabsTrigger value="" disabled>
                  Notifications
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
                          style={{
                            color: data.net_profit < 0 ? "#FF6B6B" : "#66DE93",
                          }}
                          className="flex items-center gap-2"
                        >
                          {data.net_profit
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          {data.net_profit < 0 ? (
                            <TrendingDown size={20} strokeWidth="3" />
                          ) : (
                            <TrendingUp size={20} strokeWidth="3" />
                          )}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Subscriptions
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
                      <p className="text-xs text-muted-foreground">
                        +180.1% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Sales
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
                      <p className="text-xs text-muted-foreground">
                        +19% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Active Now
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
                      <p className="text-xs text-muted-foreground">
                        +201 since last hour
                      </p>
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
                    <CardHeader>
                      <CardTitle>Recent Sales</CardTitle>
                      <CardDescription>
                        You made 265 sales this month.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>{/* <RecentSales /> */}</CardContent>
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
