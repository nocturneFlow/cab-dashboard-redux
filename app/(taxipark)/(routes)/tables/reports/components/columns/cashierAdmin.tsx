"use client";

import { ColumnDef } from "@tanstack/react-table";
import React, { useState, useEffect } from "react";
import { CashierAdminDataTable } from "@/components/tables/cashierAdmin/data-table";
import { fetchCashierAdminData } from "../../(cashierAdmin)/action/fetchCashierAdminData";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTableColumnHeader } from "@/components/tables/cashierAdmin/data-table-column-header";
import { useDateRange } from "@/contexts/DateRangeContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

interface ExpenseItemApl {
  id: number;
  name: string;
}

export interface CashierAdmin {
  id: number;
  date: string;
  arrival: number;
  expense: number;
  expenseItemApl: ExpenseItemApl;
  comment: string;
  payment_method: string;
  classification: string;
}

export const columns: ColumnDef<CashierAdmin>[] = [
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
    accessorKey: "arrival",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Приход" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("arrival")}</div>
    ),
  },
  {
    accessorKey: "expense",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Расход" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("expense")}</div>
    ),
  },
  {
    accessorKey: "expenseItemApl.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Статья" />
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("expenseItemApl.name")}</div>
    ),
  },
  {
    accessorKey: "comment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Комментарий" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("comment")}</div>
    ),
  },
  {
    accessorKey: "payment_method",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Способ оплаты" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("payment_method")}</div>
    ),
  },
  {
    accessorKey: "classification",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Классификация" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("classification")}</div>
    ),
  },
];

export default function GetAllCashierAdmin() {
  const [dataCashierAdmin, setDataCashierAdmin] = useState<CashierAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const { dateRange } = useDateRange();

  useEffect(() => {
    async function fetchDataCashierAdmin() {
      if (dateRange && dateRange.from && dateRange.to) {
        try {
          const startDate = dateRange.from.toISOString().split("T")[0];
          const endDate = dateRange.to.toISOString().split("T")[0];
          const cashierAdminData = await fetchCashierAdminData(
            startDate,
            endDate
          );
          setDataCashierAdmin(cashierAdminData);
        } catch (error) {
          console.error("Error fetching cashierAdmin data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("Date range is not fully specified.");
        setLoading(false);
      }
    }
    fetchDataCashierAdmin();
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
        <CashierAdminDataTable
          columns={columns}
          data={dataCashierAdmin.map((cashierAdmin) => ({
            ...cashierAdmin,
          }))}
        />
      )}
    </>
  );
}
