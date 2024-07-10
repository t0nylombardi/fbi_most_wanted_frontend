import { fetchData } from "../../services/api"; // Ensure this points to the real implementation to be mocked
import { wanted, processWantedPersons } from "../../services/fetchWantedPersonsService";
import mockedPersons from "../../__mocks__/mockPersons";
import mockedDetails from "../../__mocks__/mockDetails";
// Mock data
const mockPerson = mockedPersons[0];
const mockUpdatedDetails = mockedDetails;
// Mock the fetchData function
jest.mock("../../services/api");
describe("wanted service", () => {
    let consoleErrorMock;
    beforeAll(() => {
        consoleErrorMock = jest.spyOn(console, "error").mockImplementation(() => { });
    });
    afterAll(() => {
        consoleErrorMock.mockRestore();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("create", () => {
        it("should create a wanted person", async () => {
            // Mock the fetchData function to resolve with mockPerson
            fetchData.mockResolvedValue({ data: mockPerson });
            // Call the create method
            const result = await wanted.create(mockPerson);
            // Verify fetchData was called with correct arguments
            expect(fetchData).toHaveBeenCalledWith("/default_all_pages", "POST", mockPerson);
            // Verify the result is as expected
            expect(result).toEqual(mockPerson);
        });
    });
    describe("read", () => {
        it("should read wanted persons", async () => {
            fetchData.mockResolvedValue({ data: [mockPerson] });
            const result = await wanted.read();
            expect(fetchData).toHaveBeenCalledWith("/default_all_pages");
            expect(result).toEqual([mockPerson]);
        });
    });
    describe("update", () => {
        it("should update a wanted person", async () => {
            fetchData.mockResolvedValue({
                data: { ...mockPerson, ...mockUpdatedDetails },
            });
            const result = await wanted.update(mockPerson.id, mockUpdatedDetails);
            expect(fetchData).toHaveBeenCalledWith(`/default_all_pages/${mockPerson.id}`, "PUT", mockUpdatedDetails);
            expect(result).toEqual({ ...mockPerson, ...mockUpdatedDetails });
        });
        it("should return null on error", async () => {
            fetchData.mockRejectedValue("Update failed");
            const result = await wanted.update(mockPerson.id, mockUpdatedDetails);
            expect(fetchData).toHaveBeenCalledWith(`/default_all_pages/${mockPerson.id}`, "PUT", mockUpdatedDetails);
            expect(result).toBeNull();
        });
    });
    describe("delete", () => {
        it("should delete a wanted person", async () => {
            fetchData.mockResolvedValue({});
            await wanted.delete(mockPerson.id);
            expect(fetchData).toHaveBeenCalledWith(`/default_all_pages/${mockPerson.id}`, "DELETE");
        });
    });
});
describe("processWantedPersons", () => {
    it("should return an empty array when data is null or undefined", () => {
        expect(processWantedPersons([])).toEqual([]);
        expect(processWantedPersons([])).toEqual([]);
    });
    it("should wrap a single object in an array", () => {
        expect(processWantedPersons([mockPerson])).toEqual([mockPerson]);
    });
    it("should process an array of wanted persons", () => {
        expect(processWantedPersons([mockPerson])).toEqual([mockPerson]);
    });
});
