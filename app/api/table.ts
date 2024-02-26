import { Yandex } from "@/app/(dashboard)/[taxiparkId]/(routes)/tables/components/columns/yandex";

async function getDataYandex(): Promise<Yandex[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      cash: "7410",
      noncash: "10320",
      total: "17730",
    },
    // ...
  ];
}
