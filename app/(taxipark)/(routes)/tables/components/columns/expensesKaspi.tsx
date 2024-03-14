"use client";

import { ColumnDef } from "@tanstack/react-table";

export type ExpensesKaspi = {
  id: string;
    ExpensesKaspiGasOrOtherKaspi: string;
    ExpensesKaspiOtherKaspi: string;
};

export const ExpensesKaspiColumns: ColumnDef<ExpensesKaspi>[] = [
  {
    accessorKey: "ExpensesKaspiGasOrOtherKaspi",
    header: "Газ/Kaspi",
  },
  {
    accessorKey: "ExpensesKaspiOtherKaspi",
    header: "Газ/Kaspi",
  },
];
