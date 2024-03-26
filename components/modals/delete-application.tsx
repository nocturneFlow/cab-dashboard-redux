export async function deleteApplication(id: number): Promise<void> {
  try {
    const response = await fetch(`https://taxi-service-68bafebbc66d.herokuapp.com/applications/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete application with ID ${id}`);
    }
  } catch (error) {
    throw new Error(`Error deleting application: ${(error as Error).message}`);
  }
}
