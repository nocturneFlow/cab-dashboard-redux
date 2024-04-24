"use client";

import GetAllReport from "../components/columns/reportT";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Table } from "lucide-react";

export default function ReportTablePage() {
  return (
    <>
      <div>
        <Card className="h-[50rem]">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <Table />
              Таблица отчетов
            </CardTitle>
            <CardDescription>
              Все отчеты находится в этой таблице.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GetAllReport />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
