"use client";

import { ColumnDef } from "@tanstack/react-table";

export type SalariesCountPaidOff = {
  id: string;
  SalariesCountPaidOffRecDate: string;
  SalariesCountPaidOffAmount: string;
  SalariesCountPaidOffPaymentType: string;
  SalariesCountPaidOffManager: string;
  SalariesCountPaidOffTypeOfCashier: string;
};

export const SalariesCountPaidOffColumns: ColumnDef<SalariesCountPaidOff>[] = [
  {
    accessorKey: "SalariesCountPaidOffRecDate",
    header: "Дата записи",
  },
  {
    accessorKey: "SalariesCountPaidOffAmount",
    header: "Сумма",
  },
  {
    accessorKey: "SalariesCountPaidOffPaymentType",
    header: "Вид выплаты",
  },
  {
    accessorKey: "SalariesCountPaidOffManager",
    header: "Менеджер",
  },
  {
    accessorKey: "SalariesCountPaidOffTypeOfCashier",
    header: "Вид кассы",
  },
];
