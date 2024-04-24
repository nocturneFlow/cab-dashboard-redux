"use client";
import React, { useState } from "react";
import { fetchOilData } from "../../(oil)/action/fetchOilData";
import { OilDataTable } from "@/components/tables/oil/data-table";
import { ColumnDef } from "@tanstack/react-table";

export interface Car {
  id: number;
  plate_number: string;
  model: string;
}

export interface Oil {
  id: number;
  plate_number: Car;
  date_after_rep: string;
  mileage: number;
  date_fact: string;
  mileage_fact: number;
  kilometers: number;
  comment: string;
}

export const columns: ColumnDef<Oil>[] = [
  {
    accessorKey: "car.plate_number",
    header: "Номер Машины",
  },
  {
    accessorKey: "date_after_rep",
    header: "Дата После Замены",
  },
  {
    accessorKey: "mileage",
    header: "Пробег",
  },
  {
    accessorKey: "date_fact",
    header: "Дата Фактическая",
  },
  {
    accessorKey: "mileage_fact",
    header: "Пробег Фактический",
  },
  {
    accessorKey: "kilometers",
    header: "Километраж",
  },
  {
    accessorKey: "comment",
    header: "Комментарий",
  },
];

export default function GetAllOil() {
  const [dataOil, setDataOil] = React.useState<Oil[]>([]);

  React.useEffect(() => {
    async function fetchDataOil() {
      try {
        const OilData = await fetchOilData(); // Получение данных из вашего API

        // Преобразование даты в удобочитаемый формат
        const formattedOilData = OilData.map((oil) => ({
          ...oil,
          date_after_rep: new Date(oil.date_after_rep).toLocaleDateString(
            "ru-RU"
          ),
          date_fact: new Date(oil.date_fact).toLocaleDateString("ru-RU"),
          car: {
            id: oil.id,
            plate_number: oil.plate_number,
            // model: oil.model,
          },
        }));

        setDataOil(formattedOilData);
      } catch (error) {
        console.error("Error fetching Oil data:", error);
      }
    }
    fetchDataOil();
  }, []);

  return (
    <OilDataTable
      columns={columns}
      data={dataOil.map((oil) => ({
        ...oil,
      }))}
    />
  );
}
