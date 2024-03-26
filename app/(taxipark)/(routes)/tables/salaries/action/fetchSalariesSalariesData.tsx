import { SalariesSalaries } from "../../components/columns/salariesSalaries";

export async function fetchSalariesSalariesData(): Promise<SalariesSalaries[]> {
  const response = await fetch("http://localhost:8080/SalariesSalaries/all", {
    next: { revalidate: 30 },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch SalariesSalaries data");
  }
  return await response.json();
}
