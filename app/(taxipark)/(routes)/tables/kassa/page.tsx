import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Kaspi, kaspicolumns } from "../components/columns/kaspi-kassam";
import {
  СheckKasaM,
  checkKassaMcolumns,
} from "../components/columns/check-kassam";
import { KassaM, columns } from "../components/columns/kassam";
import { KassaMDataTable } from "@/components/tables/kassaM/kassaM-data-table-pagination";
import { KaspiDataTable } from "@/components/tables/kassaM/kaspi-data-table";
import { TableClient } from "../components/client";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

async function getDataKassaM(): Promise<KassaM[]> {
  return [
    {
      id: "laiuwdybghauhyjdbv",
      date: "11.11.2023",
      manager: "Дархан",
      incomeFromFounders: "",
      incomeFromDriver: "0",
      expenses: "0",
      salary: "0",
      totalCcashChange: "0",
      encashment: "0",
    },
  ];
}

async function getDataKaspi(): Promise<Kaspi[]> {
  return [
    {
      id: "728ed52f",
      kaspiIncomeFromFounders: "",
      kaspiIncomeFromDriver: "0",
      kaspiExpenses: "11 000",
      kaspiSalary: "0",
      kaspiTotalCcashChange: "-11 000",
      kaspiEncashment: "",
    },
  ];
}

async function getDataCheckKassaM(): Promise<СheckKasaM[]> {
  return [
    {
      id: "1234dqw21323",
      checkApplication: "0",
      checkExpenses: "0",
      checkOnRequest: "0",
      checkCashier: "0",
      checkDifference: "0",
    },
  ];
}

export default async function DriversPage() {
  const dataKassaM = await getDataKassaM();
  const dataKaspi = await getDataKaspi();
  const dataCheckKassaM = await getDataCheckKassaM();
  // const dataKassaMFetch = await fetch("http://localhost:3000/tables/kassa");
  // const dataKaspiFetch = await fetch("http://localhost:3000/tables/kassa");
  // const dataCheckKassaMFetch = await fetch("http://localhost:3000/tables/kassa");
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title="Таблицы | Касса Менеджера"
            description="Управляйте своими таблицами"
          />
        </div>
        <Separator />
        <div className="flex items-center justify-center w-full pt-5">
          <Tabs defaultValue="cash" className="w-5/6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cash">Наличка</TabsTrigger>
              <TabsTrigger value="kaspi">Kaspi</TabsTrigger>
              <TabsTrigger value="check">Проверка</TabsTrigger>
            </TabsList>
            <TabsContent value="cash">
              <div className="">
                <KassaMDataTable columns={columns} data={dataKassaM} />
                {/* <KassaMDataTable columns={columns} data={dataKassaMFetch} /> */}
              </div>
            </TabsContent>
            <TabsContent value="kaspi">
              <div className="">
                <KaspiDataTable columns={kaspicolumns} data={dataKaspi} />
                {/* <KaspiDataTable columns={kaspicolumns} data={dataKaspiFetch} /> */}
              </div>
            </TabsContent>
            <TabsContent value="check">
              <div className="">
                <KaspiDataTable
                  columns={checkKassaMcolumns}
                  data={dataCheckKassaM}
                />
                {/* <KaspiDataTable
                  columns={checkKassaMcolumns}
                  data={dataCheckKassaMFetch}
                /> */}
              </div>
            </TabsContent>
          </Tabs>
        </div>{" "}
      </div>
    </div>
  );
}
