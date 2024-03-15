"use client";

import { Edit, Eraser, MoreHorizontal, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Application } from "./columns/applications";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EditApplicationModal } from "@/components/modals/edit-application-modal";

interface CellActionProps {
  data: Application;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const onCopy = (id: number) => {
    navigator.clipboard.writeText(id.toString());
    toast({
      description: "ID скопирован.",
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Действие</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem onClick={handleOpenModal}></DropdownMenuItem> */}
        <EditApplicationModal
          // isOpen={isModalOpen}
          // onClose={handleCloseModal}
          data={data}
        />
        <DropdownMenuItem onClick={() => data.onDelete(data.id)}>
          <Eraser className="mr-2 w-4 h-4" />
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
