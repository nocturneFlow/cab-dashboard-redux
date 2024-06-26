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

export interface MyInterface {
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
}

const ReportsPage = () => {
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
          setData(jsonData[0]); // Предполагаем, что нам нужен только первый элемент
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
                  <div className="text-2xl font-bold">{}</div>
                  <p className="text-xs text-muted-foreground">Итого</p>
                  <div className="text-2xl font-bold">
                    {
                      data.amount_total !== undefined &&
                      typeof data.amount_total === "number"
                        ? data.amount_total
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : "N/A" // Display 'N/A' if day_amount_profit is undefined or not a number
                    }
                  </div>
                  <p className="text-xs text-muted-foreground">День</p>
                  <div className="text-2xl font-bold">
                    {
                      data.day_amount_profit !== undefined &&
                      typeof data.day_amount_profit === "number"
                        ? data.day_amount_profit
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : "N/A" // Display 'N/A' if night_amount_profit is undefined or not a number
                    }
                  </div>
                  <p className="text-xs text-muted-foreground">Ночь</p>
                  <div className="text-2xl font-bold">
                    <div className="text-2xl font-bold">
                      {
                        data.night_amount_profit !== undefined &&
                        typeof data.night_amount_profit === "number"
                          ? data.night_amount_profit
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : "N/A" // Display 'N/A' if amount_total is undefined or not a number
                      }
                    </div>
                  </div>
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
                    {
                      data.variable_cost !== undefined &&
                      typeof data.variable_cost === "number"
                        ? data.variable_cost
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : "N/A" // Display 'N/A' if variable_cost is undefined or not a number
                    }
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
                    {
                      typeof data.taxopark_commission === "number"
                        ? data.taxopark_commission
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : "N/A" // Display 'N/A' if taxopark_commission is not a number
                    }
                  </div>
                  <p className="text-xs text-muted-foreground">Таксопарк</p>
                  <div className="text-2xl font-bold">
                    {
                      typeof data.yandex_commission === "number"
                        ? data.yandex_commission
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : "N/A" // Display 'N/A' if yandex_commission is not a number
                    }
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
                  <div>
                    <div className="text-2xl font-bold">
                      {
                        typeof data.gas_expense === "number"
                          ? data.gas_expense
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : "N/A" // Display 'N/A' if gas_expense is not a number
                      }
                    </div>
                    <p className="text-xs text-muted-foreground">ГСМ</p>
                    <div className="text-2xl font-bold">
                      {
                        typeof data.other_expense === "number"
                          ? data.other_expense
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : "N/A" // Display 'N/A' if other_expense is not a number
                      }
                    </div>
                    <p className="text-xs text-muted-foreground">Прочие</p>
                    <div className="text-2xl font-bold">
                      {
                        typeof data.salary === "number"
                          ? data.salary
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : "N/A" // Display 'N/A' if salary is not a number
                      }
                    </div>
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
                  <div>
                    <div className="text-2xl font-bold">
                      {
                        typeof data.car_parts === "number"
                          ? data.car_parts
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : "N/A" // Display 'N/A' if car_parts is not a number
                      }
                    </div>
                    <p className="text-xs text-muted-foreground">Запчасти</p>
                    <div className="text-2xl font-bold">
                      {
                        typeof data.car_service === "number"
                          ? data.car_service
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : "N/A" // Display 'N/A' if car_service is not a number
                      }
                    </div>
                    <p className="text-xs text-muted-foreground">Услуги</p>
                    <div className="text-2xl font-bold">
                      {
                        typeof data.car_maintenance === "number"
                          ? data.car_maintenance
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : "N/A" // Display 'N/A' if car_maintenance is not a number
                      }
                    </div>
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
                  <div>
                    <div className="text-2xl font-bold">
                      {
                        typeof data.cash_adm_expense === "number"
                          ? data.cash_adm_expense
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : "N/A" // Display 'N/A' if cash_adm_expense is not a number
                      }
                    </div>
                    <p className="text-xs text-muted-foreground">Наличные</p>
                    <div className="text-2xl font-bold">
                      {
                        typeof data.cashless_adm_expense === "number"
                          ? data.cashless_adm_expense
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : "N/A" // Display 'N/A' if cashless_adm_expense is not a number
                      }
                    </div>
                    <p className="text-xs text-muted-foreground">Каспи</p>
                    <div className="text-2xl font-bold">
                      {
                        typeof data.total_adm_expense === "number"
                          ? data.total_adm_expense
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          : "N/A" // Display 'N/A' if total_adm_expense is not a number
                      }
                    </div>
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
                            className={`${
                              typeof data.gross_profit === "number" &&
                              data.gross_profit < 0
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {typeof data.gross_profit === "number"
                              ? data.gross_profit
                                  .toFixed(2)
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              : "N/A"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`${
                              typeof data.operating_profit === "number" &&
                              data.operating_profit < 0
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          >
                            {typeof data.operating_profit === "number"
                              ? data.operating_profit
                                  .toFixed(2)
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              : "N/A"}
                          </span>
                        </TableCell>
                        <TableCell>
                          {
                            typeof data.tax === "number"
                              ? data.tax
                                  .toFixed(2)
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              : "N/A" // Display 'N/A' if tax is not a number
                          }
                        </TableCell>
                        <TableCell>
                          {
                            typeof data.financial_expense === "number"
                              ? data.financial_expense
                                  .toFixed(2)
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              : "N/A" // Display 'N/A' if financial_expense is not a number
                          }
                        </TableCell>
                        <TableCell>
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
                          {
                            typeof data.avg_cheque_day === "number"
                              ? data.avg_cheque_day
                                  .toFixed(2)
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              : "N/A" // Display 'N/A' if avg_cheque_day is not a number
                          }
                        </TableCell>
                        <TableCell>
                          {
                            typeof data.avg_cheque_night === "number"
                              ? data.avg_cheque_night
                                  .toFixed(2)
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              : "N/A" // Display 'N/A' if avg_cheque_night is not a number
                          }
                        </TableCell>
                        <TableCell>
                          {
                            typeof data.avg_cheque_total === "number"
                              ? data.avg_cheque_total
                                  .toFixed(2)
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              : "N/A" // Display 'N/A' if avg_cheque_total is not a number
                          }
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
