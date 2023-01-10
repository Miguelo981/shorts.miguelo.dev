"use client"

import { Toaster } from "react-hot-toast"

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

export default function HomeNavbar() {
    return (
        <header className='fixed p-6 bg-slate-400 backdrop-blur-xl bg-opacity-5 w-screen z-40 bottom-0 md:top-0 h-fit'>
            <Toaster position="bottom-center" />
            <nav className='mx-8 md:mx-12 xl:mx-20'>
                <ul className='flex space-x-6 items-center justify-center md:justify-end'>
                    {
                        menu.map((item, index) => (
                            <a href={`/#${item.id}`} key={`nav-${index}`}>
                                <li className='text-md md:text-xl font-bold hover:text-pink-600' key={`menu-${index}`}>{item.name}</li>
                            </a>
                        ))
                    }
                </ul>
            </nav>
        </header>
    )
}