import React from 'react';
import ImageCard from './imageCard';

const SaveInstructions = () => {
  return (
    <div className="pt-8">
        <h1 className="text-lg font-bold">Save the results.</h1>
        <div className="flex justify-center items-center">
            <ImageCard
                imageUrl="/save_img.png"
            />
        </div>
  </div>
);
};

export default SaveInstructions;

