"use client";

import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ExpensesDataTable } from "@/components/tables/expenses/data-table";
import { fetchExpensesData } from "../../(expenses)/action/fetchExpensesData";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowUpDown,
  Eraser,
  MoreHorizontal,
  PanelBottomOpen,
  PenLine,
} from "lucide-react";
import { useDateRange } from "@/contexts/DateRangeContext";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableColumnHeader } from "@/components/tables/expenses/data-table-column-header";

export interface Manager {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Car {
  id: number;
  plate_number: string;
  model: string;
}

export interface Driver {
  id: number;
  firstName: string;
  lastName: string;
}

export interface ExpenseItemApl {
  id: number;
  name: string;
}

export interface ExpenseApl {
  id: number;
  gas: number;
  other: number;
  advance: number;
  driver: Driver;
  car: Car;
  expenseItemApl: ExpenseItemApl;
}

export interface Expenses {
  id: number;
  date: string;
  car: Car;
  manager: Manager;
  driver: Driver;
  cost_cash_fuel: number;
  cost_cash_other: number;
  cost_cashless_fuel: number;
  cost_cashless_other: number;
  expenses: string;
}

export const columns: ColumnDef<Expenses>[] = [
  {
    accessorKey: "date",
    // header: "Дата выдачи расходов",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата выдачи расходов" />
    ),
    cell: ({ row }) => {
      const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });

      const date = new Date(row.original.date);
      return dateFormatter.format(date);
    },
  },
  {
    accessorKey: "car.plate_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Номер Машины" />
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("car.plate_number")}</div>
    ),
  },
  {
    accessorKey: "manger",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Менеджер" />
    ),
    cell: ({ row }) => {
      const { firstName, lastName } = row.original.manager;
      const managerName = `${firstName} ${lastName}`;
      return <div className="text-left font-medium">{managerName}</div>;
    },
  },
  {
    accessorKey: "driver",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Водитель" />
    ),
    cell: ({ row }) => {
      const { firstName, lastName } = row.original.driver;
      const driverName = `${firstName} ${lastName}`;
      return <div className="text-left font-medium">{driverName}</div>;
    },
  },
  {
    accessorKey: "expenses",
    header: "Статья расходов",
  },
  {
    id: "expand",
    cell: ({ row }) => {
      return (
        <>
          <div>
            <Sheet>
              <SheetTrigger>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <PanelBottomOpen className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="backdrop-blur">
                <SheetHeader>
                  <SheetDescription className="p-20 ">
                    <Accordion type="multiple">
                      <AccordionItem value="item-2">
                        <AccordionTrigger>
                          <SheetTitle>Наличными</SheetTitle>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Газ</TableHead>
                                <TableHead>Прочие расходы</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  {row.original.cost_cash_fuel}
                                </TableCell>

                                <TableCell>
                                  {row.original.cost_cash_other}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-3">
                        <AccordionTrigger>
                          <SheetTitle>Kaspi</SheetTitle>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Газ</TableHead>
                                <TableHead>Прочие расходы</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  {row.original.cost_cashless_fuel}
                                </TableCell>

                                <TableCell>
                                  {row.original.cost_cashless_other}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </>
      );
    },
  },
];

export default function GetAllExpenses() {
  const [data, setDataExpenses] = useState<Expenses[]>([]);
  const [loading, setLoading] = useState(true);
  const { dateRange } = useDateRange();

  useEffect(() => {
    async function fetchDataExpenses() {
      if (dateRange && dateRange.from && dateRange.to) {
        try {
          const startDate = dateRange.from.toISOString().split("T")[0];
          const endDate = dateRange.to.toISOString().split("T")[0];
          const ExpensesData = await fetchExpensesData(startDate, endDate); // Передаем даты в функцию запроса
          setDataExpenses(ExpensesData);
        } catch (error) {
          console.error("Error fetching Expenses data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("Date range is not fully specified.");
        setLoading(false); // Обновляем состояние загрузки, если даты не указаны
      }
    }
    fetchDataExpenses();
  }, [dateRange]);

  return (
    <>
      {loading && (
        <>
          <div className="flex items-center justify-between">
            <Skeleton className="w-[384px] h-10 mt-6" />
            <Skeleton className="w-[300px] h-10 mt-6" />
            <Skeleton className="w-[178px] h-10 mt-6" />
          </div>
          <div className="mt-5">
            <Card className="h-full mt-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    {[...Array(6)].map((_, index) => (
                      <TableHead key={index}>
                        <Skeleton className="w-24 h-5" />
                      </TableHead>
                    ))}
                    <TableHead> </TableHead>
                    <TableHead> </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(10)].map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {[...Array(6)].map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <Skeleton className="w-27 h-3" />
                        </TableCell>
                      ))}
                      <TableCell>
                        <Skeleton className="w-5 h-5" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="w-5 h-5" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            <div className="flex items-center justify-end gap-2">
              <Skeleton className="w-[131px] h-8 mt-4" />
              <Skeleton className="w-[70px] h-8 mt-4" />
              <div className="flex mx-8">
                <Skeleton className="w-[150px] h-8 mt-4" />
              </div>
              <div className="flex space-x-1">
                <Skeleton className="w-8 h-8 mt-4" />
                <Skeleton className="w-8 h-8 mt-4" />
                <Skeleton className="w-8 h-8 mt-4" />
                <Skeleton className="w-8 h-8 mt-4" />
              </div>
            </div>
          </div>
        </>
      )}

      {!loading && (
        <ExpensesDataTable
          columns={columns}
          data={data.map((salaries) => ({
            ...salaries,
          }))}
        />
      )}
    </>
  );
}
