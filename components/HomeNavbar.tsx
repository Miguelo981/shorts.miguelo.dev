

import { Toaster } from "react-hot-toast"
import { scroller } from 'react-scroll'

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
    {
        name: 'FAQ',
        id: 'faq',
      },
]

export default function HomeNavbar() {
    const scrollTo = (id: string) => {
        scroller.scrollTo(id, {
            duration: 750,
            delay: 100,
            smooth: true,
            offset: 50,
        });
    }

    return (
        <header className='fixed p-6 bg-slate-400 backdrop-blur-xl bg-opacity-5 w-screen z-40 bottom-0 md:top-0 h-fit'>
            <Toaster position="bottom-center" />
            <nav className='mx-8 md:mx-12 xl:mx-20'>
                <ul className='flex space-x-6 items-center justify-center md:justify-end'>
                    {
                        menu.map((item) => (
                            <li className='' key={item.name}>
                                <a /* href={`/#${item.id}`} */ 
                                    onClick={() => scrollTo(item.id)}
                                    className="text-sm md:text-xl font-semibold hover:font-semibold hover:text-pink-600 cursor-pointer"
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </header>
    )
}