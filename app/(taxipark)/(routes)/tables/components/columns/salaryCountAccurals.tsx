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
import { fetchSalariesCountAccuralsData } from "../../(salaries)/action/fetchSalariesCountAccuralsData";
import { SalariesDataTable } from "@/components/tables/salaries/data-table";
import { DataTableColumnHeader } from "@/components/tables/applications/data-table-column-header";

interface Car {
  id: number;
  plate_number: string;
  model: string;
}

interface Driver {
  id: number;
  firstName: string;
  lastName: string;
}

interface Manager {
  id: number;
  firstName: string;
  lastName: string;
}

export interface SalariesCountAccurals {
  id: number;
  driver: Driver;
  date: string;
  plate_number: Car;
  schedule: {
    id: number;
    schedule: string;
  };
  time_on_line: number;
  advance: number;
  manager: Manager;
}

export const columns: ColumnDef<SalariesCountAccurals>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата" />
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
    accessorKey: "car.plate_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Номер Машины" />
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("car.plate_number")}</div>
    ),
  },
  {
    accessorKey: "schedule.schedule",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="График" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("schedule.schedule")}</div>
    ),
  },
  {
    accessorKey: "time_on_line",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Время на линии" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("time_on_line")}</div>
    ),
  },
  {
    accessorKey: "advance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Аванс" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("advance")}</div>
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
];

export default function GetAllSalariesCountAccurals() {
  const [dataSalariesCountAccurals, setDataSalariesCountAccurals] = useState<
    SalariesCountAccurals[]
  >([]);

  const [loading, setLoading] = useState(true);
  const { dateRange } = useDateRange();

  useEffect(() => {
    async function fetchDataSalariesCountAccurals() {
      if (dateRange && dateRange.from && dateRange.to) {
        try {
          const startDate = dateRange.from.toISOString().split("T")[0];
          const endDate = dateRange.to.toISOString().split("T")[0];
          const salariesCountAccuralsData =
            await fetchSalariesCountAccuralsData(startDate, endDate);
          if (Array.isArray(salariesCountAccuralsData)) {
            console.log("Fetched data:", salariesCountAccuralsData);

            setDataSalariesCountAccurals(salariesCountAccuralsData);
          } else {
            console.error(
              "Received data is not an array:",
              salariesCountAccuralsData
            );
          }
        } catch (error) {
          console.error("Error fetching salariesCountAccurals data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("Date range is not fully specified.");
        setLoading(false);
      }
    }
    fetchDataSalariesCountAccurals();
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
          data={dataSalariesCountAccurals.map((salariesCountAccurals) => ({
            ...salariesCountAccurals,
          }))}
        />
      )}
    </>
  );
}
