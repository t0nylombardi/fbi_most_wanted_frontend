import { jsx as _jsx } from "react/jsx-runtime";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ImageCard from "../../components/ImageCard";
describe("ImageCard", () => {
    const image = {
        large: "https://example.com/image.jpg",
        caption: "Test Caption",
    };
    it("renders the image with the correct src and alt attributes", () => {
        const { getByAltText } = render(_jsx(ImageCard, { image: image, caption: true }));
        const imgElement = getByAltText(image.caption ?? "");
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute("src", image.large);
        expect(imgElement).toHaveAttribute("alt", image.caption ?? "Image");
    });
    it("renders the image caption correctly", () => {
        const { getByText } = render(_jsx(ImageCard, { image: image, caption: true }));
        const captionElement = getByText(image.caption ?? "");
        expect(captionElement).toBeInTheDocument();
        expect(captionElement).toHaveTextContent(image.caption ?? "");
    });
    it("applies the correct class names", () => {
        const { container } = render(_jsx(ImageCard, { image: image, caption: true }));
        const cardElement = container.firstChild;
        expect(cardElement).toHaveClass("relative flex flex-col my-6 p-4 text-chilean-fire-500 bg-clip-border rounded-xl w-50");
        expect(container.querySelector("div.relative.m-4.text-chilean-fire-500.bg-clip-border.rounded-xl")).toBeInTheDocument();
        expect(container.querySelector("p.text-white.text-lg.font-bold.mt-2")).toBeInTheDocument();
    });
});
