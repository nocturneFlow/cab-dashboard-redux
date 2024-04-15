"use client";

import { Tabs } from "@/components/ui/aceternity-tabs";
import GetAllApplications from "../components/columns/applications";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

export default function TabsDemo() {
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <Heading
              title="Таблица заявок"
              description="Все заявки находятся в этой таблице. Вы можете просмотреть, отредактировать или удалить заявку."
            />
          </div>
          <Separator />
          <div className="mx-[10rem] pt-[1rem]">
            <GetAllApplications />
          </div>
        </div>
      </div>
    </>
  );
}
