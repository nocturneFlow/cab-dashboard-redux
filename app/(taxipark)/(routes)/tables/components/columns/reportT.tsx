"use client";

import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { ReportsDataTable } from "@/components/tables/reports/reports-data-table-pagination";
import { fetchReportData } from "../../(reportT)/action/fetchReportData";
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

export interface Report {
  id: number;
  car: Car;
  payment: Payment;
  yandexData: YandexData;
  payroll: Payroll;
  applicationsAmount: number;
  time_on_line: number;
  yandexCommission: number;
  fixedCosts: number;
  variableCosts: number;
  expenseApl: ExpenseApl;
}

export const ReportColumns: ColumnDef<Report>[] = [
  {
    accessorKey: "car.plate_number",
    header: "Номер Машины",
  },
  {
    accessorKey: "applicationsAmount",
    header: "Кол-во заявок",
  },
  {
    accessorKey: "time_on_line",
    header: "Кол-во часов на линии",
  },
  {
    accessorKey: "yandexCommission",
    header: "Комиссия Яндекс",
  },
  {
    accessorKey: "fixedCosts",
    header: "GP (постоянные расходы)",
  },
  {
    accessorKey: "variableCosts",
    header: "GP (переменные расходы)",
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
                      {/* <AccordionItem value="item-1">
                          <AccordionTrigger>
                            <SheetTitle>В программе яндекс Такси</SheetTitle>
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
                        </AccordionItem> */}

                      {/* <AccordionItem value="item-2">
                          <AccordionTrigger>
                            <SheetTitle>Касса</SheetTitle>
                          </AccordionTrigger>
                          <AccordionContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Наличными</TableHead>
                                  <TableHead>Kaspi</TableHead>
                                  <TableHead className="text-right">Итого</TableHead>
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
                                  <TableCell className="text-right">
                                    {row.original.payment.amount_cash +
                                      row.original.payment.amount_cashless}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </AccordionContent>
                        </AccordionItem> */}

                      {/* <AccordionItem value="item-3">
                          <AccordionTrigger>
                            <SheetTitle>Фонд оплаты труда</SheetTitle>
                          </AccordionTrigger>
                          <AccordionContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>ЗП Начислено</TableHead>
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
                        </AccordionItem> */}

                      {/* <AccordionItem value="item-4">
                          <AccordionTrigger>
                            <SheetTitle>Расходы постоянные</SheetTitle>
                          </AccordionTrigger>
                          <AccordionContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>ГСМ</TableHead>
                                  <TableHead>Прочие расходы</TableHead>
                                  <TableHead className="text-right">
                                    Итого
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
                                  <TableCell className="text-right">
                                    {row.original.expenseApl.gas +
                                      row.original.expenseApl.other +
                                      row.original.expenseApl.advance}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </AccordionContent>
                        </AccordionItem> */}

                      {/* <AccordionItem value="item-5">
                          <AccordionTrigger>
                            <SheetTitle>Расходы переменные</SheetTitle>
                          </AccordionTrigger>
                          <AccordionContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Запчасти</TableHead>
                                  <TableHead>Услуги СТО</TableHead>
                                  <TableHead className="text-right">
                                    Итого
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
                                  <TableCell className="text-right">
                                    {row.original.expenseApl.gas +
                                      row.original.expenseApl.other +
                                      row.original.expenseApl.advance}
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </AccordionContent>
                        </AccordionItem> */}
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

export default function GetAllReport() {
  const [dataReport, setDataReport] = React.useState<Report[]>([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [currentReport, setCurrentReport] =
  //   useState<Report | null>(null);
  // const [updatedData, setUpdatedData] = useState<Report | null>(null);

  // // ...

  // const handleOpenModal = (car: Report) => {
  //   setCurrentReport(car);
  //   setIsModalOpen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  // };

  React.useEffect(() => {
    async function fetchDataReport() {
      try {
        const ReportData = await fetchReportData(); // Получение данных из вашего API

        // Преобразование даты в удобочитаемый формат
        const formattedReportData = ReportData.map((report) => ({
          ...report,
          car: {
            id: report.car.id,
            plate_number: report.car.plate_number,
            model: report.car.model,
          },
        }));

        setDataReport(formattedReportData);
      } catch (error) {
        console.error("Error fetching Report data:", error);
      }
    }
    fetchDataReport();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      // await deleteCars(id); // Call API to delete application
      setDataReport((prevData) => prevData.filter((car) => car.id !== id));
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <ReportsDataTable
      columns={ReportColumns}
      data={dataReport.map((car) => ({
        ...car,
        onDelete: handleDelete,
      }))}
      // onEdit={handleOpenModal}
    />
  );
}
