async function updateApplication(id: number, updatedData: string) {
  const response = await fetch(
    `https://taxi-service-68bafebbc66d.herokuapp.com/applications/${id}/editApplication`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
