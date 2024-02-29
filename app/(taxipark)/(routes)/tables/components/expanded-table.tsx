import { useEffect, useState } from "react";
import { DataTable } from "@/components/tables/applications/data-table";
import { Yandex, columns } from "./columns/yandex";
import { yandexData } from "./yandexData";

function DemoPage() {
  const [data, setData] = useState<Yandex[]>([]);

  useEffect(() => {
    setData(yandexData);
  }, []);

  return (
    <div className="">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default DemoPage;
