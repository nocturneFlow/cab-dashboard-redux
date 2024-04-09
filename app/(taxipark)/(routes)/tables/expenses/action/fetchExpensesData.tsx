import { Expenses } from "../../components/columns/expenses";

export async function fetchExpensesData(): Promise<Expenses[]> {
  const response = await fetch(
    "https://taxi-service-34d2f59aac8f.herokuapp.com/costMs",
    {
      next: { revalidate: 30 },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch expenses data");
  }
  return await response.json();
}
