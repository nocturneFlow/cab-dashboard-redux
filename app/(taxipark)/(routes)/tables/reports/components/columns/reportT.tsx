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

interface CarDetail {
  plate_number: string;
  total_applications: number;
  total_hours_online: number;
  total_cash_from_yandex: number;
  total_cashless_from_yandex: number;
  total_from_yandex: number;
  total_yandex_commission: number;
  total_cash_payments: number;
  total_cashless_payments: number;
  total_salary: number;
  total_bonus_from_company: number;
  total_salary_bonus: number;
  total_gsm: number;
  total_other: number;
  total_expense: number;
  total_fixed_costs: number;
  total_variable_costs: number;
}

interface APIResponse {
  start_date: string;
  end_date: string;
  // остальные поля на верхнем уровне...
  getCarDetailModel: CarDetail[];
}

export const columns: ColumnDef<APIResponse>[] = [
  {
    accessorKey: "plate_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Номер Машины" />
    ),
    cell: ({ row }) => (
      <div className="lowercase">
        {row.original.getCarDetailModel[row.index].plate_number}
      </div>
    ),
  },
  {
    accessorKey: "total_applications",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Кол-во заявок" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">
        {row.original.getCarDetailModel[row.index].total_applications}
      </div>
    ),
  },
  {
    accessorKey: "total_hours_online",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Время на линии" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">
        {row.original.getCarDetailModel[row.index].total_hours_online}
      </div>
    ),
  },
  {
    accessorKey: "total_yandex_commission",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Комиссия Яндекс" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">
        {row.original.getCarDetailModel[row.index].total_yandex_commission}
      </div>
    ),
  },
  {
    accessorKey: "total_fixed_costs",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GP (постоянные расходы)" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">
        {row.original.getCarDetailModel[row.index].total_fixed_costs}
      </div>
    ),
  },
  {
    accessorKey: "total_variable_costs",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="GP (переменные расходы)" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">
        {row.original.getCarDetailModel[row.index].total_variable_costs}
      </div>
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
                                  {
                                    row.original.getCarDetailModel[row.index]
                                      .total_cash_from_yandex
                                  }
                                </TableCell>
                                <TableCell>
                                  {
                                    row.original.getCarDetailModel[row.index]
                                      .total_cashless_from_yandex
                                  }
                                </TableCell>
                                <TableCell className="text-right">
                                  {
                                    row.original.getCarDetailModel[row.index]
                                      .total_from_yandex
                                  }
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
                                  {
                                    row.original.getCarDetailModel[row.index]
                                      .total_cash_payments
                                  }
                                </TableCell>
                                <TableCell>
                                  {
                                    row.original.getCarDetailModel[row.index]
                                      .total_cashless_payments
                                  }
                                </TableCell>
                                <TableCell className="text-right">
                                  {/* {row.original.total_salary} */}
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
                                <TableCell>
                                  {
                                    row.original.getCarDetailModel[row.index]
                                      .total_gsm
                                  }
                                </TableCell>
                                <TableCell>
                                  {
                                    row.original.getCarDetailModel[row.index]
                                      .total_other
                                  }
                                </TableCell>
                                <TableCell className="text-right">
                                  {
                                    row.original.getCarDetailModel[row.index]
                                      .total_expense
                                  }
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
  const [dataReport, setDataReport] = React.useState<APIResponse[]>([]);
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
