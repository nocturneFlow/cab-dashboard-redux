import { CashReconciliation } from "../../components/columns/cashReconciliation";

export async function fetchReportsData(): Promise<CashReconciliation[]> {
  const response = await fetch("http://localhost:8080/reports", {
    next: { revalidate: 30 },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch Reports data");
  }
  return await response.json();
}
