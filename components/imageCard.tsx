import React from 'react';

const ImageCard = ({ imageUrl, styleName=null, onClick = null, styleUrl=''}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(styleUrl); 
    }
  };

  return (

    <div className="relative w-1/3 flex-wrap" onClick = {handleClick}>
      <div className="w-full p-1 md:p-2">
        <img
          src={imageUrl}
          className="block h-full w-full rounded-lg object-cover object-center"
        />
        {styleName && 
          <div className="cursor-pointer absolute inset-0 flex items-center justify-center bg-white bg-opacity-0 opacity-0 hover:opacity-100 hover:bg-opacity-20 transition-opacity">
            <p className="text-white font-bold p-2 rounded-md">{styleName}</p>
          </div>
        }
      </div>
    </div>
  );
};

export default ImageCard;
