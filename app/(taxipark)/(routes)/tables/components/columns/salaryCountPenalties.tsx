"use client";

import { ColumnDef } from "@tanstack/react-table";

export type SalariesCountPenalties = {
  id: string;
  SalariesCountPenaltiesRecDate: string;
  SalariesCountPenaltiesDocumentDate: string;
  SalariesCountPenaltiesCarNumber: string;
  SalariesCountPenaltiesShiftWork: string;
  SalariesCountPenaltiesDocumentNumber: string;
  SalariesCountPenaltiesAmount: string;
  SalariesCountPenaltiesLink: string;
};

export const SalariesCountPenaltiesColumns: ColumnDef<SalariesCountPenalties>[] =
  [
    {
      accessorKey: "SalariesCountPaidOffRecDate",
      header: "Дата записи",
    },
    {
      accessorKey: "SalariesCountPenaltiesDate",
      header: "Дата документа",
    },
    {
      accessorKey: "SalariesCountPenaltiesCarNumber",
      header: "Номер машины",
    },
    {
      accessorKey: "SalariesCountPenaltiesShiftWork",
      header: "Смена",
    },
    {
      accessorKey: "SalariesCountPenaltiesDocumentNumber",
      header: "№ документа",
    },
    {
      accessorKey: "SalariesCountPenaltiesAmount",
      header: "Сумма",
    },
    {
      accessorKey: "SalariesCountPenaltiesLink",
      header: "Ссылка",
    },
  ];
