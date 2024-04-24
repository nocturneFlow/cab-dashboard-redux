"use client";

import React, { useState, useEffect } from "react";
import { useDateRange } from "@/contexts/DateRangeContext"; // Импортируем хук для использования дат из контекста
import { PenaltiesDataTable } from "@/components/tables/penalties/data-table";
import { fetchPenaltiesData } from "../../(penalties)/action/fetchPenaltiesData";
import { ColumnDef } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTableColumnHeader } from "@/components/tables/penalties/data-table-column-header";

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

export interface Penalties {
  id: number;
  date: string;
  trip_date: string;
  driver: Driver;
  schedule: {
    id: number;
    schedule: string;
  };
  plate_number: Car;
  document_date: string;
  document_number: string;
  fine_amount: number;
  comment: string;
}

export const columns: ColumnDef<Penalties>[] = [
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
    accessorKey: "trip_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата поездки" />
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
    accessorKey: "schedule.schedule",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Смена" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("schedule.schedule")}</div>
    ),
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
    accessorKey: "document_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата документа" />
    ),
    cell: ({ row }) => {
      const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });

      const date = new Date(row.original.document_date);
      return dateFormatter.format(date);
    },
  },
  {
    accessorKey: "document_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Номер документа" />
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("document_number")}</div>
    ),
  },
  {
    accessorKey: "fine_amount",
    // header: "Сумма",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Сумма" />
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("fine_amount")}</div>
    ),
  },
  {
    accessorKey: "comment",
    // header: "Ссылка/комментарии",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ссылка/комментарии" />
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("comment")}</div>
    ),
  },
];

export default function GetAllPenalties() {
  const [dataPenalties, setDataPenalties] = useState<Penalties[]>([]);
  const [loading, setLoading] = useState(true);
  const { dateRange } = useDateRange();

  useEffect(() => {
    async function fetchDataPenalties() {
      if (dateRange && dateRange.from && dateRange.to) {
        try {
          const startDate = dateRange.from.toISOString().split("T")[0];
          const endDate = dateRange.to.toISOString().split("T")[0];
          const penaltiesData = await fetchPenaltiesData(startDate, endDate);
          setDataPenalties(penaltiesData);
        } catch (error) {
          console.error("Error fetching penalties data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("Date range is not fully specified.");
        setLoading(false);
      }
    }
    fetchDataPenalties();
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
        <PenaltiesDataTable
          columns={columns}
          data={dataPenalties.map((fine) => ({
            ...fine,
          }))}
        />
      )}
    </>
  );
}
