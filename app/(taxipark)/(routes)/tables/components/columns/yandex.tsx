import { ColumnDef } from "@tanstack/react-table";

export type Yandex = {
  id: string;
  cash: string;
  noncash: string;
  total: string;
};

export const columns: ColumnDef<Yandex>[] = [
  {
    accessorKey: "cash",
    header: "Наличными",
  },
  {
    accessorKey: "noncash",
    header: "Безнал",
  },
  {
    accessorKey: "total",
    header: "Итого",
  },
];
