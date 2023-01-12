
import GetStartedBtn from '../components/GetStartedBtn'
import RootLayout from './layout'
import Collapsible from 'react-collapsible';

const faqs = [
  {
    id: '',
    title: 'What is a URL shortener?',
    content: (
      <>
        <p>URL shortener or link shortener is a tool that shortens a long URL into a short link that redirects to the target URL.</p>

        <p>Cuttly is URL shortener where you can create and manage short links and track their click statistics.</p>
            
        <p>Cuttly is URL Shortener for creating branded short links. Short links created in Cuttly can be short links on the cutt.ly domain or short links on your own custom domain.</p>
            
        <p>Cuttly URL Shortener also allows you to use your own name, aliases otherwise known as back-half of a short link, so that each short link can be perfectly readable to the audience and generate more clicks than in the case of a standard URL.</p>
      </>
    ),
  },
  {
    id: '',
    title: 'What is a custom URL shortener?',
    content: (
      <>
        <p>A custom URL shortener or custom link shortener is a tool that allows you to edit short links and adapt them to your needs - so as to increase click-through rates.</p>

        <p>Cuttly is a custom URL shortener that allows advanced editing of short links so that you can support your brand.</p>
            
        <p>With Cuttly you can edit your short links in many ways. You can create random short links where the back-half of the short link is a random string of characters, but you can also give your own name and change the back-half of the short link in any way to make it more readable for your audience.</p>
            
        <p>It's not everything. In cuttly, you can also change the front-half of the short link, i.e. the domain to your own custom domain, and create short links that will support your brand.</p>
      </>
    ),
  },
  {
    id: '',
    title: 'What is a short link?',
    content: (
      <>
        <p>A short link is a link that has been shortened with a URL shortener. The short link redirects to the target URL. Cuttly's URL shortener allows you to manage a short link - you can change the back-half of a short link to your own. With Cuttly you can also manage ketos links. A standard short link is created in the domain that the link shortener assigns, in Cuttly it will be a link in the domain cutt.ly. There are also branded short links that you can easily create in Cuttly.f.</p>
      </>
    ),
  },
]

export default function Home() {
  return (
    <RootLayout>
      <div className='mx-8 md:mx-12 xl:mx-20'>
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
                  <GetStartedBtn text='Get started' className='app-cta-btn app-btn w-72 bg-gray-800 hover:bg-gray-900' />
                </div>
              </div>
              <img className='w-1/2 hidden md:block' src='/assets/images/web3-bg-1.png' />
            </div>
          </section>
          <section id="about-us" className='grid justify-items-center items-center h-screen relative'>
            <div style={{ backgroundImage: `url("assets/images/web3-bg-2.png")` }} className='w-full h-[40rem] bg-no-repeat bg-contain top-0 -left-40 md:-left-80 xl:-left-60 absolute z-10' />
            <div style={{ backgroundImage: `url("assets/images/web3-bg-2.png")` }} className='w-1/2 h-[40rem] bg-no-repeat bg-contain bottom-0 right-40 md:right-80 xl:-right-[35vw] absolute z-10' />
            <div className='z-20 max-w-full md:max-w-[50vw] text-center'>
              <h2 className='font-bold text-6xl mb-8'>What is <span className='font-black'>Web3 Shorts?</span></h2>
              <p className='text-xl mb-12'>Web3 is an easy to use dApp to shorten a URL or reduce a link. Use our URL Shortener to create a shortened link making it easy to remember without annoying sign on.</p>
              <p className='text-xl mb-12'>Powered by Metamask Wallet and <a className='text-pink-500 font-semibold' href="https://github.com/Miguelo981/web3-token" target="_blank">Web3 Token</a> authentication. ¡No Email, Password or Billing is needed!</p>
              <div className="sticky">
                <GetStartedBtn text='Get started' className='app-cta-btn-2 app-btn bg-gray-800 hover:bg-gray-600' />
              </div>
            </div>
          </section>
          <section id="how-works" className='grid justify-items-center items-center h-screen relative'>
            <div style={{ backgroundImage: `url("assets/images/web3-bg-2.png")` }} className='hidden md:block w-1/2 h-[40rem] bg-no-repeat bg-contain bottom-0 -right-[35vw] absolute z-10' />
            <div className='z-20 text-center'>
              <h2 className='font-bold text-6xl mb-8'>How It <span className='font-black'>Works?</span></h2>
              <div className='flex flex-col md:flex-row justify-center items-center gap-6'>
                <div className='w-full md:w-1/2'>
                  <div className='ml-auto md:w-3/4'>
                    <p className='text-xl mb-12'>Web3 Shorts is a URL Shortener and Link Management Platform with a lot of features that will help you handle all your links in an intuitive way and reveal the potential of your links.</p>
                    <p className='text-xl mb-12'>Just log in with your Metamask wallet and starting creating your shortened URLs.</p>
                    <div className="sticky">
                      <GetStartedBtn text='Start for Free' className='app-cta-btn-2 app-btn bg-gray-800 hover:bg-gray-600' />
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 h-[25rem] perspective">
                  <img src="/assets/images/app-screenshot.png" className="w-full h-auto rounded-2xl shadow-2xl shadow-pink-500 preserve-3d my-rotate-y-5" />
                </div>
              </div>
              {/* <div className='relative preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-1000'>
                <img className='' src="/assets/images/app-screenshot.png" alt="" />
              </div> */}
            </div>
          </section>
          <section id="faq" className='grid justify-items-center items-center h-[75vh] relative'>
            <div style={{ backgroundImage: `url("assets/images/web3-bg-3.png")` }} className='hidden md:block w-full h-[30rem] bg-no-repeat bg-contain bottom-0 sm:right-[45vw] xl:right-[35vw] rotate-[60deg] absolute z-10' />
            <div className='z-20 w-full md:w-1/2 space-y-4'>
              <h2 className='font-bold text-6xl mb-8 text-center'>Frequently <span className='font-black'>Asked Questions</span></h2>
              {
                faqs.map((item, index) => (
                    <Collapsible
                      key={index}
                      className='w-full' 
                      trigger={
                        <h3 className='border-b-2 border-pink-600 p-4 hover:bg-slate-800 text-pink-500 text-xl md:text-3xl font-semibold'>{item.title}</h3>
                      }
                    >
                      <div className='p-4 space-y-4 bg-slate-800 bg-opacity-50 rounded-b-3xl'>
                        {
                          item.content
                        }
                      </div>
                    </Collapsible>
                ))
              }
            </div>
          </section>
      </div>
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
      <section className='h-[50vh] relative overflow-hidden p-0'>
        <div className='w-screen h-screen bg-gradient-to-t from-pink-500 to-transparent absolute -bottom-[50vh]' />
      </section>
    </RootLayout>
  )
}
