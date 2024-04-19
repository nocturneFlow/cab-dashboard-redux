export async function deleteDriver(id: number): Promise<void> {
  try {
    const response = await fetch(
      `https://taxi-service-34d2f59aac8f.herokuapp.com/drivers/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete driver with ID ${id}`);
    }
  } catch (error) {
    throw new Error(`Error deleting driver: ${(error as Error).message}`);
  }
}
