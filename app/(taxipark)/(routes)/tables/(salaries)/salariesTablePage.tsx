import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GetAllSalariesCountAccurals from "../components/columns/salaryCountAccurals";
import GetAllSalariesCountPaidOff from "../components/columns/salaryCountPaidOff";
import GetAllSalariesCountPenalties from "../components/columns/salaryCountPenalties";

import GetAllSalariesCashier from "../components/columns/salariesCashier";
import GetAllSalariesSalaries from "../components/columns/salariesSalaries";
import { Table } from "lucide-react";

export default function SalariesTablePage() {
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
            <Tabs defaultValue="salaryCount">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="salaryCount">ЗП | Считалка</TabsTrigger>
                <TabsTrigger value="salaryCashier">ЗП | Касса</TabsTrigger>
                <TabsTrigger value="salarySalary">Зарплата</TabsTrigger>
              </TabsList>

              <TabsContent value="salaryCount">
                <div className="pt-5">
                  <Tabs className="w-full" defaultValue="salaryCountAccruals">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="salaryCountAccruals">
                        Начисления
                      </TabsTrigger>
                      <TabsTrigger value="salaryCountPaidOff">
                        Выплачено
                      </TabsTrigger>
                      <TabsTrigger value="salaryCountPenalties">
                        Штрафы
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="salaryCountAccruals">
                      <div className="">
                        <GetAllSalariesCountAccurals />
                      </div>
                    </TabsContent>
                    <TabsContent value="salaryCountPaidOff">
                      <div className="">
                        <GetAllSalariesCountPaidOff />
                      </div>
                    </TabsContent>
                    <TabsContent value="salaryCountPenalties">
                      <div className="">
                        <GetAllSalariesCountPenalties />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </TabsContent>

              <TabsContent value="salaryCashier">
                <div className="pt-5">
                  <GetAllSalariesCashier />
                </div>
              </TabsContent>

              <TabsContent value="salarySalary">
                <div className="pt-5">
                  <GetAllSalariesSalaries />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
