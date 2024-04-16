"use client";

import GetAllApplications from "../components/columns/applications";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Table } from "lucide-react";

export default function ApplicationsTablePage() {
  return (
    <>
      <div>
        <Card className="h-[50rem]">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <Table />
              Таблица заявок
            </CardTitle>
            <CardDescription>
              Все заявки находятся в этой таблице. Вы можете просмотреть,
              отредактировать или удалить заявку.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GetAllApplications />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
