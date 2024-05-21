"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useDateRange } from "@/contexts/DateRangeContext"; // Импортируем хук для использования дат из контекста
import { ApplicationsDataTable } from "@/components/tables/applications/data-table";
import { fetchApplicationsData } from "../../(applications)/action/fetchApplicationData";
import { deleteApplication } from "@/components/modals/delete-application";
import { ColumnDef } from "@tanstack/react-table";
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
import { Card } from "@/components/ui/card";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PanelBottomOpen } from "lucide-react";
import { EditApplicationModal } from "@/components/modals/edit-application-modal";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTableColumnHeader } from "@/components/tables/applications/data-table-column-header";
import { Edit, Trash2, Delete } from "@geist-ui/icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Менеджер" />
    ),
    cell: ({ row }) => {
      const { firstName, lastName } = row.original.manager;
      const managerName = `${firstName} ${lastName}`;
      return <div className="text-left font-medium">{managerName}</div>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата" />
    ),
    cell: ({ row }) => {
      const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });

      const date = new Date(row.original.date);
      return dateFormatter.format(date);
    },
  },
  {
    accessorKey: "driver",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Водитель" />
    ),
    cell: ({ row }) => {
      const { firstName, lastName } = row.original.driver;
      const driverName = `${firstName} ${lastName}`;
      return <div className="text-left font-medium">{driverName}</div>;
    },
  },
  {
    accessorKey: "car.plate_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Номер Машины" />
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("car.plate_number")}</div>
    ),
  },
  {
    accessorKey: "schedule.schedule",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="График" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("schedule.schedule")}</div>
    ),
  },
  {
    accessorKey: "time_on_line",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Время на линии" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("time_on_line")}</div>
    ),
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
                  <SheetDescription className="p-20">
                    <Accordion type="multiple">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          <SheetTitle>Яндекс</SheetTitle>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>
                                  <strong>Наличными</strong>
                                </TableHead>
                                <TableHead>
                                  <strong>Безнал</strong>
                                </TableHead>
                                <TableHead className="text-right">
                                  <strong>Итого</strong>
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
                                <TableHead>
                                  <strong>Наличными</strong>
                                </TableHead>
                                <TableHead>
                                  <strong>Kaspi</strong>
                                </TableHead>
                                <TableHead>
                                  <strong>Итого</strong>
                                </TableHead>
                                <TableHead className="text-right">
                                  <strong>Разница</strong>
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
                                <TableHead>
                                  <strong>Газ</strong>
                                </TableHead>
                                <TableHead>
                                  <strong>Прочие расходы</strong>
                                </TableHead>
                                <TableHead>
                                  <strong>Статья расходов</strong>
                                </TableHead>
                                <TableHead>
                                  <strong>Аванс</strong>
                                </TableHead>
                                <TableHead className="text-right">
                                  <strong>Итого расходы с нал</strong>
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
                      <AccordionItem value="item-4">
                        <AccordionTrigger>
                          <SheetTitle>Фонд оплаты труда</SheetTitle>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>
                                  <strong>Итого оклад+бонус</strong>
                                </TableHead>
                                <TableHead>
                                  <strong>Оклад</strong>
                                </TableHead>
                                <TableHead>
                                  <strong>Бонус</strong>
                                </TableHead>
                                <TableHead className="text-right">
                                  <strong>Бонус от компании</strong>
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell></TableCell>
                                <TableCell>
                                  {row.original.payroll.salary}
                                </TableCell>
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
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="sm" className="hidden h-8 lg:flex">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-center">
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <Edit className="w-4 h-4 mr-2" />
                  <span>Изменить</span>
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuItem
                onClick={() => row.original.onDelete(row.original.id)}
                className="flex"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                <span>Удалить</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Изменить заявку</DialogTitle>
              <DialogDescription>
                Внесите изменения в заявку и нажмите &quot;Подтвердить&quot;
              </DialogDescription>
            </DialogHeader>
            <EditApplicationModal data={row.original} />
          </DialogContent>
        </Dialog>
      );
    },
  },
];

export default function GetAllApplications() {
  const [dataApplications, setDataApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const dateRange = useSelector((state: RootState) => state.dateRange); // Получаем диапазон дат из Redux

  useEffect(() => {
    async function fetchDataApplications() {
      if (dateRange.from && dateRange.to) {
        try {
          const startDate = dateRange.from.toISOString().split("T")[0];
          const endDate = dateRange.to.toISOString().split("T")[0];
          const applicationsData = await fetchApplicationsData(
            startDate,
            endDate
          );
          setDataApplications(applicationsData);
        } catch (error) {
          console.error("Error fetching applications data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("Date range is not fully specified.");
        setLoading(false);
      }
    }
    fetchDataApplications();
  }, [dateRange.from, dateRange.to]);

  const handleDelete = async (id: number) => {
    try {
      await deleteApplication(id);
      setDataApplications((prevData) =>
        prevData.filter((app) => app.id !== id)
      );
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <>
      {loading && (
        <>
          <div className="flex items-center justify-between">
            <Skeleton className="w-[250px] h-8" />
            <div className="flex space-x-2">
              <Skeleton className="w-[150.39px] h-8 mt-6" />
              <Skeleton className="w-[217.73px] h-8 mt-6" />
              <Skeleton className="w-[110.08px] h-8 mt-6" />
            </div>
          </div>
          <div className="mt-5">
            <Card className="h-full mt-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    {[...Array(6)].map((_, index) => (
                      <TableHead key={index}>
                        <Skeleton className="w-24 h-5" />
                      </TableHead>
                    ))}
                    <TableHead> </TableHead>
                    <TableHead> </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(10)].map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {[...Array(6)].map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <Skeleton className="w-27 h-3" />
                        </TableCell>
                      ))}
                      <TableCell>
                        <Skeleton className="w-5 h-5" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="w-5 h-5" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            <div className="flex items-center justify-end gap-2">
              <Skeleton className="w-[131px] h-8 mt-4" />
              <Skeleton className="w-[70px] h-8 mt-4" />
              <div className="flex mx-8">
                <Skeleton className="w-[150px] h-8 mt-4" />
              </div>
              <div className="flex space-x-1">
                <Skeleton className="w-8 h-8 mt-4" />
                <Skeleton className="w-8 h-8 mt-4" />
                <Skeleton className="w-8 h-8 mt-4" />
                <Skeleton className="w-8 h-8 mt-4" />
              </div>
            </div>
          </div>
        </>
      )}

      {!loading && (
        <ApplicationsDataTable
          columns={columns}
          data={dataApplications.map((application) => ({
            ...application,
            onDelete: handleDelete,
          }))}
        />
      )}
    </>
  );
}
