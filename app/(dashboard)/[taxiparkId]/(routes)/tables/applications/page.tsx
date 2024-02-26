import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Costs, costsColumns } from "../components/columns/costs";
import { Applications, columns } from "../components/columns/applications";
import { ApplicationsDataTable } from "@/components/tables/applications/applications-data-table-pagination";
import { CostsDataTable } from "@/components/tables/applications/costs-data-table";
import { TableClient } from "../components/client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

async function getData(): Promise<Applications[]> {
  return [
    {
      id: "asdaasd",
      manager: "Лаура",
      taxipark: "Влад Астана",
      date: "03.06.2023",
      time: "9:00:00",
      fullname: "Джон Доу Иванович",
      carNumber: "606ACX02",
      schedule: "день",
      lineTime: 10,
    },
    {
      id: "728ed52f",
      manager: "Ростик",
      taxipark: "Влад Астана",
      date: "10.06.2023",
      time: "10:15:00",
      fullname: "Ахмет Байтурсынулы",
      carNumber: "123ABC01",
      schedule: "ночь",
      lineTime: 12,
    },
  ];
}

async function getDataOne(): Promise<Costs[]> {
  return [
    {
      id: "728ed52f",
      date: "11.11.2023",
      carNumber: "606ACX11",
      taxipark: "Влад Астана",
      manager: "Дархан",
      fullname: "Насиболла Толеген",
    },
    {
      id: "728ed52h",
      date: "01.12.2023",
      carNumber: "546ACX11",
      taxipark: "Влад Астана",
      manager: "Дархан",
      fullname: "Нуртуганов Жандос",
    },
  ];
}

export default async function ApplicationsPage() {
  const dataApplications = await getData();
  const dataCosts = await getDataOne();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title="Таблицы | Заявки"
            description="Управляйте своими таблицами"
          />
        </div>
        <Separator />
        <div className="flex items-center justify-center w-full pt-5">
          <Tabs defaultValue="applications" className="w-5/6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="applications">Заявки</TabsTrigger>
              <TabsTrigger value="costs">Расходы</TabsTrigger>
            </TabsList>
            <TabsContent value="applications">
              <div className="">
                <ApplicationsDataTable
                  columns={columns}
                  data={dataApplications}
                />
              </div>
            </TabsContent>
            <TabsContent value="costs">
              <div className="">
                <CostsDataTable columns={costsColumns} data={dataCosts} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
