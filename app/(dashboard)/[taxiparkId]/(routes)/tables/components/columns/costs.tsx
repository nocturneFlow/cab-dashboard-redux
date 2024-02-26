import { ColumnDef } from "@tanstack/react-table";

export type Costs = {
  id: string;
  date: string;
  carNumber: string;
  taxipark: string;
  manager: string;
  fullname: string;
};

export const costsColumns: ColumnDef<Costs>[] = [
  {
    accessorKey: "date",
    header: "Дата выдачи расходов",
  },
  {
    accessorKey: "carNumber",
    header: "Номер машины",
  },
  {
    accessorKey: "taxipark",
    header: "Таксопарк",
  },
  {
    accessorKey: "manager",
    header: "Менеджер",
  },
  {
    accessorKey: "fullname",
    header: "ФИО Водителя",
  },
];
