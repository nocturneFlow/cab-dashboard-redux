"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GetAllExpenses, {
  Expenses,
  ExpensesColumns,
} from "../components/columns/expenses";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

export default function ExpensesTablePage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title="Таблицы | Расходы"
            description="Управляйте своими таблицами"
          />
        </div>

        <Separator />
        <div className="flex items-center justify-center w-full pt-5">
          <Tabs defaultValue="expenses" className="w-5/6">
            <TabsContent value="expenses">
              <div className="">
                <GetAllExpenses />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
