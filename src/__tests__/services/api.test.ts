import { fetchData } from "../../services/api";

global.fetch = jest.fn();

describe("fetchData", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("should fetch data from the given endpoint", async () => {
    const mockResponse = { data: "test data" };
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await fetchData("/test-endpoint");

    expect(fetch).toHaveBeenCalledWith("https://your-api-domain.com/test-endpoint", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: undefined,
    });
    expect(data).toEqual(mockResponse);
  });

  it("should throw an error if the response is not ok", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      text: async () => "Error message",
    });

    await expect(fetchData("/test-endpoint")).rejects.toThrow("Error message");
  });
});
