"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useDateRange } from "@/contexts/DateRangeContext";
import { fetchSalariesCashierData } from "../../(salaries)/action/fetchSalariesCashierData";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

import { SalariesDataTable } from "@/components/tables/salaries/data-table";
import { DataTableColumnHeader } from "@/components/tables/applications/data-table-column-header";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  // SelectViewport,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

export interface Driver {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Manager {
  id: number;
  firstName: string;
  lastName: string;
}

export interface FinancialResourcesType {
  id: number;
  resource_name: string;
}

export interface SalariesCashier {
  id: number;
  date: string;
  driver: Driver;
  payout_amount: number;
  comment: string;
  payout_type: string;
  manager: Manager;
  // payment_type: string;
  financialResourcesType: FinancialResourcesType;
}

export const columns: ColumnDef<SalariesCashier>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата Записи" />
    ),
    cell: ({ row }) => {
      const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const date = new Date(row.original.date);
      return dateFormatter.format(date);
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
    accessorKey: "payout_amount",
    header: "Сумма",
  },
  {
    accessorKey: "comment",
    // header: "Ссылка/комментарии",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Комментарий" />
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("comment")}</div>
    ),
  },
  {
    accessorKey: "payout_type",
    header: "Вид выплаты",
  },
  {
    accessorKey: "manager",
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
    accessorKey: "financialResourcesType.resource_name",
    // header: "Вид финансовых ресурсов",

    header: ({ column }) => {
      return (
        <Select
          onValueChange={(value) => column.toggleSorting(value === "all")}
        >
          <SelectTrigger aria-label="Выберите вид финансовых ресурсов">
            <SelectValue placeholder="Выберите вид финансовых ресурсов" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все</SelectItem>
            <SelectItem value="cash">Наличными</SelectItem>
            <SelectItem value="kaspi">Kaspi</SelectItem>
          </SelectContent>
        </Select>
      );
    },
  },
];

export default function GetAllSalariesCashier() {
  const [dataSalariesCashier, setDataSalariesCashier] = useState<
    SalariesCashier[]
  >([]);
  const [loading, setLoading] = useState(true);
  const { dateRange } = useDateRange();

  useEffect(() => {
    async function fetchDataASalariesCashier() {
      if (dateRange && dateRange.from && dateRange.to) {
        try {
          const startDate = dateRange.from.toISOString().split("T")[0];
          const endDate = dateRange.to.toISOString().split("T")[0];
          const salariesCashierData = await fetchSalariesCashierData(
            startDate,
            endDate
          );
          setDataSalariesCashier(salariesCashierData);
        } catch (error) {
          console.error("Error fetching SalariesCashier data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("Date range is not fully specified.");
        setLoading(false);
      }
    }
    fetchDataASalariesCashier();
  }, [dateRange]);

  return (
    <>
      {loading && (
        <>
          <div className="flex items-center justify-between">
            <Skeleton className="w-[250px] h-8" />
            <div className="flex space-x-2">
              <Skeleton className="w-[150.39px] h-8 mt-6" />
              <Skeleton className="w-[217.73px] h-8 mt-6" />
              <Skeleton className="w-[110.08px] h-8 mt-6" />
            </div>
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
        <SalariesDataTable
          columns={columns}
          data={dataSalariesCashier.map((salariesCashier) => ({
            ...salariesCashier,
          }))}
        />
      )}
    </>
  );
}
