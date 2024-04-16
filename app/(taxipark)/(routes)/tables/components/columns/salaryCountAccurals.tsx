"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { fetchSalariesCountAccuralsData } from "../../(salaries)/action/fetchSalariesCountAccuralsData";
import { SalariesDataTable } from "@/components/tables/salaries/salaries-data-table-pagination";

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

export interface Manager {
  id: number;
  firstName: string;
  lastName: string;
}

export interface SalariesCountAccurals {
  id: number;
  SalariesCountAccuralsDriver: Driver;
  SalariesCountAccuralsTravelDate: string;
  SalariesCountAccuralsCarNumber: Car;
  SalariesCountAccuralsSchedule: {
    id: number;
    schedule: string;
  };
  SalariesCountAccuralsTime: number;
  SalariesCountAccuralsCash: number;
  SalariesCountAccuralsTotal: number;
  SalariesCountAccuralsSummarized: number;
  SalariesCountAccuralsSalary: number;
  SalariesCountAccuralsBonus: number;
  SalariesCountAccuralsBonusFromCompany: number;
  SalariesCountAccuralsUpFront: number;
  SalariesCountAccuralsManager: Manager;
}

export const SalariesCountAccuralsColumns: ColumnDef<SalariesCountAccurals>[] =
  [
    {
      accessorKey: "SalariesCountAccuralsTravelDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Дата поездки
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "car.SalariesCountAccuralsCarNumber",
      header: "Номер машины",
    },
    {
      accessorKey: "SalariesCountAccuralsSchedule",
      header: "График",
    },
    {
      accessorKey: "SalariesCountAccuralsTime",
      header: "Время на линии",
    },
    {
      accessorKey: "SalariesCountAccuralsCash",
      header: "Наличн.",
    },
    {
      accessorKey: "SalariesCountAccuralsTotal",
      header: "Всего",
    },
    {
      accessorKey: "SalariesCountAccuralsSummarized",
      header: "Итого оклад+бонус",
    },
    {
      accessorKey: "SalariesCountAccuralsSalary",
      header: "Оклад",
    },
    {
      accessorKey: "SalariesCountAccuralsBonus",
      header: "Бонус",
    },
    {
      accessorKey: "SalariesCountAccuralsBonusFromCompany",
      header: "Бонус от компании",
    },
    {
      accessorKey: "SalariesCountAccuralsUpFront",
      header: "Аванс",
    },
    {
      accessorKey: "SalariesCountAccuralsManager",
      header: "Менеджер",
      cell: ({ row }) => {
        const { firstName, lastName } =
          row.original.SalariesCountAccuralsManager;
        return `${firstName} ${lastName}`;
      },
    },
  ];

export default function GetAllSalariesCountAccurals() {
  const [dataSalariesCountAccurals, setDataSalariesCountAccurals] =
    React.useState<SalariesCountAccurals[]>([]);

  React.useEffect(() => {
    async function fetchDataSalariesCountAccurals() {
      try {
        const salariesCountAccuralsData =
          await fetchSalariesCountAccuralsData(); // Получение данных из вашего API
        console.log(salariesCountAccuralsData);

        // Преобразование даты в удобочитаемый формат
        const formattedSalariesCountAccuralsData =
          salariesCountAccuralsData.map((salariesCountAccurals) => ({
            ...salariesCountAccurals,
            date: new Date(
              salariesCountAccurals.SalariesCountAccuralsTravelDate
            ).toLocaleDateString("ru-RU"),
            car: {
              id: salariesCountAccurals.SalariesCountAccuralsCarNumber.id,
              plate_number:
                salariesCountAccurals.SalariesCountAccuralsCarNumber
                  .plate_number,
              model: salariesCountAccurals.SalariesCountAccuralsCarNumber.model,
            },
          }));

        setDataSalariesCountAccurals(formattedSalariesCountAccuralsData);
      } catch (error) {
        console.error("Error fetching SalariesCountAccurals data:", error);
      }
    }
    fetchDataSalariesCountAccurals();
  }, []);

  return (
    <SalariesDataTable
      columns={SalariesCountAccuralsColumns}
      data={dataSalariesCountAccurals.map((salariesCountAccurals) => ({
        ...salariesCountAccurals,
      }))}
    />
  );
}
