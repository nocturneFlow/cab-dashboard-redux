import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GetAllSalariesCountAccurals from "../components/columns/salaryCountAccurals";
import GetAllSalariesCountPaidOff from "../components/columns/salaryCountPaidOff";
import GetAllSalariesCountPenalties from "../components/columns/salaryCountPenalties";

import GetAllSalariesCashier from "../components/columns/salariesCashier";
import GetAllSalariesSalaries from "../components/columns/salariesSalaries";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export default function SalariesTablePage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title="Таблицы | Зарплаты"
            description="Управляйте своими таблицами"
          />
        </div>
        <Separator />
        <div className="flex items-center justify-center w-full pt-5">
          <Tabs defaultValue="salaryCount" className="w-5/6">
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
        </div>{" "}
      </div>
    </div>
  );
}
