// const DOMAIN = ""; // Whatever the API domain is

export async function getAllFlights() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }

  return data;
}
