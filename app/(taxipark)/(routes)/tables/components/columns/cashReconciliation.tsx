"use client";

import { ColumnDef } from "@tanstack/react-table";

import React, { useState } from "react";
import { CashReconciliationDataTable } from "@/components/tables/cashReconciliation/cashReconciliation-data-table-pagination";
import { fetchCashReconciliationData } from "../../CashReconciliation/action/fetchCashReconciliationData";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ArrowUpDown, ExpandIcon, MoreHorizontal, Scaling } from "lucide-react";

export interface Car {
  id: number;
  plate_number: string;
  model: string;
}

export interface Driver {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Manager {
  id: number;
  firstName: string;
  lastName: string;
}

export interface Payment {
  id: number;
  date: string;
  amount_cashless: number;
  amount_cash: number;
  manager: Manager;
  car: Car;
}

export interface YandexData {
  id: number;
  cash_amount: number;
  cashless_amount: number;
  car: Car;
  schedule: {
    id: number;
    schedule: string;
  };
}

export interface Payroll {
  id: number;
  salary: number;
  bonus_from_company: number;
  driver: Driver;
  car: Car;
}

export interface ExpenseItemApl {
  id: number;
  expense_item_name: string;
}

export interface ExpenseApl {
  id: number;
  gas: number;
  other: number;
  advance: number;
  driver: Driver;
  car: Car;
  expenseItemApl: ExpenseItemApl;
}

export interface CashReconciliation {
  id: number;
  date: string;
  time_on_line: number;
  car: Car;
  driver: Driver;
  manager: Manager;
  payment: Payment;
  yandexData: YandexData;
  payroll: Payroll;
  schedule: {
    id: number;
    schedule: string;
  };
  expenseApl: ExpenseApl;
  onDelete: (id: number) => void;
}

export const CashReconciliationColumns: ColumnDef<CashReconciliation>[] = [
  {
    accessorKey: "manager",
    header: "Менеджер",
    cell: ({ row }) => {
      const { firstName, lastName } = row.original.manager;
      return `${firstName} ${lastName}`;
    },
  },
  {
    accessorKey: "driver",
    header: "ФИО Водителя",
    cell: ({ row }) => {
      const { firstName, lastName } = row.original.driver;
      return `${firstName} ${lastName}`;
    },
  },
  {
    accessorKey: "car.plate_number",
    header: "Номер Машины",
  },
  {
    accessorKey: "schedule.schedule",
    header: "График",
  },
  {
    accessorKey: "time_on_line",
    header: "Время на линии",
  },
  {
    id: "expand",
    cell: ({ row }) => {
      const CashReconciliation = row.originalSubRows;

      return (
        <>
          <div>
            <Sheet>
              <SheetTrigger>
                <Scaling className="h-4 w-4" strokeWidth="2px" />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Яндекс</SheetTitle>
                  <SheetDescription>
                    <Table>
                      <TableCaption>
                        A list of your recent invoices.
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Наличными</TableHead>
                          <TableHead>Безнал</TableHead>
                          <TableHead>Итого</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>INV001</TableCell>
                          <TableCell>Paid</TableCell>
                          <TableCell>Credit Card</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </SheetDescription>
                  <SheetTitle>Касса</SheetTitle>
                  <SheetDescription>
                    <Table>
                      <TableCaption>
                        A list of your recent invoices.
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Invoice</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">INV001</TableCell>
                          <TableCell>Paid</TableCell>
                          <TableCell>Credit Card</TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </SheetDescription>
                  <SheetTitle>Расходы</SheetTitle>
                  <SheetDescription>
                    <Table>
                      <TableCaption>
                        A list of your recent invoices.
                      </TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Invoice</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">INV001</TableCell>
                          <TableCell>Paid</TableCell>
                          <TableCell>Credit Card</TableCell>
                          <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const CashReconciliation = row.originalSubRows;

      return (
        <>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"}>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Действие</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Изменить</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => row.original.onDelete(row.original.id)}
                >
                  Удалить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      );
    },
  },
];

// export default function GetAllCashReconciliation() {
//     const [dataCashReconciliation, setDataCashReconciliation] = React.useState<CashReconciliation[]>(
//         []
//     );

//   React.useEffect(() => {
//     async function fetchCashReconciliationData() {
//       try {
//         const CashReconciliationData = await fetchCashReconciliationData();

//         // Преобразование даты в удобочитаемый формат
//         const formattedCashReconciliationData = CashReconciliationData.map(
//           (application) => ({
//             ...application,
//             date: new Date(application.date).toLocaleDateString("ru-RU"),
//             car: {
//               id: application.car.id,
//               plate_number: application.car.plate_number,
//               model: application.car.model,
//             },
//           })
//         );

//                 setDataCashReconciliation(formattedCashReconciliationData);
//             } catch (error) {
//                 console.error("Error fetching CashReconciliation data:", error);
//             }
//         }
//         fetchCashReconciliationData();
//     }, []);

//   return (
//     <CashReconciliationDataTable
//       columns={CashReconciliationColumns}
//       data={dataCashReconciliation.map((cashReconciliation) => ({
//         ...cashReconciliation,
//       }))}
//     />
//   );
// }
