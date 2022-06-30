export async function postData(route = "", methodType, data = {}) {
  const response = await fetch(route, {
    method: methodType,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw await response.json();
  }
}

export async function fetchData(route = "", methodType, data = {}) {
  const response = await fetch(route, {
    method: methodType,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw await response.json();
  }
}
