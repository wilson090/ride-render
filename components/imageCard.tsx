import React from 'react';

const ImageCard = ({ imageUrl }) => {
  return (
    <div className="flex w-1/3 flex-wrap">
      <div className="w-full p-1 md:p-2">
        <img
          src={imageUrl}
          className="block h-full w-full rounded-lg object-cover object-center"
        />
      </div>
    </div>
  );
};

export default ImageCard;
