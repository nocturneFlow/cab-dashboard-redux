"use client";

import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { CarsDataTable } from "@/components/tables/cars/cars-data-table-pagination";
import { fetchCarsData } from "../../cars/action/fetchCarsData";

export interface Car {
  id: number;
  plate_number: string;
  model: string;
}

export interface Cars {
  plate_number: any;
  model: any;
  id: number; // ID записи
  car: Car; // Объект Car
  taxipark: string; // Название таксопарка
}

export const CarsColumns: ColumnDef<Cars>[] = [
  {
    accessorKey: "car.id",
    header: "ID",
  },
  {
    accessorKey: "car.plate_number",
    header: "Номер машины",
  },
  {
    accessorKey: "car.model",
    header: "Модель машины",
  },
];

export default function GetAllCars() {
  const [dataCars, setDataCars] = React.useState<Cars[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCars, setCurrentCars] = useState<Cars | null>(null);
  const [updatedData, setUpdatedData] = useState<Cars | null>(null);

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

  const handleDelete = async (id: number) => {
    try {
      // await deleteCars(id); // Call API to delete application
      setDataCars((prevData) => prevData.filter((car) => car.id !== id));
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <CarsDataTable
      columns={CarsColumns}
      data={dataCars.map((car) => ({
        ...car,
        onDelete: handleDelete,
      }))}
      // onEdit={handleOpenModal}
    />
  );
}
