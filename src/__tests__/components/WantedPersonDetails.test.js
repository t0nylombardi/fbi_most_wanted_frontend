import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import WantedPersonDetails, { convertHeightToFeet, convertWeight, } from "../../components/WantedPersonDetails";
import mockPersons from "../../__mocks__/mockPersons";
describe("WantedPersonDetails Component", () => {
    const mockPerson = mockPersons[0];
    const mockPersonWithZeroValues = {
        id: "",
        title: "",
        details: "",
        description: "",
        caution: "",
        height_max: 0,
        height_min: 0,
        weight_max: 0,
        weight_min: 0,
        age_range: "",
        eyes: "",
        hair: "",
        place_of_birth: "",
        race: "",
        sex: "",
        url: "",
        images: [],
        subjects: [],
        modified: "",
    };
    it("renders component with correct details", () => {
        render(_jsx(WantedPersonDetails, { person: mockPerson }));
        const detailsTable = screen.getByRole("table", { name: /details/i });
        expect(detailsTable).toBeInTheDocument();
        expect(screen.getByText(/Age Range/i)).toBeInTheDocument();
        expect(screen.getByText("Eyes")).toBeInTheDocument();
        expect(screen.getByText("Hair")).toBeInTheDocument();
        expect(screen.getByText(/Height Max/i)).toBeInTheDocument();
        expect(screen.getByText(/Place Of Birth/i)).toBeInTheDocument();
        expect(screen.getByText("Race")).toBeInTheDocument();
        expect(screen.getByText("Sex")).toBeInTheDocument();
        expect(screen.getByText(/Weight Max/i)).toBeInTheDocument();
    });
    it("renders 'No Details' message when person prop is empty", () => {
        render(_jsx(WantedPersonDetails, { person: mockPersonWithZeroValues }));
        const emptyDetailsMessage = screen.getByText("No Details are available for this person.");
        expect(emptyDetailsMessage).toBeInTheDocument();
    });
    it("renders 'n/a' for height and weight when values are zero or undefined", () => {
        const personWithZeroValues = {
            ...mockPerson,
            height_max: null,
            weight_max: null,
        };
        render(_jsx(WantedPersonDetails, { person: personWithZeroValues }));
        expect(screen.getByText(/Height Max/i)?.nextSibling?.textContent).toBe("n/a");
        expect(screen.getByText(/Weight Max/i)?.nextSibling?.textContent).toBe("n/a");
    });
    it("converts height in inches to feet and inches correctly", () => {
        expect(convertHeightToFeet(72)).toBe("6ft 0in");
        expect(convertHeightToFeet(60)).toBe("5ft 0in");
        expect(convertHeightToFeet(0)).toBe("");
    });
    it("formats weight in pounds correctly", () => {
        expect(convertWeight(180)).toBe("180 lbs");
        expect(convertWeight(0)).toBe("");
    });
});
