"use client";

import { ColumnDef } from "@tanstack/react-table";

export type SalariesSalariesPayment = {  
  id: string;
  SalariesSalariesPaymentDriver: string;
  SalariesSalariesPaymentUpfront: string;
  SalariesSalariesPaymentSalary: string;
  SalariesSalariesPaymentDeposit: string;
  SalariesSalariesPaymentPenalty: string;
};

export const SalariesPaymentColumns: ColumnDef<SalariesSalariesPayment>[] = [
  {
    accessorKey: "SalariesSalariesLaborRemunerationFundDriver",
    header: "Водители",
  },
  {
    accessorKey: "SalariesSalariesPaymentUpfront",
    header: "Аванс",
  },
  {
    accessorKey: "SalariesSalariesPaymentSalary",
    header: "Зарплата",
  },
  {
    accessorKey: "SalariesSalariesPaymentDeposit",
    header: "Депозит",
  },
  {
    accessorKey: "SalariesSalariesPaymentPenalty",
    header: "Штраф",
  },
];
