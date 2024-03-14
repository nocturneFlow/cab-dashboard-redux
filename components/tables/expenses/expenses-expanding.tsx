"use client";

import React from "react";

import {
  ExpandedState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getExpandedRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { makeData, Person } from "./temp/makeData";

function ExpensesExpanding() {
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        header: "Наличка",
        columns: [
          {
            accessorKey: "firstName",
            header: ({ table }) => <>Газ/Наличка</>,
            cell: ({ row, getValue }) => (
              <div
                style={{
                  paddingLeft: `${row.depth * 5}rem`,
                }}
              >
                фвцфв
              </div>
            ),
          },
          {
            accessorFn: (row) => row.lastName,
            id: "ExpensesKaspi",
            // cell: (info) => info.getValue(),
            cell: "awdad",
            header: () => <span>Other Наличка</span>,
          },
        ],
      },
      {
        header: "Kaspi",
        columns: [
          {
            accessorKey: "firstName",
            header: ({ table }) => <>Газ/Kaspi</>,
            cell: ({ row, getValue }) => (
              <div
                style={{
                  paddingLeft: `${row.depth * 5}rem`,
                }}
              >
                adwad
              </div>
            ),
          },
          {
            accessorFn: (row) => row.lastName,
            id: "ExpensesKaspi",
            // cell: (info) => info.getValue(),
            cell: "awdad",
            header: () => <span>Other Kaspi</span>,
          },
        ],
      },
    ],
    []
  );

  const [data] = React.useState(() => makeData(2, 5, 3));

  const [expanded, setExpanded] = React.useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: true,
  });

  return (
    <div className="p-2">
      <div className="h-2" />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanFilter() ? <div></div> : null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-2" />
    </div>
  );
}

export default ExpensesExpanding;
