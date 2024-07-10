import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ImageCard = ({ image, caption = false }) => {
    return (_jsxs("div", { className: "relative flex flex-col my-6 p-4 text-chilean-fire-500 bg-clip-border rounded-xl w-50", children: [_jsx("div", { className: "relative m-4 text-chilean-fire-500 bg-clip-border rounded-xl", children: _jsx("img", { className: "object-cover object-center w-full h-[25rem] rounded-lg", src: image.large?.toString(), alt: image.caption || "Image" }) }), _jsx("div", { className: "flex flex-col items-center justify-center", children: caption && _jsx("p", { className: "text-white text-lg font-bold mt-2", children: image.caption }) })] }));
};
export default ImageCard;
