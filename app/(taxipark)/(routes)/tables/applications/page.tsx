"use client";

import { Tabs } from "@/components/ui/aceternity-tabs";
import GetAllApplications from "../components/columns/applications";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export default function TabsDemo() {
  const tabs = [
    {
      title: "Заявки",
      value: "applications",
      content: (
        <div className="w-full overflow-hidden relative h-full border rounded-md p-10 text-xl md:text-4xl font-bold text-primary bg-card">
          <p className="pb-5">Заявки</p>
          <GetAllApplications />
        </div>
      ),
    },
    {
      title: "Расходы",
      value: "expenses",
      content: (
        <div className="w-full overflow-hidden relative h-full border rounded-md p-10 text-xl md:text-4xl font-bold text-primary bg-card">
          <p className="pb-5">Расходы</p>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <Heading
              title="Таблицы"
              description="Управляйте своими таблицами"
            />
          </div>
          <Separator />
          <div className="h-[30rem] md:h-[50rem] [perspective:1000px] relative flex flex-col items-start justify-start">
            <Tabs tabs={tabs} />
          </div>
        </div>
      </div>
    </>
  );
}
