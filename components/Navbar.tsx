import LoginBtn from "./LoginBtn";


export default function Navbar() {
    return (
        <section className="p-4 bg-white backdrop-blur-xl bg-opacity-50 w-screen fixed">
            <nav className="flex justify-between">
                <h1 className="text-gray-800 text-2xl font-extrabold">Web3 ShortLink</h1>
                <LoginBtn />
                {/* <LogoutBtn /> */}
            </nav>
        </section>
    )
}