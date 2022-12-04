import ShortURLForm from "../../components/ShortURLForm";

export default function AppPage() {
    return (
        <section className="w-full h-screen grid place-content-center">
            <div className="rounded-2xl p-8 bg-white border-2 border-gray-100 shadow-xl">
                <ShortURLForm />
            </div>
        </section>
    )
}