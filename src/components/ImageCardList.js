import { jsx as _jsx } from "react/jsx-runtime";
import ImageCard from "./ImageCard";
const ImageCardList = ({ persons, openModal }) => {
    return (_jsx("div", { className: "grid gap-4 grid-cols-5", "data-testid": "image-list", role: "image-list", children: persons.map(person => (_jsx("div", { className: "flex justify-center items-center col-span-1", children: _jsx("button", { "data-testid": "image-card", role: "button", onClick: () => openModal(person), children: _jsx(ImageCard, { image: person.images[0], caption: false }) }) }, person.id))) }));
};
export default ImageCardList;
