import { CashReconciliation } from "../../components/columns/cashReconciliation";

export async function fetchCashReconciliationData(): Promise<CashReconciliation[]> {
  const response = await fetch("http://localhost:8080/applications/all", {
    next: { revalidate: 30 },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch CashReconciliation data");
  }
  return await response.json();
}
