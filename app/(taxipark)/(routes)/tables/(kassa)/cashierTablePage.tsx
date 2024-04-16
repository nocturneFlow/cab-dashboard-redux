import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Table } from "lucide-react";

export default function CashierTablePage() {
  return (
    <>
      <div>
        <Card className="h-[50rem] ">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <Table />
              Таблица кассы менеджера
            </CardTitle>
            <CardDescription>
              Все операции кассы менеджера находятся в этой таблице. Вы можете
              просмотреть, отредактировать или удалить операцию.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="cash">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="cash">Наличка</TabsTrigger>
                <TabsTrigger value="kaspi">Kaspi</TabsTrigger>
                <TabsTrigger value="check">Проверка</TabsTrigger>
              </TabsList>
              <TabsContent value="cash"></TabsContent>
              <TabsContent value="kaspi"></TabsContent>
              <TabsContent value="check"></TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
