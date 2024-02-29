"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export const TableClient = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Таблицы" description="Управляйте своими таблицами" />
      </div>
      <Separator />
    </>
  );
};
