import { fetchData } from "../../services/api";
import { BASE_URL } from "../../services/constants";

describe("fetchData", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch data successfully", async () => {
    // Mock the fetch function
    const mockData = { id: "1", name: "John Doe" };
    const mockResponse: Response = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
      headers: new Headers({ "Content-Type": "application/json" }),
      status: 200,
      statusText: "OK",
      redirected: false,
      url: "http://localhost:3000/api/v1/users",
    } as unknown as Response;

    jest.spyOn(global, "fetch").mockResolvedValue(mockResponse as Response);

    // Call fetchData with mock endpoint and method
    const endpoint = "/users";
    const method = "GET";
    const { data } = await fetchData<{ id: string; name: string }>(endpoint, method);

    // Assertions
    expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: undefined,
    });
    expect(data).toEqual(mockData);
  });

  it("should handle DELETE request (status 204)", async () => {
    // Mock the fetch function
    const mockResponse = {
      ok: true,
      status: 204,
    };
    jest.spyOn(global, "fetch").mockResolvedValue(mockResponse as Response);

    // Call fetchData with mock endpoint and method
    const endpoint = "/users/1";
    const method = "DELETE";
    const { data } = await fetchData<void>(endpoint, method);

    // Assertions
    expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: undefined,
    });
    expect(data).toEqual({});
  });

  it("should handle error response", async () => {
    // Mock the fetch function
    // Mock fetch to simulate an HTTP error response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      }),
    ) as jest.Mock;

    const endpoint = "/users/100";
    const method = "GET";

    try {
      await fetchData(endpoint, method);
    } catch (error: unknown) {
      // make new error instance for match
      const errorInstance = new Error("Not Found");

      // Assertions
      expect(errorInstance).toBeInstanceOf(Error);
      expect(errorInstance.message).toBe("Not Found");
    }

    await expect(fetchData(endpoint, method)).rejects.toThrow("Not Found");
  });
});
