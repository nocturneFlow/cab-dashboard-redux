"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { fetchSalariesCountPaidOffData } from "../../salaries/action/fetchSalariesCountPaidOffData";
import { SalariesDataTable } from "@/components/tables/salaries/salaries-data-table-pagination";

export interface Manager {
  id: number;
  firstName: string;
  lastName: string;
}

export interface SalariesCountPaidOff {
  id: number;
  SalariesCountPaidOffRecDate: string;
  SalariesCountPaidOffAmount: number;
  SalariesCountPaidOffPaymentType: string;
  SalariesCountPaidOffManager: Manager;
  SalariesCountPaidOffTypeOfCashier: string;
};

export const SalariesCountPaidOffColumns: ColumnDef<SalariesCountPaidOff>[] = [
  {
    accessorKey: "SalariesCountPaidOffRecDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Дата записи
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "SalariesCountPaidOffAmount",
    header: "Сумма",
  },
  {
    accessorKey: "SalariesCountPaidOffPaymentType",
    header: "Вид выплаты",
  },
  {
    accessorKey: "SalariesCountPaidOffManager",
    header: "Менеджер",
    cell: ({ row }) => {
      const { firstName, lastName } = row.original.SalariesCountPaidOffManager;
      return `${firstName} ${lastName}`;
    },
  },
  {
    accessorKey: "SalariesCountPaidOffTypeOfCashier",
    header: "Вид кассы",
  },
];

export default function GetAllSalariesCountPaidOff() {
  const [dataSalariesCountPaidOff, setDataSalariesCountPaidOff] = React.useState<SalariesCountPaidOff[]>(
    []
  );

  React.useEffect(() => {
    async function fetchDataSalariesCountPaidOff() {
      try {
        const salariesCountPaidOffData = await fetchSalariesCountPaidOffData(); // Получение данных из вашего API
        console.log(salariesCountPaidOffData);

        // Преобразование даты в удобочитаемый формат
        const formattedSalariesCountPaidOffData = salariesCountPaidOffData.map(
          (salariesCountPaidOff) => ({
            ...salariesCountPaidOff,
            date: new Date(salariesCountPaidOff.SalariesCountPaidOffRecDate).toLocaleDateString("ru-RU"),
            salariesCountPaidOff: {
              SalariesCountPaidOffRecDate: salariesCountPaidOff.SalariesCountPaidOffRecDate,
              SalariesCountPaidOffAmount: salariesCountPaidOff.SalariesCountPaidOffAmount,
              SalariesCountPaidOffPaymentType: salariesCountPaidOff.SalariesCountPaidOffPaymentType,
              SalariesCountPaidOffTypeOfCashier: salariesCountPaidOff.SalariesCountPaidOffTypeOfCashier,
            },
          })
        );

        setDataSalariesCountPaidOff(formattedSalariesCountPaidOffData);
      } catch (error) {
        console.error("Error fetching SalariesCountPaidOff data:", error);
      }
    }
    fetchDataSalariesCountPaidOff();
  }, []);

  

  return (
    <SalariesDataTable
      columns={SalariesCountPaidOffColumns}
      data={dataSalariesCountPaidOff.map((salariesCountPaidOff) => ({
        ...salariesCountPaidOff,
      }))}
    />
  );
}
