import { fetchData } from "../../services/api";
import { BASE_URL } from "../../services/constants";
describe("fetchData", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it("should fetch data successfully", async () => {
        const mockData = { id: "1", name: "John Doe" };
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue(mockData),
            headers: new Headers({ "Content-Type": "application/json" }),
            status: 200,
            statusText: "OK",
            redirected: false,
            url: "http://localhost:3000/api/v1/users",
        };
        jest.spyOn(global, "fetch").mockResolvedValue(mockResponse);
        const endpoint = "/users";
        const method = "GET";
        const { data } = await fetchData(endpoint, method);
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
        const mockResponse = {
            ok: true,
            status: 204,
        };
        jest.spyOn(global, "fetch").mockResolvedValue(mockResponse);
        const endpoint = "/users/1";
        const method = "DELETE";
        const { data } = await fetchData(endpoint, method);
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
        global.fetch = jest.fn(() => Promise.resolve({
            ok: false,
            status: 404,
        }));
        const endpoint = "/users/100";
        const method = "GET";
        try {
            await fetchData(endpoint, method);
        }
        catch (error) {
            const errorInstance = new Error("Not Found");
            expect(errorInstance).toBeInstanceOf(Error);
            expect(errorInstance.message).toBe("Not Found");
        }
        await expect(fetchData(endpoint, method)).rejects.toThrow("Not Found");
    });
});
