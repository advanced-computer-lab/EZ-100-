const DOMAIN = "http://localhost:5000"; // Whatever the API domain is

export async function getAllFlights(query = "") {
  const response = await fetch(`${DOMAIN}/api/flights/viewFlights${query}`);

  const data = await response.json();

  // console.log(data.data);

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch flights.");
  }

  return { flights: data.data, count: data.count };
}

export async function getSingleFlight(flightId) {
  const response = await fetch(`${DOMAIN}/api/flights/viewFlight/${flightId}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch flight.");
  }

  return data.data;
}

export async function createFlight(newflight) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newflight),
  };

  const response = await fetch(
    `${DOMAIN}/api/flights/createFlight`,
    requestOptions
  );

  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error(data.message || "Could not send data.");
  }

  return data.data;
}

export async function deleteFlight(flightId) {
  const response = await fetch(
    `${DOMAIN}/api/flights/deleteFlight/${flightId}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  return data.Success;
}
