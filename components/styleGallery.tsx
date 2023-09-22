
import React from 'react';
import Gallery from './gallery';
import ImageCard from './imageCard';

type StyleGalleryProps = {
    onClick: (styleUrl: string) => void;
};
  

const StyleGallery: React.FC<StyleGalleryProps> = ({ onClick }) => {
    return (
        <div className="pt-8">
        <h1 className="text-lg font-bold">Choose a style.</h1>

        <Gallery>
            <ImageCard
            imageUrl="/previews/strava_dark.png"
            styleName="Strava Dark"
            onClick={onClick}
            styleUrl="mapbox://styles/wspearman/clmsnvedp01zo01rc6b84bz6y"
            />
            <ImageCard
            imageUrl="/previews/default.png"
            styleName="Default"
            onClick={onClick}
            styleUrl="mapbox://styles/mapbox/streets-v12"
            />
            <ImageCard
            imageUrl="/previews/map_preview.png"
            styleName="Strava Dark"
            onClick={onClick}
            />
            <ImageCard
            imageUrl="/previews/map_preview.png"
            styleName="Strava Dark"
            onClick={onClick}
            />
            <ImageCard
            imageUrl="/previews/map_preview.png"
            styleName="Strava Dark"
            onClick={onClick}
            />
        </Gallery>
    </div>
    );
};

export default StyleGallery;

