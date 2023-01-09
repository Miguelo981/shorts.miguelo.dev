import GetStartedBtn from "./GetStartedBtn";

export default function Navbar() {
    return (
        <section className="p-4 bg-white dark:bg-gray-800 backdrop-blur-xl bg-opacity-50 w-screen fixed">
            <nav className="flex justify-between">
                <a href="/">
                    <h1 className='text-gray-800 dark:text-white text-lg md:text-2xl font-extrabold pt-1 md:pt-0'>
                        Web3 <span className='title-gradient text-xl md:text-3xl'>Shorts</span>
                    </h1>
                </a>
                <GetStartedBtn text='Log in' className='app-cta-btn app-btn bg-gray-900 hover:bg-gray-600' />
            </nav>
        </section>
    )
}