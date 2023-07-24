"use client";

import Image from "next/image";
const ImageLoading = ({
  width,
  height,
  alt,
  href,
}: {
  width: number;
  height: number;
  alt: String;
  href: String;
}) => {
  const URL_STEAM_IMAGES =
    "https://steamcommunity-a.akamaihd.net/economy/image/";

  return (
    <div>
      <div>
        <Image
          alt={`icon url for ${alt}`}
          src={`${URL_STEAM_IMAGES}${href}`}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
};

export default ImageLoading;
