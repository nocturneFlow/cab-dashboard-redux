"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import ExpandedTable from "../expanded-table";
import { ArrowUpDown, Scaling } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

export type Applications = {
  id: string;
  manager: string;
  taxipark: string;
  date: string;
  time: string;
  fullname: string;
  carNumber: string;
  schedule: "день" | "ночь";
  lineTime: number;
};

export const columns: ColumnDef<Applications>[] = [
  {
    accessorKey: "manager",
    header: "Менеджер",
  },
  {
    accessorKey: "taxipark",
    header: "Таксопарк",
  },
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
    accessorKey: "time",
    header: "Время",
  },
  {
    accessorKey: "fullname",
    header: "ФИО Водителя",
  },
  {
    accessorKey: "carNumber",
    header: "Номер Машины",
  },
  {
    accessorKey: "schedule",
    header: "График",
  },
  {
    accessorKey: "lineTime",
    header: "Время на линии",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const applications = row.originalSubRows;

      return (
        <Drawer direction="bottom">
          <DrawerTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open drawer</span>
              <Scaling className="h-4 w-4" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="bg-yellow-500 text-white">
              Яндекс
            </DrawerHeader>
            <ExpandedTable />
            <DrawerHeader className="bg-blue-500 text-white">
              Касса
            </DrawerHeader>
            <ExpandedTable />
            <DrawerHeader className="bg-green-500 text-white">
              Расходы
            </DrawerHeader>
            <ExpandedTable />
            <DrawerHeader className="bg-primary text-white">
              Фонд оплаты труда
            </DrawerHeader>
            <ExpandedTable />
            <DrawerFooter>
              <DrawerClose>
                <Button variant="outline">Закрыть</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    },
  },
];
