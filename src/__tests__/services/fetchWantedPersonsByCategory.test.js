import { fetchWantedPersonsByCategory } from "../../services/fetchWantedPersonsByCategory";
import { wanted } from "../../services/fetchWantedPersonsService";
import mockPersons from "../../__mocks__/mockPersons";
jest.mock("../../services/fetchWantedPersonsService");
describe("fetchWantedPersons", () => {
    beforeEach(() => {
        wanted.read.mockResolvedValue(mockPersons);
    });
    it("should fetch and sort wanted persons", async () => {
        const result = await fetchWantedPersonsByCategory("wanted");
        expect(wanted.read).toHaveBeenCalled();
        expect(result).toEqual(mockPersons.sort((a, b) => new Date(String(a.modified)).getTime() - new Date(String(b.modified)).getTime()));
    });
    it("should filter persons based on category", async () => {
        const result = await fetchWantedPersonsByCategory("cyber-crimes");
        expect(wanted.read).toHaveBeenCalled();
        expect(result).toEqual([mockPersons[0]]);
    });
    it("should return empty array if no persons match the category", async () => {
        const result = await fetchWantedPersonsByCategory("non-existing-category");
        expect(wanted.read).toHaveBeenCalled();
        expect(result).toEqual([]);
    });
    it("should throw an error if fetching fails", async () => {
        wanted.read.mockRejectedValue(new Error("Network error"));
        await expect(fetchWantedPersonsByCategory()).rejects.toThrow("Failed to fetch wanted persons");
    });
});
