import React from 'react';
import Gallery from './gallery';
import ImageCard from './imageCard';
import styleMap from './styleMap';

type StyleGalleryProps = {
  onClick: (styleUrl: string) => void;
};

const StyleGallery: React.FC<StyleGalleryProps> = ({ onClick }) => {

  return (
    <div className="pt-8">
      <h1 className="text-lg font-bold">Choose a style.</h1>

      <Gallery>
        {Object.keys(styleMap).map((styleUrl) => (
          <ImageCard
            key={styleUrl}
            imageUrl={styleMap[styleUrl].preview} // Use the preview URL from styleMap
            styleName={styleMap[styleUrl].styleName} // You might need to add styleName to your styleMap
            onClick={() => onClick(styleUrl)}
            styleUrl={styleUrl}
          />
        ))}
      </Gallery>
    </div>
  );
};

export default StyleGallery;
