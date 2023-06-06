
import { useFormik } from 'formik';
import type { ShortURl } from '../models/shortUrl.model';
import { ShortURLStatus } from '../models/shortUrl.model';
import JSConfetti from 'js-confetti'
import { useCookies } from 'react-cookie';
import { TOKEN_COOKIE_NAME } from '../config/auth';
import { negativeFeedback, positiveFeedback } from '../services/toast';

const defaultBody: ShortURl = {
    name: "",
    originalURL: "",
    status: ShortURLStatus.Draft,
}

type ShortURLFormProps = {
    onCreate: () => void;
} 

export default function ShortURLForm({ onCreate }: ShortURLFormProps) {
    const [cookie, setCookie] = useCookies();
    const formik = useFormik({
        initialValues: defaultBody,
        onSubmit: (values) => {
            try {
                new URL(values.originalURL)
            } catch (err) {
                formik.errors.originalURL = "Invalid URL"
                formik.setFieldError('originalURL', "Invalid URL")
                return
            }

            fetch(`${process.env.HOST}/${process.env.API_V}/short-urls/`,
            {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie[TOKEN_COOKIE_NAME]}`
                }
            })
            .then(res => res.json())
            .then(() => { onCreate(); new JSConfetti().addConfetti(); positiveFeedback('Short URL successfully created!') })
            .catch(() => negativeFeedback('Unexpected error getting short URLs'))
        },
      });

    return (
        <form method='POST' onSubmit={(event) => { event.preventDefault(); formik.handleSubmit(event); }} className="app-flex md:items-end justify-center">
            <div className='flex flex-col'>
                <label htmlFor="name" className='app-label'>Name:</label>
                <input className='app-input' name="name" type="text" value={formik.values.name} onChange={formik.handleChange} />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="originalURL" className='app-label'>URL:</label>
                <input className='app-input' name="originalURL" type="text" value={formik.values.originalURL} onChange={formik.handleChange} />
            </div>
            <button className='app-btn rounded-full py-2 px-12 border-transparent shadow-lg text-white h-[2.6rem]'>Create</button>
        </form>
    )
}