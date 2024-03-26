import { SalariesCashier } from "../../components/columns/salariesCashier";

export async function fetchSalariesCashierData(): Promise<SalariesCashier[]> {
  const response = await fetch("http://localhost:8080/SalariesCashier/all", {
    next: { revalidate: 30 },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch SalariesCashier data");
  }
  return await response.json();
}
