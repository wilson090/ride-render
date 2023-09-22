import { CMS_NAME } from '../lib/constants'

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-end md:justify-between mt-2 mb-2">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 align-bottom">
        RideRender
      </h1>
      <h4 className="text-center font-bold md:text-left text-lg mt-5 md:pl-8 pb-4">
        Turn your ride into an elegant map.
      </h4>
    </section>
  )
}

export default Intro
