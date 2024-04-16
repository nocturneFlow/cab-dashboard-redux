import { CashReconciliation } from "../../components/columns/cashReconciliation";

export async function fetchCashReconciliationData(): Promise<
  CashReconciliation[]
> {
  const response = await fetch(
    "https://taxi-service-34d2f59aac8f.herokuapp.com/applications/all",
    {
      next: { revalidate: 30 },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch CashReconciliation data");
  }
  return await response.json();
}
