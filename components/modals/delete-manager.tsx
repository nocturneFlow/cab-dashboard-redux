export async function deleteManager(id: number): Promise<void> {
  try {
    const response = await fetch(
      `https://taxi-service-34d2f59aac8f.herokuapp.com/managers/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete manager with ID ${id}`);
    }
  } catch (error) {
    throw new Error(`Error deleting manager: ${(error as Error).message}`);
  }
}
