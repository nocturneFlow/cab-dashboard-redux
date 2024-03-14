export async function deleteApplication(id: number): Promise<void> {
  try {
    const response = await fetch(`http://localhost:8080/applications/${id}`, {
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
