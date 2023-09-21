import React from 'react';

const Gallery = ({ children }) => {
  return (
    <div className="container mx-auto pt-20">
        <div className="-m-1 flex flex-wrap md:-m-2">
            {children}
        </div>
    </div>
  );
};

export default Gallery;
