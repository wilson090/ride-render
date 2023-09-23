
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
            imageUrl="/previews/blueprint.png"
            styleName="Blueprint"
            onClick={onClick}
            styleUrl="mapbox://styles/wspearman/clmv38qdg020v01r82fnr56jw"
            />
            <ImageCard
            imageUrl="/previews/strava_orange.png"
            styleName="Strava Orange"
            onClick={onClick}
            styleUrl="mapbox://styles/wspearman/clmvad3cl006f01py0bcl73yz"
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

