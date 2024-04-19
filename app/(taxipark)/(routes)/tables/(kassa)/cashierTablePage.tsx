import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GetAllCash from "../components/columns/managersCashier";
import { Table } from "lucide-react";

export default function CashierTablePage() {
  return (
    <>
      <div>
        <Card className="h-auto ">
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
            <Tabs defaultValue="kassa">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="kassa">Касса</TabsTrigger>
                <TabsTrigger value="check">Проверка</TabsTrigger>
              </TabsList>
              <TabsContent value="kassa">
                <GetAllCash />
              </TabsContent>
              <TabsContent value="check"></TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
