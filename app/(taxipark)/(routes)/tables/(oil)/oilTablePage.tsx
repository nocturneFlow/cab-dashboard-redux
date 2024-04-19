import GetAllOil from "../components/columns/oil";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table } from "lucide-react";

export default function OilTablePage() {
  // return (
  //   <div className="flex-col">
  //     <div className="flex-1 space-y-4 p-8 pt-6">
  //       <div className="flex items-center justify-between">
  //         <Heading
  //           title="Таблицы | Масло"
  //           description="Управляйте своими таблицами"
  //         />
  //       </div>
  //       <Separator />
  //       <div className="flex items-center justify-center w-full pt-5">
  //         <Tabs defaultValue="oil" className="w-5/6">
  //           <TabsContent value="oil">
  //             <div className="">{/* <GetAllOil /> */}</div>
  //           </TabsContent>
  //         </Tabs>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <>
      <div>
        <Card className="h-[50rem]">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <Table />
              Таблица заявок
            </CardTitle>
            <CardDescription>
              Все заявки находятся в этой таблице. Вы можете просмотреть,
              отредактировать или удалить заявку.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GetAllOil />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
