"use client";

import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { CashReconciliationDataTable } from "@/components/tables/cashReconciliation/cashReconciliation-data-table-pagination";
import { fetchCashReconciliationData } from "../../(CashReconciliation)/action/fetchCashReconciliationData";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpDown,
  Eraser,
  MoreHorizontal,
  PanelBottomOpen,
  PenLine,
} from "lucide-react";

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
  name: string;
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
  summ: any;
  comment: any;
  date: string | number | Date;
  id: number;
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
      return (
        <>
          <div>
            <Sheet>
              <SheetTrigger>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <PanelBottomOpen className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="backdrop-blur">
                <SheetHeader>
                  <SheetDescription className="p-20 ">
                    <Accordion type="multiple">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          <SheetTitle>Яндекс</SheetTitle>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Наличными</TableHead>
                                <TableHead>Безнал</TableHead>
                                <TableHead className="text-right">
                                  Итого
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  {row.original.yandexData.cash_amount}
                                </TableCell>
                                <TableCell>
                                  {row.original.yandexData.cashless_amount}
                                </TableCell>
                                <TableCell className="text-right">
                                  {row.original.yandexData.cash_amount +
                                    row.original.yandexData.cashless_amount}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>
                          <SheetTitle>Касса</SheetTitle>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Наличными</TableHead>
                                <TableHead>Kaspi</TableHead>
                                <TableHead>Итого</TableHead>
                                <TableHead className="text-right">
                                  Разница
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  {row.original.payment.amount_cash}
                                </TableCell>
                                <TableCell>
                                  {row.original.payment.amount_cashless}
                                </TableCell>
                                <TableCell>
                                  {row.original.payment.amount_cash +
                                    row.original.payment.amount_cashless}
                                </TableCell>
                                <TableCell className="text-right">
                                  {row.original.payment.amount_cash +
                                    row.original.payment.amount_cashless -
                                    row.original.payment.amount_cashless}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>
                          <SheetTitle>Расходы</SheetTitle>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Газ</TableHead>
                                <TableHead>Прочие расходы</TableHead>
                                <TableHead>Статья расходов</TableHead>
                                <TableHead>Аванс</TableHead>
                                <TableHead className="text-right">
                                  Итого расходы с нал
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  {row.original.expenseApl.gas}
                                </TableCell>
                                <TableCell>
                                  {row.original.expenseApl.other}
                                </TableCell>
                                <TableCell>
                                  {row.original.expenseApl.expenseItemApl.name}
                                </TableCell>
                                <TableCell>
                                  {row.original.expenseApl.advance}
                                </TableCell>
                                <TableCell className="text-right">
                                  {row.original.expenseApl.gas +
                                    row.original.expenseApl.other +
                                    row.original.expenseApl.advance}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
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
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Действие</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <EditApplicationModal data={row.original} /> */}
            <DropdownMenuItem
              onClick={() => row.original.onDelete(row.original.id)}
            >
              <Eraser className="w-4 h-4" />
              <span className="pl-2">Удалить</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function GetAllCashReconciliation() {
  const [dataCashReconciliation, setDataCashReconciliation] = React.useState<
    CashReconciliation[]
  >([]);

  React.useEffect(() => {
    async function fetchDataCashReconciliation() {
      try {
        const cashReconciliationData = await fetchCashReconciliationData();
        console.log(cashReconciliationData);

        const formattedCashReconciliationData = cashReconciliationData.map(
          (cashReconciliation) => ({
            ...cashReconciliation,
            car: {
              id: cashReconciliation.car.id,
              plate_number: cashReconciliation.car.plate_number,
              model: cashReconciliation.car.model,
            },
          })
        );

        setDataCashReconciliation(formattedCashReconciliationData);
      } catch (error) {
        console.error("Error fetching cashReconciliation data:", error);
      }
    }
    fetchDataCashReconciliation();
  }, []);

  return (
    <CashReconciliationDataTable
      columns={CashReconciliationColumns}
      data={dataCashReconciliation.map((cashReconciliation) => ({
        ...cashReconciliation,
      }))}
    />
  );
}
