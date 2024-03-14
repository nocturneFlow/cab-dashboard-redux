"use client";

import { ColumnDef } from "@tanstack/react-table";

export type СheckKasaM = {
  id: string;
  checkApplication: string;
  checkExpenses: string;
  checkOnRequest: string;
  checkCashier: string;
  checkDifference: string;
};

export const checkKassaMcolumns: ColumnDef<СheckKasaM>[] = [
  {
    accessorKey: "checkApplication",
    header: "Заявка",
  },
  {
    accessorKey: "checkExpenses",
    header: "Расходы ",
  },
  {
    accessorKey: "checkOnRequest",
    header: "По заявке",
  },
  {
    accessorKey: "checkCashier",
    header: "Касса",
  },
  {
    accessorKey: "checkDifference",
    header: "Разница",
  },
];
