import { CashReconciliation } from "../../components/columns/cashReconciliation";

export async function fetchReportsData(): Promise<CashReconciliation[]> {
  const response = await fetch(
    "https://taxi-service-34d2f59aac8f.herokuapp.com/reports",
    {
      next: { revalidate: 30 },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch Reports data");
  }
  return await response.json();
}
