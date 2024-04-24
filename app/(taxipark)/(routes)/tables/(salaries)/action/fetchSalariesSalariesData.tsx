import { SalariesSalaries } from "../../components/columns/salariesSalaries";

export async function fetchSalariesSalariesData(): Promise<SalariesSalaries[]> {
  const response = await fetch(
    "https://taxi-service-34d2f59aac8f.herokuapp.com/drivers/salary",
    {
      next: { revalidate: 30 },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch SalariesSalaries data");
  }
  return await response.json();
}
