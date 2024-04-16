import { SalariesCountPaidOff } from "../../components/columns/salaryCountPaidOff";

export async function fetchSalariesCountPaidOffData(): Promise<
  SalariesCountPaidOff[]
> {
  const response = await fetch(
    "https://taxi-service-34d2f59aac8f.herokuapp.com/SalariesCountPaidOff/all",
    {
      next: { revalidate: 30 },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch SalariesCountPaidOff data");
  }
  return await response.json();
}
