type CreatedByProps = {
    name?: string;
    url?: string;
}

export default function CreatedBy({ name="@Miguelo981", url="https://twitter.com/Miguelo981" }: CreatedByProps) {
    return (
        <a className="p-2 bg-black text-white hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 rounded-tl-xl font-semibold dark:text-black hidden md:block fixed z-50 bottom-0 right-0" target="_blank" rel="noreferrer" href={url}>by { name }</a>
    )
}