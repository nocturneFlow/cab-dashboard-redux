"use client";

import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useDateRange } from "@/contexts/DateRangeContext"; // Импортируем хук для использования дат из контекста
import { ManagersCashierDataTable } from "@/components/tables/managersCashier/data-table";
import { fetchCashRegistersCashData } from "../../(kassa)/action/fetchManagersCashierData";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  // SelectViewport,
} from "@/components/ui/select";
import { DataTableColumnHeader } from "@/components/tables/managersCashier/data-table-column-header";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowUpDown,
  Eraser,
  MoreHorizontal,
  PanelBottomOpen,
} from "lucide-react";
import { EditApplicationModal } from "@/components/modals/edit-application-modal";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export interface Manager {
  id: number;
  firstName: string;
  lastName: string;
}

export interface FinancialResourcesType {
  id: number;
  resource_name: string;
}

export interface Cash {
  id: number;
  date: string;
  founders_income: number | null;
  drivers_income: number;
  costs: number | null;
  payout: number | null;
  total_surrender: number;
  incashment: number | null;
  manager: Manager;
  financialResourcesType: FinancialResourcesType;
}

export const columns: ColumnDef<Cash>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата" />
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
    accessorKey: "founders_income",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Приход от учредителей" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("founders_income")}</div>
    ),
  },
  {
    accessorKey: "drivers_income",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Приход от водителей" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("drivers_income")}</div>
    ),
  },
  {
    accessorKey: "costs",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Расходы" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("costs")}</div>
    ),
  },
  {
    accessorKey: "payout",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Зарплата" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("payout")}</div>
    ),
  },
  {
    accessorKey: "total_surrender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Итого сдача кассы" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("total_surrender")}</div>
    ),
  },
  {
    accessorKey: "incashment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Инкассация" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("incashment")}</div>
    ),
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

export default function GetAllCash() {
  const [data, setDataKassa] = useState<Cash[]>([]);
  const [loading, setLoading] = useState(true);
  const { dateRange } = useDateRange(); // Получаем диапазон дат из контекста

  useEffect(() => {
    async function fetchDataKassa() {
      if (dateRange && dateRange.from && dateRange.to) {
        try {
          const startDate = dateRange.from.toISOString().split("T")[0];
          const endDate = dateRange.to.toISOString().split("T")[0];
          const KassaData = await fetchCashRegistersCashData(
            startDate,
            endDate
          );
          setDataKassa(KassaData);
        } catch (error) {
          console.error("Error fetching Kassa data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("Date range is not fully specified.");
        setLoading(false);
      }
    }
    fetchDataKassa();
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
        <ManagersCashierDataTable
          columns={columns}
          data={data.map((cash) => ({
            ...cash,
          }))}
        />
      )}
    </>
  );
}
