"use client";

import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { ReportsDataTable } from "@/components/tables/reports/reports-data-table-pagination";
import { fetchAdditionalIncomeData } from "../../(additionalIncome)/action/fetchAdditionalIncomeData";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export interface AdditionalIncome {
  id: number;
  date: string;
  summ: number;
  comment: string;
}

export const additionalIncomeColumns: ColumnDef<AdditionalIncome>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Дата
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "summ",
    header: "Сумма",
  },
  {
    accessorKey: "comment",
    header: "Комментарий",
  },
];

export default function GetAlladditionalIncome() {
  const [dataadditionalIncome, setDataadditionalIncome] = React.useState<
    AdditionalIncome[]
  >([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [currentadditionalIncome, setCurrentadditionalIncome] =
  //   useState<additionalIncome | null>(null);
  // const [updatedData, setUpdatedData] = useState<additionalIncome | null>(null);

  // // ...

  // const handleOpenModal = (car: additionalIncome) => {
  //   setCurrentadditionalIncome(car);
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  React.useEffect(() => {
    async function fetchDataadditionalIncome() {
      try {
        const additionalIncomeData = await fetchAdditionalIncomeData(); // Получение данных из вашего API

        // Преобразование даты в удобочитаемый формат
        const formattedadditionalIncomeData = additionalIncomeData.map(
          (report) => ({
            ...report,
            date: new Date(report.date).toLocaleDateString("ru-RU"),
            report: {
              id: report.id,
              summ: report.summ,
              comment: report.comment,
            },
          })
        );

        setDataadditionalIncome(formattedadditionalIncomeData);
      } catch (error) {
        console.error("Error fetching additionalIncome data:", error);
      }
    }
    fetchDataadditionalIncome();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      // await deleteCars(id); // Call API to delete application
      setDataadditionalIncome((prevData) =>
        prevData.filter((car) => car.id !== id)
      );
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <ReportsDataTable
      columns={additionalIncomeColumns}
      data={dataadditionalIncome.map((car) => ({
        ...car,
        onDelete: handleDelete,
      }))}
      // onEdit={handleOpenModal}
    />
  );
}
