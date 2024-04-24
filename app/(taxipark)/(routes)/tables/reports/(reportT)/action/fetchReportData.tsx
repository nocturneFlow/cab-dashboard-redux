import { getCarDetailModel } from "../../components/columns/reportT";

export async function fetchReportData(): Promise<getCarDetailModel[]> {
  const response = await fetch(
    "https://taxi-service-34d2f59aac8f.herokuapp.com/reports/all",
    {
      next: { revalidate: 30 },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch Reports data");
  }
  return await response.json();
}
