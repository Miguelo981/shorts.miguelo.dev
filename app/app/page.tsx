import ShortURLForm from "../../components/ShortURLForm";
import ShortURlList from "../../components/ShortURLList";

export default async function AppPage() {
    return (
        <section className="w-screen h-screen px-5 md:px-10 flex flex-col justify-center">
            <div className="app-container mb-10">
                <ShortURLForm />
            </div>
            <div className="app-container">
                <ShortURlList />
            </div>
        </section>
    )
}