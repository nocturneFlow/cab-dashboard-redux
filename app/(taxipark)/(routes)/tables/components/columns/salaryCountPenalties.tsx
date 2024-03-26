"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { fetchSalariesCountPenaltiesData } from "../../salaries/action/fetchSalariesCountPenaltiesData";
import { SalariesDataTable } from "@/components/tables/salaries/salaries-data-table-pagination";

export interface Car {
  id: number;
  plate_number: string;
  model: string;
}


export type SalariesCountPenalties = {
  id: number;
  SalariesCountPenaltiesRecDate: string;
  SalariesCountPenaltiesDocumentDate: string;
  SalariesCountPenaltiesCarNumber: Car;
  SalariesCountPenaltiesShiftWork: {
    id: number;
    schedule: string;
  };
  SalariesCountPenaltiesDocumentNumber: number;
  SalariesCountPenaltiesAmount: number;
  SalariesCountPenaltiesLink: string;
};

export const SalariesCountPenaltiesColumns: ColumnDef<SalariesCountPenalties>[] =
  [
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
      accessorKey: "SalariesCountPenaltiesDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Дата документа
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "car.SalariesCountPenaltiesCarNumber",
      header: "Номер машины",
    },
    {
      accessorKey: "SalariesCountPenaltiesShiftWork",
      header: "Смена",
    },
    {
      accessorKey: "SalariesCountPenaltiesDocumentNumber",
      header: "№ документа",
    },
    {
      accessorKey: "SalariesCountPenaltiesAmount",
      header: "Сумма",
    },
    {
      accessorKey: "SalariesCountPenaltiesLink",
      header: "Ссылка",
    },
  ];


  export default function GetAllSalariesCountPenalties() {
    const [dataSalariesCountPenalties, setDataSalariesCountPenalties] = React.useState<SalariesCountPenalties[]>(
      []
    );
  
    React.useEffect(() => {
      async function fetchDataSalariesCountPenalties() {
        try {
          const salariesCountPenaltiesData = await fetchSalariesCountPenaltiesData(); // Получение данных из вашего API
          console.log(salariesCountPenaltiesData);
  
          // Преобразование даты в удобочитаемый формат
          const formattedSalariesCountPenaltiesData = salariesCountPenaltiesData.map(
            (salariesCountPenalties) => ({
              ...salariesCountPenalties,
              recDate: new Date(salariesCountPenalties.SalariesCountPenaltiesRecDate).toLocaleDateString("ru-RU"),
              documentDate: new Date(salariesCountPenalties.SalariesCountPenaltiesDocumentDate).toLocaleDateString("ru-RU"),

              car: {
                id: salariesCountPenalties.SalariesCountPenaltiesCarNumber.id,
                plate_number: salariesCountPenalties.SalariesCountPenaltiesCarNumber.plate_number,
                model: salariesCountPenalties.SalariesCountPenaltiesCarNumber.model,
              },

            })
          );
  
          setDataSalariesCountPenalties(formattedSalariesCountPenaltiesData);
        } catch (error) {
          console.error("Error fetching SalariesCountPenalties data:", error);
        }
      }
      fetchDataSalariesCountPenalties();
    }, []);
  
    
  
    return (
      <SalariesDataTable
        columns={SalariesCountPenaltiesColumns}
        data={dataSalariesCountPenalties.map((salariesCountPenalties) => ({
          ...salariesCountPenalties,
        }))}
      />
    );
  }
  