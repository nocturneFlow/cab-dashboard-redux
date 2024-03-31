"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Costs, costsColumns } from "../components/columns/costs";
import GetAllApplications from "../components/columns/applications";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { AddManagerModal } from "@/components/modals/add-manager-modal";
import { useEffect, useState } from "react";

export default function ApplicationsPage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title="Таблицы | Заявки"
            description="Управляйте своими таблицами"
          />
        </div>
        <Separator />
        <div className="flex items-center justify-center w-full pt-5">
          <Tabs defaultValue="applications" className="w-5/6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="applications">Заявки</TabsTrigger>
              <TabsTrigger value="costs">Расходы</TabsTrigger>
            </TabsList>
            <TabsContent value="applications">
              <div className="">
                <GetAllApplications />
              </div>
            </TabsContent>
            <TabsContent value="costs">
              <div className="">
                {/* <CostsDataTable columns={costsColumns} data={dataCosts} /> */}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
