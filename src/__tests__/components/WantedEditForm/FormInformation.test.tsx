import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import FormInformation from "../../../components/WantedEditForm/FormInformation";

describe("FormInformation component", () => {
  const information = {
    description: "Sample description",
    details: "Sample details",
    caution: "Sample caution",
    images: [],
  };

  const onUpdateInformation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders textarea with initial longest information correctly", () => {
    render(
      <FormInformation
        informationObj={["description", "details", "caution"]}
        information={information}
        onInformationChange={onUpdateInformation}
      />,
    );

    const textarea = screen.getByTestId("description-value");
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue("Sample description");
  });

  it("updates longest information when user types in textarea", () => {
    render(
      <FormInformation
        informationObj={["description", "details", "caution"]}
        information={information}
        onInformationChange={onUpdateInformation}
      />,
    );

    const textarea = screen.getByTestId("description-value");
    fireEvent.change(textarea, { target: { value: "New longest information" } });

    expect(textarea).toHaveValue("New longest information");
    expect(onUpdateInformation).toHaveBeenCalledTimes(2);
    expect(onUpdateInformation).toHaveBeenCalledWith({
      ...information,
      description: "New longest information",
    });
  });

  it("handles changes in textarea and updates state correctly", () => {
    render(
      <FormInformation
        informationObj={["description", "details", "caution"]}
        information={information}
        onInformationChange={onUpdateInformation}
      />,
    );

    const textarea = screen.getByTestId("description-value");
    fireEvent.change(textarea, { target: { value: "New longest information" } });

    expect(textarea).toHaveValue("New longest information");
    expect(onUpdateInformation).toHaveBeenCalledTimes(2);
    expect(onUpdateInformation).toHaveBeenCalledWith({
      ...information,
      description: "New longest information",
    });
  });
});
