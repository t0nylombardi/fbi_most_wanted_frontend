import React from "react";
import { Image } from "../services/types";

interface ImageCardProps {
  image: Image;
  caption: boolean;
}

const ImageCard = ({ image, caption = false }: ImageCardProps) => {
  return (
    <div className="relative flex flex-col my-6 p-4 text-chilean-fire-500 bg-clip-border rounded-xl w-50">
      <div className="relative m-4 text-chilean-fire-500 bg-clip-border rounded-xl">
        <img
          className="object-cover object-center w-full h-[20rem] rounded-lg"
          src={image.large?.toString()}
          alt={image.caption || "Image"}
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        {caption && <p className="text-white text-lg font-bold mt-2">{image.caption}</p>}
      </div>
    </div>
  );
};

export default ImageCard;
