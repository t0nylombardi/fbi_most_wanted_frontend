import { BASE_URL } from "../services/constants";

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  if (response.status === 204) return {} as T; // handles DELETE requests

  return response.json() as T;
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
