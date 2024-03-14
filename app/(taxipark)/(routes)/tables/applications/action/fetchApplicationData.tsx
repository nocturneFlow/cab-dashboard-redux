import { Application } from "../../components/columns/applications";

export async function fetchApplicationsData(): Promise<Application[]> {
  const response = await fetch("http://localhost:8080/applications/all", {
    next: { revalidate: 30 },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch applications data");
  }
  return await response.json();
}
