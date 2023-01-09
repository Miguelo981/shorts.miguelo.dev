
import GetStartedBtn from '../components/GetStartedBtn'

const menu = [
  {
    name: 'Home',
    id: 'home',
  },
  {
    name: 'About us',
    id: 'about-us',
  },
  {
    name: 'How Works',
    id: 'how-works',
  },
]

export default function Home() {
  return (
    <div>
      {/* <Navbar /> */}
      <header className='fixed p-6 bg-slate-400 backdrop-blur-xl bg-opacity-5 w-screen z-40 bottom-0 md:top-0 h-fit'>
          <nav className='mx-8 md:mx-12 xl:mx-20'>
            <ul className='flex space-x-6 items-center justify-center md:justify-end'>
              {
                menu.map((item, index) => (
                  <a href={`/#${item.id}`}>
                    <li className='text-md md:text-xl font-bold hover:text-pink-600' key={`menu-${index}`}>{ item.name }</li>
                  </a>
                ))
              }
            </ul>
          </nav>
        </header>
      <main className='mx-8 md:mx-12 xl:mx-20'>
          <section id="home" className='grid justify-items-center items-center h-screen'>
            <div className='flex justify-center items-center'>
              <div>
                <h1 className='font-black text-7xl mb-4 text-gray-800 dark:text-white'>
                  Web3
                  <br/>
                  <span className='text-[6rem] title-gradient'>Shorts</span>
                </h1>
                <h2 className='font-semibold text-xl mb-6 whitespace-pre-line'>{'Free URL shortener powered by\nEthereum Network validation'}</h2>
                <div className="sticky">
                  <GetStartedBtn text='Get started' className='app-cta-btn app-btn bg-gray-800 hover:bg-gray-600' />
                </div>
                {/* <div className='flex'>
                  <GetStartedBtn text='Get started' className='app-cta-btn app-btn bg-gray-800 hover:bg-gray-600' />
                </div> */}
              </div>
              <img className='w-1/2 hidden md:block' src='/assets/images/web3-bg-1.png' />
            </div>
          </section>
          <section id="about-us" className='grid justify-items-center items-center h-screen relative'>
            <div style={{ backgroundImage: `url("assets/images/web3-bg-2.png")` }} className='w-full h-[40rem] bg-no-repeat bg-contain top-0 -left-40 md:-left-80 xl:-left-60 absolute z-10' />
            <div className='z-20 max-w-full md:max-w-[50vw] text-center'>
              <h2 className='font-bold text-6xl mb-8'>What is <span className='font-black'>Web3 Shorts?</span></h2>
              <p className='text-xl mb-12'>Web3 is an easy to use dApp to shorten a URL or reduce a link. Use our URL Shortener to create a shortened link making it easy to remember without annoying sign on.</p>
              <p className='text-xl mb-12'>Just log in with your Metamask account and starting creating your shortened URLs.</p>
              <div className="sticky">
                <GetStartedBtn text='Get started' className='app-cta-btn-2 app-btn bg-gray-800 hover:bg-gray-600' />
              </div>
            </div>
          </section>
          {/* <section id="how-works" className='grid justify-items-center h-screen relative'>
            <div style={{ backgroundImage: `url("assets/images/web3-bg-2.png")` }} className='w-full h-[40rem] bg-no-repeat bg-contain top-0 -left-60 absolute z-10' />
            <div className='z-20'>
              <h2 className='font-bold text-6xl mb-8'>How It <span className='font-black'>Works?</span></h2>
              <video src=""></video>
            </div>
          </section> */}
      </main>
      {/* <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}
