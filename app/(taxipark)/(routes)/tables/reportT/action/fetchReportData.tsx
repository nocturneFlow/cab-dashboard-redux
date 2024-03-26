import { Report } from "../../components/columns/reportT";

export async function fetchReportData(): Promise<Report[]> {
  const response = await fetch("http://localhost:8080/reports", {
    next: { revalidate: 30 },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch Reports data");
  }
  return await response.json();
}
