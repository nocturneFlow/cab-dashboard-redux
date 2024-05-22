"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/tables/applications/data-table-view-options";
import AddApplicationModal from "../../modals/add-application-modal";
import { DatePickerWithRange } from "../../ui/date-range-picker";

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
        <Input
          placeholder="Фильтруйте задачи..."
          value={
            (table.getColumn("time_on_line")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("time_on_line")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
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
        <AddApplicationModal />
        <DatePickerWithRange />
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
