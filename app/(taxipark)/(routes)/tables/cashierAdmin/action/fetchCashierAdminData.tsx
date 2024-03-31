import { CashierAdmin } from "../../components/columns/cashierAdmin";

export async function fetchCashierAdminData(): Promise<CashierAdmin[]> {
  const response = await fetch(
    "https://taxi-service-68bafebbc66d.herokuapp.com/cashierAdmin",
    {
      next: { revalidate: 30 },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch CashierAdmin data");
  }
  return await response.json();
}
