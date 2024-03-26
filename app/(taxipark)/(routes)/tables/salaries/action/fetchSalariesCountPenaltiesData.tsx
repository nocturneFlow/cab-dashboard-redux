import { SalariesCountPenalties } from "../../components/columns/salaryCountPenalties";

export async function fetchSalariesCountPenaltiesData(): Promise<SalariesCountPenalties[]> {
  const response = await fetch("http://localhost:8080/SalariesCountPenalties/all", {
    next: { revalidate: 30 },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch SalariesCountPenalties data");
  }
  return await response.json();
}
