import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import GetAllCashReconciliation, {
//   CashReconciliation,
//   CashReconciliationColumns,
// } from "../components/columns/cashReconciliation";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export default async function CashReconciliationPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title="Таблицы | Сверка Кассы"
            description="Управляйте своими таблицами"
          />
        </div>
        <Separator />
        <div className="flex items-center justify-center w-full pt-5">
          <Tabs defaultValue="applications" className="w-5/6">
            <TabsContent value="applications">
              <div className="">{/* <GetAllCashReconciliation /> */}</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
