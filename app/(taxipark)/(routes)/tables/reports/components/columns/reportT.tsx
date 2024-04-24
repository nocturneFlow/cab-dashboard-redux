"use client";

import { ColumnDef } from "@tanstack/react-table";
import React, { useState, useEffect } from "react";
import { ReportDataTable } from "@/components/tables/reportT/data-table";
import { fetchReportData } from "../../(reportT)/action/fetchReportData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTableColumnHeader } from "@/components/tables/reportT/data-table-column-header";
import { Skeleton } from "@/components/ui/skeleton";

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

import { PanelBottomOpen } from "lucide-react";

export interface getCarDetailModel {
  id: number;
  plate_number: string;
  total_cash_from_yandex: string;
  total_cashless_from_yandex: string;
  total_from_yandex: string;
  total_applications: string;
  total_hours_online: string;
  yandex_commission: string;
  total_cash_payments: string;
  total_cashless_payments: string;
  total_salary: string;
  total_bonus_from_company: string;
  total_salary_bonus: string;
  total_gsm: string;
  total_other: string;
  total_expense: string;
  fixed_costs: string;
  total_variable_costs: string;
}

export const columns: ColumnDef<getCarDetailModel>[] = [
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
    accessorKey: "total_applications",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Кол-во заявок" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("total_applications")}</div>
    ),
  },
  {
    accessorKey: "total_hours_online",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Время на линии" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("total_hours_online")}</div>
    ),
  },
  {
    accessorKey: "total_yandex_commission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Комиссия Яндекс" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">
        {row.getValue("total_yandex_commission")}
      </div>
    ),
  },
  {
    accessorKey: "total_fixed_costs",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GP (постоянные расходы)" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("total_fixed_costs")}</div>
    ),
  },
  {
    accessorKey: "total_variable_costs",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GP (переменные расходы)" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("total_variable_costs")}</div>
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
                  <SheetDescription className="p-20 ">
                    <Accordion type="multiple">
                      <AccordionItem value="item-1">
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
                                  {row.original.total_cash_from_yandex}
                                </TableCell>
                                <TableCell>
                                  {row.original.total_cashless_from_yandex}
                                </TableCell>
                                <TableCell className="text-right">
                                  {row.original.total_from_yandex}
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
                                <TableHead className="text-right">
                                  Итого
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  {row.original.total_cash_payments}
                                </TableCell>
                                <TableCell>
                                  {row.original.total_cashless_payments}
                                </TableCell>
                                <TableCell className="text-right">
                                  {row.original.total_salary}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-3">
                        <AccordionTrigger>
                          <SheetTitle>Фонд оплаты труда</SheetTitle>
                        </AccordionTrigger>
                        <AccordionContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>ЗП Начислено</TableHead>
                                <TableHead>Оклад</TableHead>
                                <TableHead className="text-right">
                                  Бонус от компании
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell>
                                  {row.original.total_salary_bonus}
                                </TableCell>
                                <TableCell>
                                  {row.original.total_salary}
                                </TableCell>
                                <TableCell className="text-right">
                                  {row.original.total_bonus_from_company}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="item-4">
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
                                <TableCell>{row.original.total_gsm}</TableCell>
                                <TableCell>
                                  {row.original.total_other}
                                </TableCell>
                                <TableCell className="text-right">
                                  {row.original.total_expense}
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

export default function GetAllReport() {
  const [dataReport, setDataReport] = React.useState<getCarDetailModel[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function fetchDataReport() {
      try {
        const reportData = await fetchReportData();
        console.log("Received data:", reportData);
        setDataReport(reportData);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    }
    fetchDataReport();
  }, []);

  return (
    <ReportDataTable
      columns={columns}
      data={dataReport.map((report) => ({
        ...report,
      }))}
    />
  );
}
