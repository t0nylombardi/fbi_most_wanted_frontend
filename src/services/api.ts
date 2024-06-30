const BASE_URL = "http://localhost:3000/api/v1";

const handleResponse = async (response: Response): Promise<unknown> => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Network response was not ok");
  }
  if (response.status === 204) return; // handles DELETE requests
  return response.json();
};

const fetchData = async <T>(
  endpoint: string,
  method: string = "GET",
  body?: object,
): Promise<T> => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  };
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  return handleResponse(response) as Promise<T>;
};

export { fetchData };
