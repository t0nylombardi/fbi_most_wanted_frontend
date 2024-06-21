import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ImageCard from "../../components/ImageCard";
import { Image } from "../../services/types";

describe("ImageCard", () => {
  const image: Image = {
    large: "https://example.com/image.jpg",
    caption: "Test Caption",
    original: "https://example.com/image.jpg",
    thumb: "https://example.com/image.jpg",
  };

  test("renders the image with the correct src and alt attributes", () => {
    const { getByAltText } = render(<ImageCard image={image} />);
    const imgElement = getByAltText("card-image");

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", image.large);
    expect(imgElement).toHaveAttribute("alt", "card-image");
  });

  test("renders the image caption correctly", () => {
    const { getByText } = render(<ImageCard image={image} />);
    const captionElement = getByText(image.caption ?? "");

    expect(captionElement).toBeInTheDocument();
    expect(captionElement).toHaveTextContent(image.caption ?? "");
  });

  test("applies the correct class names", () => {
    const { container } = render(<ImageCard image={image} />);
    const cardElement = container.firstChild;

    expect(cardElement).toHaveClass(
      "relative flex flex-col h-full my-6 p-4 text-chilean-fire-500 bg-clip-border rounded-xl w-96",
    );
    expect(
      container.querySelector(
        "div.relative.m-4.h-full.overflow-hidden.text-chilean-fire-500.bg-clip-border.rounded-xl.bg-blue-gray-500",
      ),
    ).toBeInTheDocument();
    expect(container.querySelector("p.text-white.text-lg.font-bold.mt-2")).toBeInTheDocument();
  });
});
