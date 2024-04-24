"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDateRange } from "@/contexts/DateRangeContext";
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
import React, { useState, useEffect } from "react";
import { fetchSalariesCountPaidOffData } from "../../(salaries)/action/fetchSalariesCountPaidOffData";
import { SalariesDataTable } from "@/components/tables/salaries/data-table";
import { DataTableColumnHeader } from "@/components/tables/applications/data-table-column-header";

export interface Manager {
  id: number;
  firstName: string;
  lastName: string;
}

export interface SalariesCountPaidOff {
  id: number;
  date: string;
  amount: number;
  pyment_type: string;
  manager: Manager;
  cashier_type: string;
}

export const columns: ColumnDef<SalariesCountPaidOff>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата записи" />
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
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Сумма" />
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("amount")}</div>
    ),
  },
  {
    accessorKey: "pyment_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Вид выплаты" />
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("pyment_type")}</div>
    ),
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
    accessorKey: "cashier_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Вид кассы" />
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("cashier_type")}</div>
    ),
  },
];

export default function GetAllSalariesCountPaidOff() {
  const [dataSalariesCountPaidOff, setDataSalariesCountPaidOff] = useState<
    SalariesCountPaidOff[]
  >([]);

  const [loading, setLoading] = useState(true);
  const { dateRange } = useDateRange();

  useEffect(() => {
    async function fetchDataSalariesCountPaidOff() {
      if (dateRange && dateRange.from && dateRange.to) {
        try {
          const startDate = dateRange.from.toISOString().split("T")[0];
          const endDate = dateRange.to.toISOString().split("T")[0];
          const salariesCountPaidOffData = await fetchSalariesCountPaidOffData(
            startDate,
            endDate
          );
          if (Array.isArray(salariesCountPaidOffData)) {
            console.log("Fetched data:", salariesCountPaidOffData);

            setDataSalariesCountPaidOff(salariesCountPaidOffData);
          } else {
            console.error(
              "Received data is not an array:",
              salariesCountPaidOffData
            );
          }
        } catch (error) {
          console.error("Error fetching salariesCountPaidOff data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("Date range is not fully specified.");
        setLoading(false);
      }
    }
    fetchDataSalariesCountPaidOff();
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
          data={dataSalariesCountPaidOff.map((salariesCountPaidOff) => ({
            ...salariesCountPaidOff,
          }))}
        />
      )}
    </>
  );
}
