const BASE_URL = "http://localhost:3000/api/v1";

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }
  if (response.status === 204) return {} as T; // handles DELETE requests
  return response.json();
};

const fetchData = async <T>(
  endpoint: string,
  method: string = "GET",
  body?: object,
): Promise<{ ok: boolean; data: T }> => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await handleResponse<T>(response);
  return { ok: response.ok, data };
};

export { fetchData };
