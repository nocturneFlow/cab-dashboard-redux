"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Kaspi = {
  id: string;
  kaspiIncomeFromFounders: string;
  kaspiIncomeFromDriver: string;
  kaspiExpenses: string;
  kaspiSalary: string;
  kaspiTotalCcashChange: string;
  kaspiEncashment: string;
};

export const kaspicolumns: ColumnDef<Kaspi>[] = [
  {
    accessorKey: "kaspiIncomeFromFounders",
    header: "Приход от учредителей",
  },
  {
    accessorKey: "kaspiIncomeFromDriver",
    header: "Приход от водителей",
  },
  {
    accessorKey: "kaspiExpenses",
    header: "Расходы",
  },
  {
    accessorKey: "kaspiSalary",
    header: "Зарплата",
  },
  {
    accessorKey: "kaspiTotalCcashChange",
    header: "Итого сдача кассы",
  },
  {
    accessorKey: "kaspiEncashment",
    header: "Инкассация",
  },
];
