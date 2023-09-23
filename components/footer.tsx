import Container from './container';

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 max-h-80">
      <Container>
        <div className="py-10 flex flex-col lg:flex-row items-center">
          <h3 className="text-l lg:text-[1.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Made by <a href="https://wilsonspearman.com" className="text-black hover:underline">Wilson Spearman</a>.
          </h3>
          <div className="lg:w-1/2 flex justify-end"> 
            <a
              href="https://github.com/wilson090/ride-render"
              className="bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              View on GitHub
            </a>   
          </div>         
        </div>
      </Container>
    </footer>
  )
}

export default Footer;
