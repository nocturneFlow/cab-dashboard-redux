"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDateRange } from "@/contexts/DateRangeContext";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import { fetchSalariesCountPenaltiesData } from "../../(salaries)/action/fetchSalariesCountPenaltiesData";
import { SalariesDataTable } from "@/components/tables/salaries/data-table";
import { DataTableColumnHeader } from "@/components/tables/applications/data-table-column-header";

export interface Car {
  id: number;
  plate_number: string;
  model: string;
}

export type SalariesCountPenalties = {
  id: number;
  record_date: string;
  document_date: string;
  plate_number: Car;
  schedule: {
    id: number;
    schedule: string;
  };
  document_number: number;
  fine_amount: number;
  link: string;
};

export const columns: ColumnDef<SalariesCountPenalties>[] = [
  {
    accessorKey: "record_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата записи" />
    ),
    cell: ({ row }) => {
      const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });

      const date = new Date(row.original.record_date);
      return dateFormatter.format(date);
    },
  },
  {
    accessorKey: "document_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата документа" />
    ),
    cell: ({ row }) => {
      const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });

      const date = new Date(row.original.document_date);
      return dateFormatter.format(date);
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
      <DataTableColumnHeader column={column} title="Смена" />
    ),
    cell: ({ row }) => (
      <div className="lowercase ">{row.getValue("schedule.schedule")}</div>
    ),
  },
  {
    accessorKey: "document_number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Номер документа" />
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("document_number")}</div>
    ),
  },
  {
    accessorKey: "fine_amount",
    // header: "Сумма",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Сумма" />
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("fine_amount")}</div>
    ),
  },
  {
    accessorKey: "link",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ссылка" />
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("link")}</div>,
  },
];

// export default function GetAllSalariesCountPenalties() {
//   const [dataSalariesCountPenalties, setDataSalariesCountPenalties] =
//     React.useState<SalariesCountPenalties[]>([]);

//   React.useEffect(() => {
//     async function fetchDataSalariesCountPenalties() {
//       try {
//         const salariesCountPenaltiesData =
//           await fetchSalariesCountPenaltiesData(); // Получение данных из вашего API
//         console.log(salariesCountPenaltiesData);

//         // Преобразование даты в удобочитаемый формат
//         const formattedSalariesCountPenaltiesData =
//           salariesCountPenaltiesData.map((salariesCountPenalties) => ({
//             ...salariesCountPenalties,
//             recDate: new Date(
//               salariesCountPenalties.SalariesCountPenaltiesRecDate
//             ).toLocaleDateString("ru-RU"),
//             documentDate: new Date(
//               salariesCountPenalties.SalariesCountPenaltiesDocumentDate
//             ).toLocaleDateString("ru-RU"),

//             car: {
//               id: salariesCountPenalties.SalariesCountPenaltiesCarNumber.id,
//               plate_number:
//                 salariesCountPenalties.SalariesCountPenaltiesCarNumber
//                   .plate_number,
//               model:
//                 salariesCountPenalties.SalariesCountPenaltiesCarNumber.model,
//             },
//           }));

//         setDataSalariesCountPenalties(formattedSalariesCountPenaltiesData);
//       } catch (error) {
//         console.error("Error fetching SalariesCountPenalties data:", error);
//       }
//     }
//     fetchDataSalariesCountPenalties();
//   }, []);

//   return (
//     <SalariesDataTable
//       columns={SalariesCountPenaltiesColumns}
//       data={dataSalariesCountPenalties.map((salariesCountPenalties) => ({
//         ...salariesCountPenalties,
//       }))}
//     />
//   );
// }

export default function GetAllSalariesCounPenalties() {
  const [dataSalariesCounPenalties, setDataSalariesCounPenalties] = useState<
    SalariesCountPenalties[]
  >([]);

  const [loading, setLoading] = useState(true);
  const { dateRange } = useDateRange();

  useEffect(() => {
    async function fetchDataSalariesCounPenalties() {
      if (dateRange && dateRange.from && dateRange.to) {
        try {
          const startDate = dateRange.from.toISOString().split("T")[0];
          const endDate = dateRange.to.toISOString().split("T")[0];
          const salariesCounPenaltiesData =
            await fetchSalariesCountPenaltiesData(startDate, endDate);
          if (Array.isArray(salariesCounPenaltiesData)) {
            console.log("Fetched data:", salariesCounPenaltiesData);

            setDataSalariesCounPenalties(salariesCounPenaltiesData);
          } else {
            console.error(
              "Received data is not an array:",
              salariesCounPenaltiesData
            );
          }
        } catch (error) {
          console.error("Error fetching salariesCounPenalties data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("Date range is not fully specified.");
        setLoading(false);
      }
    }
    fetchDataSalariesCounPenalties();
  }, [dateRange]);

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
        <SalariesDataTable
          columns={columns}
          data={dataSalariesCounPenalties.map((salariesCounPenalties) => ({
            ...salariesCounPenalties,
          }))}
        />
      )}
    </>
  );
}
