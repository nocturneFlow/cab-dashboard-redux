"use client";

import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { ExpensesDataTable } from "@/components/tables/expenses/expenses-data-table-pagination";
import { fetchExpensesData } from "../../expenses/action/fetchExpensesData";
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
  ArrowUpDown,
  Eraser,
  MoreHorizontal,
  PanelBottomOpen,
  PenLine,
} from "lucide-react";
import { CellAction } from "../cell-action";

export interface Manager {
  id: number;
  firstName: string;
  lastName: string;
}

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

export interface Expenses {
  id: number;
  expensesDateOfIssue: string;
  expensesCar: Car;
  expensesTaxiPark: string;
  expensesManager: Manager;
  expensesDriverFullName: Driver;
  expensesCashFuel: number;
  expensesCashOther: number;
  expensesKaspiFuel: number;
  expensesKaspiOther: number;
  expensesObjectOfExpenditure: string;
}

export const ExpensesColumns: ColumnDef<Expenses>[] = [
  {
    accessorKey: "expensesDateOfIssue",
    header: "Дата выдачи расходов",
  },
  {
    accessorKey: "expensesCar.plate_number",
    header: "Номер Машины",
  },
  {
    accessorKey: "expensesTaxiPark",
    header: "Таксопарк",
  },
  {
    accessorKey: "expensesManager",
    header: "Менеджер",
    cell: ({ row }) => {
      const { firstName, lastName } = row.original.expensesManager;
      return `${firstName} ${lastName}`;
    },
  },
  {
    accessorKey: "expensesDriverFullName",
    header: "ФИО водителя",
    cell: ({ row }) => {
      const { firstName, lastName } = row.original.expensesDriverFullName;
      return `${firstName} ${lastName}`;
    },
  },
  {
    accessorKey: "expensesObjectOfExpenditure",
    header: "Статья расходов",
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
                      <AccordionItem value="item-2">
                        <AccordionTrigger>
                          <SheetTitle>Наличными</SheetTitle>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Газ</TableHead>
                                <TableHead>Прочие расходы</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  {row.original.expensesCashFuel}
                                </TableCell>

                                <TableCell>
                                  {row.original.expensesCashOther}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-3">
                        <AccordionTrigger>
                          <SheetTitle>Kaspi</SheetTitle>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Газ</TableHead>
                                <TableHead>Прочие расходы</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  {row.original.expensesKaspiFuel}
                                </TableCell>

                                <TableCell>
                                  {row.original.expensesKaspiOther}
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
];

export default function GetAllExpenses() {
  const [dataExpenses, setDataExpenses] = React.useState<Expenses[]>([]);

  React.useEffect(() => {
    async function fetchDataExpenses() {
      try {
        let expensesData = await fetchExpensesData(); // Получение данных из вашего API
        console.log(expensesData);

        // Normalize expensesData to an array if it's not already an array
        if (!Array.isArray(expensesData)) {
          expensesData = []; // Wrap the single object in an array
        }
        // Преобразование даты в удобочитаемый формат
        const formattedExpensesData = expensesData.map((expenses) => ({
          ...expenses,
          date: new Date(expenses.expensesDateOfIssue).toLocaleDateString(
            "ru-RU"
          ),
          car: {
            id: expenses.expensesCar.id,
            plate_number: expenses.expensesCar.plate_number,
            model: expenses.expensesCar.model,
          },
        }));

        setDataExpenses(formattedExpensesData);
      } catch (error) {
        console.error("Error fetching expenses data:", error);
      }
    }
    fetchDataExpenses();
  }, []);

  return (
    <ExpensesDataTable
      columns={ExpensesColumns}
      data={dataExpenses.map((expenses) => ({
        ...expenses,
      }))}
    />
  );
}
