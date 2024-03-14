"use client";

import { ColumnDef } from "@tanstack/react-table";

export type SalariesCountAccurals = {
  id: string;
  SalariesCountAccuralsTravelDate: string;
  SalariesCountAccuralsCarNumber: string;
  SalariesCountAccuralsSchedule: string;
  SalariesCountAccuralsTime: string;
  SalariesCountAccuralsCash: string;
  SalariesCountAccuralsTotal: string;
  SalariesCountAccuralsSummarized: string;
  SalariesCountAccuralsSalary: string;
  SalariesCountAccuralsBonus: string;
  SalariesCountAccuralsBonusFromCompany: string;
  SalariesCountAccuralsUpFront: string;
  SalariesCountAccuralsManager: string;
};

export const SalariesCountAccuralsColumns: ColumnDef<SalariesCountAccurals>[] =
  [
    {
      accessorKey: "SalariesCountAccuralsTravelDate",
      header: "Дата поездки",
    },
    {
      accessorKey: "SalariesCountAccuralsCarNumber",
      header: "Номер машины",
    },
    {
      accessorKey: "SalariesCountAccuralsSchedule",
      header: "График",
    },
    {
      accessorKey: "SalariesCountAccuralsTime",
      header: "Время на линии",
    },
    {
      accessorKey: "SalariesCountAccuralsCash",
      header: "Наличн.",
    },
    {
      accessorKey: "SalariesCountAccuralsTotal",
      header: "Всего",
    },
    {
      accessorKey: "SalariesCountAccuralsSummarized",
      header: "Итого оклад+бонус",
    },
    {
      accessorKey: "SalariesCountAccuralsSalary",
      header: "Оклад",
    },
    {
      accessorKey: "SalariesCountAccuralsBonus",
      header: "Бонус",
    },
    {
      accessorKey: "SalariesCountAccuralsBonusFromCompany",
      header: "Бонус от компании",
    },
    {
      accessorKey: "SalariesCountAccuralsUpFront",
      header: "Аванс",
    },
    {
      accessorKey: "SalariesCountAccuralsManager",
      header: "Менеджер",
    },
  ];
