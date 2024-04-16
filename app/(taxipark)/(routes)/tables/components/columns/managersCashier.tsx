"use client";

import { ColumnDef } from "@tanstack/react-table";

export type managersCashier = {
  id: string;
  date: string;
  manager: string;
  incomeFromFounders: string;
  incomeFromDriver: string;
  expenses: string;
  salary: string;
  totalCcashChange: string;
  encashment: string;
};

export const columns: ColumnDef<managersCashier>[] = [
  {
    accessorKey: "date",
    header: "Дата",
  },
  {
    accessorKey: "manager",
    header: "Менеджер",
  },
  {
    accessorKey: "incomeFromFounders",
    header: "Приход от учредителей",
  },
  {
    accessorKey: "incomeFromDriver",
    header: "Приход от водителей",
  },
  {
    accessorKey: "expenses",
    header: "Расходы",
  },
  {
    accessorKey: "salary",
    header: "Зарплата",
  },
  {
    accessorKey: "totalCcashChange",
    header: "Итого сдача кассы",
  },
  {
    accessorKey: "encashment",
    header: "Инкассация",
  },
];
