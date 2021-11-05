const DOMAIN = "http://localhost:5000"; // Whatever the API domain is

export async function getAllFlights() {
  // const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const response = await fetch(`${DOMAIN}/api/flights/viewFlights`);

  const data = await response.json();

  console.log(data.data);

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }


  return data.data;
}

export async function createFlight(newflight){
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newflight)
};

  const response = await fetch(`${DOMAIN}/api/flights/createFlight`, requestOptions);

  const data = await response.json();
   console.log(data);
  if (!response.ok) {
    throw new Error(data.message || "Could not send data.");
  }


  return data.data;
}