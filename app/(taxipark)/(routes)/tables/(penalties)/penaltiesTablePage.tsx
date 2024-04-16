import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Penalties, PenaltiesColumns } from "../components/columns/penalties";
import { PenaltiesDataTable } from "@/components/tables/penalties/penalties-data-table-pagination";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

async function getDataPenalties(): Promise<Penalties[]> {
  return [
    {
      id: "Penalties001",
      PenaltiesRecordDate: "22.11.2023",
      PenaltiesTravelDate: "15.11.2023",
      PenaltiesDriver: "Мухамбеталин Нуржан",
      PenaltiesWorkShift: "Ночь",
      PenaltiesCarNumber: "629ADB11",
      PenaltiesDocumentDate: "04.10.2023",
      PenaltiesDocumentNumber: "77198",
      PenltiesAmount: "5 175",
      PenaltiesLinlComments: "автобусная линия",
    },
    {
      id: "Penalties002",
      PenaltiesRecordDate: "27.11.2023",
      PenaltiesTravelDate: "19.11.2023",
      PenaltiesDriver: "Абуов Ержан",
      PenaltiesWorkShift: "Ночь",
      PenaltiesCarNumber: "253ADB11",
      PenaltiesDocumentDate: "19.11.2023",
      PenaltiesDocumentNumber: "33860",
      PenltiesAmount: "5 175",
      PenaltiesLinlComments: "автобусная линия",
    },
  ];
}

export default async function PenaltiesTablePage() {
  const dataPenalties = await getDataPenalties();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title="Таблицы | Штрафы"
            description="Управляйте своими таблицами"
          />
        </div>
        <Separator />
        <div className="flex items-center justify-center w-full pt-5">
          <Tabs defaultValue="penalties" className="w-5/6">
            {/* <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="penalties">Заявки</TabsTrigger>
              <TabsTrigger value="costs">Расходы</TabsTrigger>
            </TabsList> */}
            <TabsContent value="penalties">
              <div className="">
                <PenaltiesDataTable
                  columns={PenaltiesColumns}
                  data={dataPenalties}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
