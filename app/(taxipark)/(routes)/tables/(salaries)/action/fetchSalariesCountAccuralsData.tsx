import { SalariesCountAccurals } from "../../components/columns/salaryCountAccurals";

export async function fetchSalariesCountAccuralsData(): Promise<
  SalariesCountAccurals[]
> {
  const response = await fetch(
    "https://taxi-service-34d2f59aac8f.herokuapp.com/SalariesCountAccurals/all",
    {
      next: { revalidate: 30 },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch SalariesCountAccurals data");
  }
  return await response.json();
}
