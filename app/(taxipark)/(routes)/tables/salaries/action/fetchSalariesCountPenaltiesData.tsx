import { SalariesCountPenalties } from "../../components/columns/salaryCountPenalties";

export async function fetchSalariesCountPenaltiesData(): Promise<
  SalariesCountPenalties[]
> {
  const response = await fetch(
    "https://taxi-service-34d2f59aac8f.herokuapp.com/SalariesCountPenalties/all",
    {
      next: { revalidate: 30 },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch SalariesCountPenalties data");
  }
  return await response.json();
}
