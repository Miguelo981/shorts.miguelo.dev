"use client"
import { useFormik } from 'formik';
import type { ShortURl } from '../models/shortUrl.model';
import { ShortURLStatus } from '../models/shortUrl.model';
import JSConfetti from 'js-confetti'

const defaultBody: ShortURl = {
    name: "",
    originalURL: "",
    status: ShortURLStatus.Draft,
}

const token = ""

export default function ShortURLForm() {
    const formik = useFormik({
        initialValues: defaultBody,
        onSubmit: values => {
            try {
                new URL(values.originalURL)
            } catch (err) {
                formik.errors.originalURL = "Invalid URL"
                formik.setFieldError('originalURL', "Invalid URL")
                return
            }

            fetch(`${process.env.HOST}/${process.env.API_V}/short-urls`,
            {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(data => new JSConfetti().addConfetti())
            .catch(err => console.log(err))
        },
      });

    return (
        <form action="" onSubmit={formik.handleSubmit} className="flex flex-col md:flex-row space-x-0 md:space-x-3 space-y-4 md:space-y-0 md:items-end">
            <div className='flex flex-col'>
                <label htmlFor="name" className='app-label'>Name:</label>
                <input className='app-input' name="name" type="text" value={formik.values.name} onChange={formik.handleChange} />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="originalURL" className='app-label'>URL:</label>
                <input className='app-input' name="originalURL" type="text" value={formik.values.originalURL} onChange={formik.handleChange} />
            </div>
            <button className='app-btn rounded-full py-2 px-12 border-transparent shadow-lg text-white h-full'>Create</button>
        </form>
    )
}