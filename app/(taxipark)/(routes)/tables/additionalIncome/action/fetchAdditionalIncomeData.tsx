import { AdditionalIncome } from "../../components/columns/additionalIncome";

export async function fetchAdditionalIncomeData(): Promise<AdditionalIncome[]> {
  const response = await fetch(
    "https://taxi-service-34d2f59aac8f.herokuapp.com/additionalIncome",
    {
      next: { revalidate: 30 },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch additionalIncome data");
  }
  return await response.json();
}
