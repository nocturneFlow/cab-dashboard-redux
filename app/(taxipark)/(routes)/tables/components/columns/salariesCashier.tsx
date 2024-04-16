"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { fetchSalariesCashierData } from "../../(salaries)/action/fetchSalariesCashierData";
import React, { useState } from "react";
import { SalariesDataTable } from "@/components/tables/salaries/salaries-data-table-pagination";

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

export interface SalariesCashier {
  id: number;
  SalariesCashierDate: string;
  SalariesCashierDriver: Driver;
  SalariesCashierAmount: number;
  SalariesCashierComment: string;
  SalariesCashierPayOutType: string;
  SalariesCashierManager: Manager;
  SalariesCashierPaymentType: string;
}

export const SalariesCashierColumns: ColumnDef<SalariesCashier>[] = [
  {
    accessorKey: "SalariesCashierDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Дата Записи
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "SalariesCashierDriver",
    header: "Водитель ",
    cell: ({ row }) => {
      const { firstName, lastName } = row.original.SalariesCashierDriver;
      return `${firstName} ${lastName}`;
    },
  },
  {
    accessorKey: "SalariesCashierWages",
    header: "Сумма",
  },
  {
    accessorKey: "SalariesCashierBonus",
    header: "Комментарий мен",
  },
  {
    accessorKey: "SalariesCashierPayOutType",
    header: "Вид выплаты",
  },
  {
    accessorKey: "SalariesCashierManager",
    header: "Менеджер",
    cell: ({ row }) => {
      const { firstName, lastName } = row.original.SalariesCashierManager;
      return `${firstName} ${lastName}`;
    },
  },
  {
    accessorKey: "SalariesCashierPaymentType",
    header: ({ column }) => {
      return (
        <Select
          onValueChange={(value) => column.toggleSorting(value === "cash")}
        >
          <SelectTrigger aria-label="Выберите вид оплаты">
            <SelectValue placeholder="Выберите вид оплаты" />
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
  const [dataSalariesCashier, setDataSalariesCashier] = React.useState<
    SalariesCashier[]
  >([]);

  React.useEffect(() => {
    async function fetchDataASalariesCashier() {
      try {
        const salariesCashierData = await fetchSalariesCashierData(); // Получение данных из вашего API
        console.log(salariesCashierData);

        // Преобразование даты в удобочитаемый формат
        const formattedSalariesCashierData = salariesCashierData.map(
          (salariesCashier) => ({
            ...salariesCashier,
            SalariesCashierDate: new Date(
              salariesCashier.SalariesCashierDate
            ).toLocaleDateString("ru-RU"),
            salariesCashier: {
              SalariesCashierAmount: salariesCashier.SalariesCashierAmount,
              SalariesCashierComment: salariesCashier.SalariesCashierComment,
              SalariesCashierPaymentType:
                salariesCashier.SalariesCashierPaymentType,
            },
          })
        );

        setDataSalariesCashier(formattedSalariesCashierData);
      } catch (error) {
        console.error("Error fetching salariesCashier data:", error);
      }
    }
    fetchDataASalariesCashier();
  }, []);

  return (
    <SalariesDataTable
      columns={SalariesCashierColumns}
      data={dataSalariesCashier.map((salariesCashier) => ({
        ...salariesCashier,
      }))}
    />
  );
}
