import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Expenses, ExpensesColumns } from "../components/columns/expenses";
import { ExpensesDataTable } from "@/components/tables/expenses/expenses-data-table-pagination";
// import { ExpensesExpandingDataTable } from "@/components/tables/expenses/expenses-expanding-data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

async function getDataExpenses(): Promise<Expenses[]> {
  return [
    {
      id: "Expenses001",
      ExpensesDateOfIssue: "11.11.2023",
      ExpensesCarNumber: "606ACX11",
      ExpensesTaxiPark: "Влад Астана",
      ExpensesManager: "Дархан",
      ExpensesDriverFullName: "Насиболла Толеген",
      ExpensesObjectOfExpenditure: "",
    },
    {
      id: "Expenses002",
      ExpensesDateOfIssue: "01.12.2023",
      ExpensesCarNumber: "546ACX11",
      ExpensesTaxiPark: "Влад Астана",
      ExpensesManager: "Дархан",
      ExpensesDriverFullName: "Нуртуганов Жандос",
      ExpensesObjectOfExpenditure: "Бензин",
    },
  ];
}

export default async function ExpensesPage() {
  const dataExpenses = await getDataExpenses();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title="Таблицы | Расходы"
            description="Управляйте своими таблицами"
          />
        </div>
        
        <Separator />
        <div className="flex items-center justify-center w-full pt-5">
          <Tabs defaultValue="expenses" className="w-5/6">
            <TabsContent value="expenses">
              <div className="">
                <ExpensesDataTable
                  columns={ExpensesColumns}
                  data={dataExpenses}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
