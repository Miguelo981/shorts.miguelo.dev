import LoginBtn from "./LoginBtn";


export default function Navbar() {
    return (
        <section className="p-4 bg-white dark:bg-gray-800 backdrop-blur-xl bg-opacity-50 w-screen fixed">
            <nav className="flex justify-between">
                <h1 className="text-gray-800 dark:text-white text-lg md:text-2xl font-extrabold pt-1 md:pt-0">Web3 ShortLink</h1>
                <LoginBtn />
                {/* <LogoutBtn /> */}
            </nav>
        </section>
    )
}