"use client";

import { ColumnDef } from "@tanstack/react-table";

export type SalariesSalariesLaborRemunerationFund = {
  id: string;
  SalariesSalariesLaborRemunerationFundDriver: string;
  SalariesSalariesLaborRemunerationFundTotal: string;
  SalariesSalariesLaborRemunerationFundWages: string;
  SalariesSalariesLaborRemunerationFundBonus: string;
  SalariesSalariesLaborRemunerationFundBonusFromCompany: string;
};

export const SalariesFOTColumns: ColumnDef<SalariesSalariesLaborRemunerationFund>[] =
  [
    {
      accessorKey: "SalariesSalariesLaborRemunerationFundDriver",
      header: "Водители",
    },
    {
      accessorKey: "SalariesSalariesLaborRemunerationFundTotal",
      header: "Итого",
    },
    {
      accessorKey: "SalariesSalariesLaborRemunerationFundWages",
      header: "Оклад",
    },
    {
      accessorKey: "SalariesSalariesLaborRemunerationFundBonus",
      header: "Бонус",
    },
    {
      accessorKey: "SalariesSalariesLaborRemunerationFundBonusFromCompany",
      header: "Бонус от компании",
    },
  ];
