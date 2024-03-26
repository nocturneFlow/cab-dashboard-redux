import { AdditionalIncome } from "../../components/columns/additionalIncome";

export async function fetchAdditionalIncomeData(): Promise<AdditionalIncome[]> {
  const response = await fetch("http://localhost:8080/additionalIncome", {
    next: { revalidate: 30 },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch additionalIncome data");
  }
  return await response.json();
}
