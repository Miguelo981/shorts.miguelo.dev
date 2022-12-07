'use client'

import { useFormik } from "formik";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { TOKEN_COOKIE_NAME } from "../config/auth";
import { ShortURl } from "../models/shortUrl.model"

type ShortURLDetailProps = {
    shortURL: ShortURl;
}

export default function ShortURLDetail({ shortURL }: ShortURLDetailProps) {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [cookie, setCookie] = useCookies();

    const formik = useFormik({
        initialValues: shortURL,
        onSubmit: values => {},
      });


    const editShortURL = async (id: string, shortURL: ShortURl) => {
        return fetch(`${process.env.HOST}/${process.env.API_V}/short-urls/${id}`,
        {
            method: "PUT",
            body: JSON.stringify(shortURL),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie[TOKEN_COOKIE_NAME]}`
            }
        })
        .then(res => res.json())
    }
    
    const handleEdit = async () => {
        editShortURL(shortURL._id!, formik.values)
    }

    return (
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-3 space-y-4 md:space-y-0 md:items-end">
            {
                isEdit ?
                <form action="" onSubmit={formik.handleSubmit} className="flex flex-col md:flex-row space-x-0 md:space-x-3 space-y-4 md:space-y-0 md:items-end">
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='app-label'>Name:</label>
                        <input className='app-input' name="name" type="text" value={formik.values.name} onChange={formik.handleChange} />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="originalURL" className='app-label'>URL:</label>
                        <input className='app-input' name="originalURL" type="text" value={formik.values.originalURL} onChange={formik.handleChange} />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="status" className='app-label'>Status:</label>
                        <select className='app-input' name="status" value={formik.values.status} onChange={formik.handleChange}>
                            
                        </select>
                    </div>
                    <button className='app-btn rounded-full py-2 px-12 border-transparent shadow-lg text-white h-full'>Create</button>
                </form>
                : 
                <>

                </>
            }
            <button className="app-btn" onClick={event => isEdit ? handleEdit() : setIsEdit(!isEdit)}>{ isEdit ? 'Save' : 'Edit' }</button>
        </div>
    )
}