import React from "react";
import { Image } from "../services/types";

interface ImageCardProps {
  image: Image;
}

const ImageCard = ({ image }: ImageCardProps) => {
  return (
    <div className="relative flex flex-col h-full my-6 p-4 text-chilean-fire-500 bg-clip-border rounded-xl w-96">
      <div className="relative  m-4 h-full overflow-hidden text-chilean-fire-500  bg-clip-border rounded-xl bg-blue-gray-500">
        <img src={image.large?.toString()} alt="card-image" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-white text-lg font-bold mt-2">{image.caption}</p>
      </div>
    </div>
  );
};

export default ImageCard;
