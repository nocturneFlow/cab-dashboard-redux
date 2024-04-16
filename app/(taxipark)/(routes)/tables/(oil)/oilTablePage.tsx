import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Oil, OilColumns } from "../components/columns/oil";
// import GetAllOil from "../components/columns/oil";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export default async function OilTablePage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title="Таблицы | Масло"
            description="Управляйте своими таблицами"
          />
        </div>
        <Separator />
        <div className="flex items-center justify-center w-full pt-5">
          <Tabs defaultValue="oil" className="w-5/6">
            <TabsContent value="oil">
              <div className="">{/* <GetAllOil /> */}</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
