"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GetAllCars, { Cars, CarsColumns } from "../components/columns/cars";
import { AddCarModal } from "@/components/modals/add-car-modal";
import { AddDriverModal } from "@/components/modals/add-driver-modal";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

export default function CarsTablePage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title="Таблицы | Машины"
            description="Управляйте своими таблицами"
          />
          <div className="space-x-4">
            {isClient && <AddCarModal />}
            {isClient && <AddDriverModal />}
          </div>
        </div>
        <Separator />
        <div className="flex items-center justify-center w-full pt-5">
          <Tabs defaultValue="cars" className="w-5/6">
            <TabsContent value="cars">
              <div className="">
                <GetAllCars />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
