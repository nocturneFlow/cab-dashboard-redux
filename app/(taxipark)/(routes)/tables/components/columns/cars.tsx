"use client";

import { ColumnDef } from "@tanstack/react-table";
import React, { useState, useEffect } from "react";
import { CarsDataTable } from "@/components/tables/cars/data-table";
import { fetchCarsData } from "../../(cars)/action/fetchCarsData";

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
import { DataTableColumnHeader } from "@/components/tables/cars/data-table-column-header";
// export interface Car {
//   id: number;
//   plate_number: string;
//   model: string;
// }

export interface Cars {
  id: number; // ID записи
  plate_number: string;
  model: string;
}

export const columns: ColumnDef<Cars>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "plate_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Номер Машины" />
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("plate_number")}</div>
    ),
  },
  {
    accessorKey: "model",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Модель Машины" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("model")}</div>
    ),
  },
];

export default function GetAllCars() {
  const [dataCars, setDataCars] = React.useState<Cars[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCars, setCurrentCars] = useState<Cars | null>(null);
  const [updatedData, setUpdatedData] = useState<Cars | null>(null);
  const [loading, setLoading] = useState(true);

  // ...

  const handleOpenModal = (car: Cars) => {
    setCurrentCars(car);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    async function fetchDataCars() {
      try {
        const carsData = await fetchCarsData(); // Получение данных из вашего API

        // Преобразование даты в удобочитаемый формат
        const formattedCarsData = carsData.map((car) => ({
          ...car,
          car: {
            id: car.id,
            plate_number: car.plate_number,
            model: car.model,
          },
        }));

        setDataCars(formattedCarsData);
      } catch (error) {
        console.error("Error fetching cars data:", error);
      }
    }
    fetchDataCars();
  }, []);

  return (
    <>
      {/* {loading && (
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
      )} */}

      {/* {!loading && ( */}
      <CarsDataTable
        columns={columns}
        data={dataCars.map((car) => ({
          ...car,
        }))}
      />
      {/* )} */}
    </>
  );
}
