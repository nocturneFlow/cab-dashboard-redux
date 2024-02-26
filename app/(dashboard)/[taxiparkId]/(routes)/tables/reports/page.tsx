import { DataTable } from "@/components/tables/applications/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export default async function DriversPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title="Таблицы | Отчеты"
            description="Управляйте своими таблицами"
          />
        </div>
        <Separator />
        <div className="flex items-center justify-center w-full pt-5"></div>
      </div>
    </div>
  );
}
