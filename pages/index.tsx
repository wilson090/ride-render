import React, { useState } from 'react';
import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import MapComponent from '../components/map'
import StyleGallery from '../components/styleGallery'
import SaveInstructions from '../components/saveInstructions'
import UploadButton from '../components/uploadButton'
import Head from 'next/head'
import rideData from '../public/example_ride/ride.geojson';

require('dotenv').config();

type Props = {
}

const mapboxApiKey = process.env.MAPBOX_API_KEY || '';
const mapboxInitialStyle = 'mapbox://styles/wspearman/clmsnvedp01zo01rc6b84bz6y';
const geoJsonInitialData = JSON.parse(rideData);

export default function Index({ }: Props) {

  const [mapStyleUrl, setMapStyle] = useState(mapboxInitialStyle);
  const [geoJsonData, setGeoJsonData] = useState(geoJsonInitialData);

  function updateMapStyle(styleUrl: string) {
    setMapStyle(styleUrl);
  };

  function handleUpload(geoJson: any) {
    setGeoJsonData(geoJson);
  };

  return (
    <>
      <Layout>
        <Head>
          <title>{`RideRender`}</title>
        </Head>
        <Container>
          <Intro />
          <div className="container mx-auto">
            <div className="w-full flex h-[calc(3/4*100vh)]">
              <MapComponent mapboxApiKey={mapboxApiKey} mapStyleUrl={mapStyleUrl} geoJsonData={geoJsonData} />
            </div>
          </div>
          <UploadButton onUpload={handleUpload}/>
          <StyleGallery onClick={updateMapStyle}/>
          <SaveInstructions/>
        </Container>
        
        <div className="pb-14 sm:pb-16 lg:pb-18"></div>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  return {
    props: { },
  }
}
