"use client";

import GetAllCars from "../components/columns/cars";
import { AddCarModal } from "@/components/modals/add-car-modal";
import { AddDriverModal } from "@/components/modals/add-driver-modal";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table } from "lucide-react";

export default function CarsTablePage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div>
        <Card className="h-[50rem]">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <Table />
              Таблица машин
            </CardTitle>
            <CardDescription>
              Все заявки находятся в этой таблице. Вы можете просмотреть,
              отредактировать или удалить заявку.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GetAllCars />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
