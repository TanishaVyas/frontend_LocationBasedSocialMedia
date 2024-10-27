// apiService.js
const BASE_URL = "http://localhost:8080/api";

export async function postUser(data) {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error posting user data:", error);
    throw error;
  }
}
