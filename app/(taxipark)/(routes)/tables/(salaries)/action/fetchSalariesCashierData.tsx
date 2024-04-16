import { SalariesCashier } from "../../components/columns/salariesCashier";

export async function fetchSalariesCashierData(): Promise<SalariesCashier[]> {
  const response = await fetch(
    "https://taxi-service-34d2f59aac8f.herokuapp.com/SalariesCashier/all",
    {
      next: { revalidate: 30 },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch SalariesCashier data");
  }
  return await response.json();
}
