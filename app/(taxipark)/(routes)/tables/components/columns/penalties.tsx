"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Penalties = {
  id: string;
  PenaltiesRecordDate: string;
  PenaltiesTravelDate: string;
  PenaltiesDriver: string;
  PenaltiesWorkShift: string;
  PenaltiesCarNumber: string;
  PenaltiesDocumentDate: string;
  PenaltiesDocumentNumber: string;
  PenltiesAmount: string;
  PenaltiesLinlComments: string;

};

export const PenaltiesColumns: ColumnDef<Penalties>[] = [
  {
    accessorKey: "PenaltiesRecordDate",
    header: "Дата записи",
  },
  {
    accessorKey: "PenaltiesTravelDate",
    header: "Дата поездки",
  },
  {
    accessorKey: "PenaltiesDriver",
    header: "Водитель",
  },
  {
    accessorKey: "PenaltiesWorkShift",
    header: "Смена",
  },
  {
    accessorKey: "PenaltiesCarNumber",
    header: "Номер Машины",
  },
  {
    accessorKey: "PenaltiesDocumentDate",
    header: "Дата документа",
  },
  {
    accessorKey: "PenaltiesDocumentNumber",
    header: "№ документа",
  },
  {
    accessorKey: "PenltiesAmount",
    header: "Сумма",
  },
  {
    accessorKey: "PenaltiesLinlComments",
    header: "Ссылка/комментарии",
  },
];
