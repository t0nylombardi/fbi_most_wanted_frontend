import { BASE_URL } from "../services/constants";

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  if (response.status === 204) return {} as T;

  try {
    return await response.json();
  } catch (error) {}
  return {} as T;
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

  try {
    return await fetch(`${BASE_URL}${endpoint}`, options)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response;
      })
      .then(response => handleResponse<T>(response))
      .then(data => ({ ok: true, data }))
      .catch(error => {
        throw new Error(error.message);
      });
  } catch (error) {
    throw new Error("Not Found");
  }
};

export { fetchData };
