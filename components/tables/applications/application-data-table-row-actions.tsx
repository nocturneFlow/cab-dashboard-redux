import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { Eraser, MoreHorizontal, PenLine } from "lucide-react";

interface ApplicationDataTableRowActionsProps<TData> {
  row: Row<TData>;
  onEdit: (value: TData) => void;
  onDelete: (value: TData) => void;
}

const ApplicationDataTableRowActions = <TData,>({
  row,
  onEdit,
  onDelete,
}: ApplicationDataTableRowActionsProps<TData>) => {
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
        <DropdownMenuItem onClick={() => onEdit(row.original)}>
          <PenLine className="w-4 h-4" />
          <span className="pl-2">Изменить</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(row.original)}>
          <Eraser className="w-4 h-4" />
          <span className="pl-2">Удалить</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ApplicationDataTableRowActions;
