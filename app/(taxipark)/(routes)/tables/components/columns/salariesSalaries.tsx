"use client";

import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { SalarySalariesDataTable } from "@/components/tables/salaries/salarySalaries-data-table-pagination";
import { fetchSalariesSalariesData } from "../../(salaries)/action/fetchSalariesSalariesData";
import { useDateRange } from "@/contexts/DateRangeContext"; // Импортируем хук для использования дат из контекста
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

// interface Driver {

// }

export interface SalariesSalaries {
  id: string;
  first_name: string;
  last_name: string;

  total_salary: string;
  salary: string;
  bonus_from_company: string;

  advance: string;
  payout: string;
  insurance: string;
  deposit: string;
  fine: string;

  total_payout: string;
}

export const columns: ColumnDef<SalariesSalaries>[] = [
  {
    accessorKey: "driver",
    header: "Водители",
    cell: ({ row }) => {
      const { first_name, last_name } = row.original;
      return `${first_name} ${last_name}`;
    },
  },
  {
    accessorKey: "total_salary",
    header: "Итого",
  },
  {
    accessorKey: "salary",
    header: "Оклад",
  },
  {
    accessorKey: "bonus_from_company",
    header: "Бонус",
  },
  {
    accessorKey: "advance",
    header: "Аванс",
  },
  {
    accessorKey: "payout",
    header: "ЗП",
  },
  {
    accessorKey: "insurance",
    header: "Страховка",
  },
  {
    accessorKey: "deposit",
    header: "Депозит ",
  },
  {
    accessorKey: "fine",
    header: "Штраф ",
  },
  {
    accessorKey: "total_payout",
    header: "К выплате",
  },
];

export default function GetAllSalariesSalaries() {
  const [dataSalariesSalaries, setDataSalariesSalaries] = React.useState<
    SalariesSalaries[]
  >([]);

  React.useEffect(() => {
    async function fetchDataSalariesSalaries() {
      try {
        const salarySalariesData = await fetchSalariesSalariesData(); // Получение данных из вашего API

        setDataSalariesSalaries(salarySalariesData);
      } catch (error) {
        console.error("Error fetching SalariesSalaries data:", error);
      }
    }
    fetchDataSalariesSalaries();
  }, []);

  return (
    <SalarySalariesDataTable
      columns={columns}
      data={dataSalariesSalaries.map((salarySalaries) => ({
        ...salarySalaries,
      }))}
    />
  );
}
