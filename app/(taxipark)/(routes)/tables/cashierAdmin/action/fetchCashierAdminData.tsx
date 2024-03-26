import { CashierAdmin } from "../../components/columns/cashierAdmin";

export async function fetchCashierAdminData(): Promise<CashierAdmin[]> {
  const response = await fetch("http://localhost:8080/cashierAdmin", {
    next: { revalidate: 30 },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch CashierAdmin data");
  }
  return await response.json();
}
