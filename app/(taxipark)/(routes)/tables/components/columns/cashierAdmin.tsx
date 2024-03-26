"use client";

import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { ReportsDataTable } from "@/components/tables/reports/reports-data-table-pagination";
import { fetchCashierAdminData } from "../../cashierAdmin/action/fetchcashierAdminData";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";


export interface CashierAdmin {
    id: number;
    date: string;
    arrival: number;
    consumption: number;
    article: string;
    comment: string;
    paymentMethod: string;
    classification: string;
};
  
export const cashierAdminColumns: ColumnDef<CashierAdmin>[] = [
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
      accessorKey: "arrival",
      header: "Приход",
    },
    {
        accessorKey: "consumption",
        header: "Расход",
    },
    {
        accessorKey: "article",
        header: "Статья",
    },
    {
      accessorKey: "comment",
      header: "Комментарий",
    },
    {
        accessorKey: "paymentMethod",
        header: "Способ оплаты",
    },
    {
        accessorKey: "classification",
        header: "Классификация",
    },  
];

export default function GetAllCashierAdmin() {
    const [datacashierAdmin, setDatacashierAdmin] = React.useState<CashierAdmin[]>(
      []
    );
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [currentcashierAdmin, setCurrentcashierAdmin] =
    //   useState<cashierAdmin | null>(null);
    // const [updatedData, setUpdatedData] = useState<cashierAdmin | null>(null);
  
    // // ...
  
    // const handleOpenModal = (car: cashierAdmin) => {
    //   setCurrentcashierAdmin(car);
    //   setIsModalOpen(true);
    // };
  
    // const handleCloseModal = () => {
    //   setIsModalOpen(false);
    // };
  
  
    React.useEffect(() => {
      async function fetchDatacashierAdmin() {
        try {
          const cashierAdminData = await fetchCashierAdminData(); // Получение данных из вашего API
  
          // Преобразование даты в удобочитаемый формат
          const formattedcashierAdminData = cashierAdminData.map(
            (report) => ({
              ...report,
              date: new Date(report.date).toLocaleDateString("ru-RU"),
            //   report: {
            //     id: report.id,
            //     summ: report.summ,
            //     comment: report.comment,
            //   },
            })
          );
  
          setDatacashierAdmin(formattedcashierAdminData);
        } catch (error) {
          console.error("Error fetching cashierAdmin data:", error);
        }
      }
      fetchDatacashierAdmin();
    }, []);
  

  
    const handleDelete = async (id: number) => {
      try {
        // await deleteCars(id); // Call API to delete application
        setDatacashierAdmin((prevData) =>
          prevData.filter((car) => car.id !== id)
        );
      } catch (error) {
        console.error("Error deleting application:", error);
      }
    };
  
    return (
      <ReportsDataTable
        columns={cashierAdminColumns}
        data={datacashierAdmin.map((car) => ({
          ...car,
          onDelete: handleDelete,
        }))}
        // onEdit={handleOpenModal}
      />
    );
  }
  