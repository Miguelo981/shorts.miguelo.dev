'use client'

import { Document } from "@react-symbols/icons";
import { useFormik } from "formik";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { TOKEN_COOKIE_NAME } from "../config/auth";
import { ShortURl, ShortURLStatus } from "../models/shortUrl.model"
import { negativeFeedback, positiveFeedback } from "../services/toast";

type ShortURLDetailProps = {
    shortURL: ShortURl;
    onDelete?: () => void;
}

export default function ShortURLDetail({ shortURL, onDelete }: ShortURLDetailProps) {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [cookie, setCookie] = useCookies();

    const formik = useFormik({
        initialValues: shortURL,
        onSubmit: values => {},
      });


    const editShortURL = async (id: string, shortURL: ShortURl) => {
        return fetch(`${process.env.NEXT_PUBLIC_HOST}/${process.env.NEXT_PUBLIC_API_V}/short-urls/${id}`,
        {
            method: "PATCH",
            body: JSON.stringify(shortURL),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie[TOKEN_COOKIE_NAME]}`
            }
        })
        .then(res => res.json())
        .then(() => {
            setIsEdit(!isEdit);
            positiveFeedback('Shortened URL Updated!');
        })
        .catch(() => negativeFeedback('Unexpected error updating the URL'));
    }

    const handleDeleteResponse = () => {
        onDelete!();
        positiveFeedback('Shortened URL Deleted!');
    }

    const removeShortURL = async (id: string) => {
        return fetch(`${process.env.NEXT_PUBLIC_HOST}/${process.env.NEXT_PUBLIC_API_V}/short-urls/${id}`,
        {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie[TOKEN_COOKIE_NAME]}`
            }
        })
        .then(res => res.json())
        .then(handleDeleteResponse)
        .catch(() => negativeFeedback('Unexpected error deleting the URL'))
    }
    
    const handleEdit = async () => {
        editShortURL(shortURL._id!, formik.values)
    }
    
    const handleCopyShortURL = () => {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_SHORT_URL}?id=${shortURL.shortURLID}`);
        positiveFeedback('Shortened URL Copied!');
    }

    const handleDelete = () => {
        removeShortURL(shortURL._id!)
    }

    return (
        <section className="app-flex items-center justify-between pb-5 border-b-2 border-gray-100">
            {
                isEdit ?
                <form action="" onSubmit={formik.handleSubmit} className="app-flex w-full">
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
                            <select className='app-input' name="status" value={formik.values.status} onChange={(event) => formik.setFieldValue('status', Number(event.target.value))}>
                                <option value="0">Draft</option>
                                <option value="1">Published</option>
                            </select>
                        </div>
                </form>
                : 
                <div className="flex flex-wrap gap-4 items-center w-full">
                    <h3 className="font-bold">{formik.values.name}</h3>
                    <p className="truncate w-1/3 md:w-auto">{formik.values.originalURL}</p>
                    <span className={'app-status-box ' + (formik.values.status ? 'published' : !formik.values.status ? 'draft' : 'removed')}>{ShortURLStatus[formik.values.status]}</span>
                </div>
            }
            <div className="flex items-center space-x-3">
                <div className="cursor-pointer rounded-full p-2 bg-slate-200 hover:bg-slate-300 max-w-min transition ease-out active:scale-90" onClick={handleCopyShortURL}>
                    <Document width={20} />
                </div>
                <button className="app-btn" onClick={event => isEdit ? handleEdit() : setIsEdit(!isEdit)}>{ isEdit ? 'Save' : 'Edit' }</button>
                <button className="app-btn-remove" onClick={handleDelete}>Delete</button>
            </div>
        </section>
    )
}