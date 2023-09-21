import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import MapComponent from '../components/map'
import Head from 'next/head'
import Gallery from '../components/gallery'
import ImageCard from '../components/imageCard'

require('dotenv').config();

type Props = {
}

const mapboxApiKey = process.env.MAPBOX_API_KEY || '';

export default function Index({ }: Props) {

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
              <MapComponent mapboxApiKey={mapboxApiKey} />
            </div>
          </div>
          <Gallery>
            <ImageCard
              imageUrl="/previews/map_preview.png"
            />
            <ImageCard
              imageUrl="/previews/map_preview.png"
              />
            <ImageCard
              imageUrl="/previews/map_preview.png"
              />
          </Gallery>
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
