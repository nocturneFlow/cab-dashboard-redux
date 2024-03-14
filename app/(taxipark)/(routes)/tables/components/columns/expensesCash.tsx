"use client";

import { ColumnDef } from "@tanstack/react-table";


export type ExpensesCash = {
  id: string;
    ExpensesCashGasOrOtherCash: string;
    ExpensesCashOtherCash: string;
};

export const ExpensesCashColumns: ColumnDef<ExpensesCash>[] = [
  {
    accessorKey: "ExpensesCashGasOrOtherCash",
    header: "Газ/Нал",
  },
  {
    accessorKey: "ExpensesCashOtherCash",
    header: "Прочие расходы/Нал",
  },
];
