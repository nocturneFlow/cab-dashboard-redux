"use client";

import GetAllCashierAdmin from "../components/columns/cashierAdmin";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Table } from "lucide-react";

export default function CashierAdminTablePage() {
  return (
    <>
      <div>
        <Card className="h-[50rem]">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <Table />
              Таблица кассы администратора
            </CardTitle>
            <CardDescription>
              Вся касса находится в этой таблице.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GetAllCashierAdmin />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
