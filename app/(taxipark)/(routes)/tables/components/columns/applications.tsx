"use client";

import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { ApplicationsDataTable } from "@/components/tables/applications/applications-data-table-pagination";
import { fetchApplicationsData } from "../../applications/action/fetchApplicationData";
import { deleteApplication } from "@/components/modals/delete-application";
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
import { CellAction } from "../cell-action";
import { EditApplicationModal } from "@/components/modals/edit-application-modal";

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

export interface Application {
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

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "manager",
    header: "Менеджер",
    cell: ({ row }) => {
      const { firstName, lastName } = row.original.manager;
      return `${firstName} ${lastName}`;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Дата
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
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
                                  {
                                    row.original.expenseApl.expenseItemApl
                                      .expense_item_name
                                  }
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
                      <AccordionItem value="item-4">
                        <AccordionTrigger>
                          <SheetTitle>Фонд оплаты труда</SheetTitle>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Итого оклад+бонус</TableHead>
                                <TableHead>Оклад</TableHead>
                                <TableHead>Бонус</TableHead>
                                <TableHead className="text-right">
                                  Бонус от компании
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell className="text-right">
                                  {row.original.payroll.bonus_from_company}
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
            <EditApplicationModal data={row.original} />
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
  // {
  //   id: "actionsTwo",
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];

export default function GetAllApplications() {
  const [dataApplications, setDataApplications] = React.useState<Application[]>(
    []
  );

  React.useEffect(() => {
    async function fetchDataApplications() {
      try {
        const applicationsData = await fetchApplicationsData(); // Получение данных из вашего API
        // Преобразование даты в удобочитаемый формат
        const formattedApplicationsData = applicationsData.map(
          (application) => ({
            ...application,
            date: new Date(application.date).toLocaleDateString("ru-RU"),
            car: {
              id: application.car.id,
              plate_number: application.car.plate_number,
              model: application.car.model,
            },
          })
        );

        setDataApplications(formattedApplicationsData);
      } catch (error) {
        console.error("Error fetching applications data:", error);
      }
    }
    fetchDataApplications();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteApplication(id); // Call API to delete application
      setDataApplications((prevData) =>
        prevData.filter((app) => app.id !== id)
      );
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <ApplicationsDataTable
      columns={columns}
      data={dataApplications.map((application) => ({
        ...application,
        onDelete: handleDelete,
      }))}
    />
  );
}
