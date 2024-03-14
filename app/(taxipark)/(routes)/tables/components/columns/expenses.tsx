"use client";

import { ColumnDef } from "@tanstack/react-table";
export type Expenses = {
  id: string;
  ExpensesDateOfIssue: string;
  ExpensesCarNumber: string;
  ExpensesTaxiPark: string;
  ExpensesManager: string;
  ExpensesDriverFullName: string;
  ExpensesObjectOfExpenditure: string;
};

export const ExpensesColumns: ColumnDef<Expenses>[] = [
  {
    accessorKey: "ExpensesDateOfIssue",
    header: "Дата выдачи расходов",
  },
  {
    accessorKey: "ExpensesCarNumber",
    header: "Номер Машины",
  },
  {
    accessorKey: "ExpensesTaxiPark",
    header: "Таксопарк",
  },
  {
    accessorKey: "ExpensesManager",
    header: "Менеджер",
  },
  {
    accessorKey: "ExpensesDriverFullName",
    header: "ФИО водителя",
  },
  {
    accessorKey: "ExpensesObjectOfExpenditure",
    header: "Статья расходов",
  },
];