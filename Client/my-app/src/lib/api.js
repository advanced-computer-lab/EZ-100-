const DOMAIN = "http://localhost:5000"; // Whatever the API domain is

export async function getAllFlights(query = "") {
  const response = await fetch(`${DOMAIN}/api/flights/viewFlights${query}`);

  const data = await response.json();

  // console.log(data.data);

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch flights.");
  }

  return data.data;
}

export async function getSingleFlight(flightId) {
  const response = await fetch(`${DOMAIN}/api/flights/viewFlight/${flightId}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch flight.");
  }

  return data.data;
}
