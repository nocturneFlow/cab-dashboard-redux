import { Cars } from "../../components/columns/cars";

export async function fetchCarsData(): Promise<Cars[]> {
  const response = await fetch(
    "https://taxi-service-34d2f59aac8f.herokuapp.com/cars/all",
    {
      next: { revalidate: 30 },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch cars data");
  }
  return await response.json();
}
