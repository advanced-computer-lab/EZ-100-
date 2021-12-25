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

export async function deleteFlight({ flightId, token }) {
  const response = await fetch(
    `${DOMAIN}/api/flights/deleteFlight/${flightId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  return data.data;
}

const getDates = (date, isFlexible) => {
  let d1 = new Date(date);
  let d2 = new Date(date);

  if (isFlexible) {
    d1.setDate(d1.getDate() - 4);
    d2.setDate(d2.getDate() + 4);
  } else {
    d2.setDate(d2.getDate() + 1);
  }

  d1 = d1.toISOString().substring(0, 10);
  d2 = d2.toISOString().substring(0, 10);

  return { d1, d2 };
};

export async function getRoundTrip(trip) {
  let { d1, d2 } = getDates(trip.departureDate, trip.isFlexible);
  const query1 = `?From=${trip.fromValue}&To=${trip.toValue}&DepartureDate[$gte]=${d1}&DepartureDate[$lt]=${d2}`;

  const response1 = await fetch(`${DOMAIN}/api/flights/viewFlights${query1}`);
  const data1 = await response1.json();

  let { d1: d3, d2: d4 } = getDates(trip.returnDate, trip.isFlexible);

  const query2 = `?To=${trip.fromValue}&From=${trip.toValue}&DepartureDate[$gte]=${d3}&DepartureDate[$lt]=${d4}`;

  const response2 = await fetch(`${DOMAIN}/api/flights/viewFlights${query2}`);
  const data2 = await response2.json();

  return { departureFlights: data1.data, returnFlights: data2.data };
}

export async function createReservation({ reservation, token }) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reservation),
  };

  const response = await fetch(
    `${DOMAIN}/api/reservations/createReservation`,
    requestOptions
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not send data.");
  }

  return data.data;
}

export async function editReservation(payload) {
  const { editedReservation, id, token } = payload;

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(editedReservation),
  };

  console.log(editedReservation);

  await fetch(
    `${DOMAIN}/api/reservations/editReservation/${id}`,
    requestOptions
  );
}
