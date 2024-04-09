import { Application } from "../../components/columns/applications";

export async function fetchApplicationsData(): Promise<Application[]> {
  const response = await fetch(
    "https://taxi-service-34d2f59aac8f.herokuapp.com//applications/all",
    {
      next: { revalidate: 30 },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch applications data");
  }
  return await response.json();
}

export default fetchApplicationsData;
