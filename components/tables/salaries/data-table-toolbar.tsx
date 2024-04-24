// "use client"

// import { Cross2Icon } from "@radix-ui/react-icons"
// import { Table } from "@tanstack/react-table"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { DataTableViewOptions } from "./data-table-view-options"

// import { priorities } from "./priorities"
// import { DataTableFacetedFilter } from "./data-table-faceted-filter"

// interface DataTableToolbarProps<TData> {
//   table: Table<TData>
// }

// export function DataTableToolbar<TData>({
//   table,
// }: DataTableToolbarProps<TData>) {
//   const isFiltered = table.getState().columnFilters.length > 0

//   return (
//     <div className="flex items-center justify-between">
//       <div className="flex flex-1 items-center space-x-2">
//         <Input
//           placeholder="Filter tasks..."
//           value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
//           onChange={(event) =>
//             table.getColumn("title")?.setFilterValue(event.target.value)
//           }
//           className="h-8 w-[150px] lg:w-[250px]"
//         />
//         {/* {table.getColumn("status") && (
//           <DataTableFacetedFilter
//             column={table.getColumn("status")}
//             title="Status"
//             options={statuses}
//           />
//         )} */}
//         {table.getColumn("priority") && (
//           <DataTableFacetedFilter
//             column={table.getColumn("priority")}
//             title="Priority"
//             options={priorities}
//           />
//         )}
//         {isFiltered && (
//           <Button
//             variant="ghost"
//             onClick={() => table.resetColumnFilters()}
//             className="h-8 px-2 lg:px-3"
//           >
//             Reset
//             <Cross2Icon className="ml-2 h-4 w-4" />
//           </Button>
//         )}
//       </div>
//       <DataTableViewOptions table={table} />
//     </div>
//   )
// }
"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Input as InputNext } from "@nextui-org/react";
import { DataTableViewOptions } from "@/components/tables/salaries/data-table-view-options";
import { DatePickerWithRange } from "../../ui/date-range-picker";

import { Search } from "@geist-ui/icons";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <InputNext
          variant="bordered"
          placeholder="Фильтруйте задачи..."
          value={
            (table.getColumn("time_on_line")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("time_on_line")?.setFilterValue(event.target.value)
          }
          className="w-[150px] lg:w-[250px]"
          startContent={<Search className="w-4 h-4" />}
          size="sm"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Сбросить
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex flex-2 items-center space-x-2">
        <DatePickerWithRange />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
