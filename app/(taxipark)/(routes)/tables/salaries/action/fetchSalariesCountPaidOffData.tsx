import { SalariesCountPaidOff } from "../../components/columns/salaryCountPaidOff";

export async function fetchSalariesCountPaidOffData(): Promise<SalariesCountPaidOff[]> {
  const response = await fetch("http://localhost:8080/SalariesCountPaidOff/all", {
    next: { revalidate: 30 },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch SalariesCountPaidOff data");
  }
  return await response.json();
}
