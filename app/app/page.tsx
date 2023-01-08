"use client"

import { useFormik } from "formik";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import Loading from "../../components/Loading";
import ShortURLDetail from "../../components/ShortURLDetail";
import ShortURLForm from "../../components/ShortURLForm";
import { TOKEN_COOKIE_NAME } from "../../config/auth";
import { ShortURl } from "../../models/shortUrl.model";

const DEFAULT_PAGE = 1, DEFAULT_LIMIT = 25;

export default function AppPage() {
    const [shortURLs, setShortURLs] = useState<ShortURl[]>([]);
    const [queryLoading, setQueryLoading] = useState<boolean>(true);
    const searchParams = useSearchParams()
    const [cookie, setCookie] = useCookies();

    const formik = useFormik({
        initialValues: { 
            name: '',
            status: -1,
        },
        onSubmit: () => {}
    })

    const getShortUrls = async (page: number | string, limit: number | string) => {
        return fetch(`${process.env.NEXT_PUBLIC_HOST}/${process.env.NEXT_PUBLIC_API_V}/short-urls/my-shorts?page=${page}&limit=${limit}`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookie[TOKEN_COOKIE_NAME]}`
            }
        })
        .then(res => { 
            setQueryLoading(false); 
            return res.json()
        })
        .catch(err => { 
            setQueryLoading(false); 
            //TODO handle error
        })
    }

    const handleSearch = () => {
        const page = searchParams.get('page'), limit = searchParams.get('limit');

        //if (typeof page !== "string" || typeof limit !== "string") return;
        getShortUrls(page || DEFAULT_PAGE, limit || DEFAULT_LIMIT)
            .then(data => setShortURLs(data || []))
            .catch(console.log)
    }

    useEffect(() => {
        handleSearch();
    }, [])

    const handleOnCreate = () => {
        formik.resetForm();
        handleSearch();
    }

    const filteredLinks = useMemo(() => {
        shortURLs.map((s) => console.log(s, formik.values.status === -1, s.status === formik.values.status))
        return shortURLs.filter(s => (s.name.toLocaleUpperCase().includes(formik.values.name.toUpperCase()) || 
            s.originalURL.toLocaleUpperCase().includes(formik.values.name.toUpperCase())) &&
            (formik.values.status === -1 || s.status === formik.values.status)
        )
    }, [shortURLs, formik.values.name, formik.values.status])
    
    return (
        <section className="w-full h-screen px-5 md:px-10 flex flex-col justify-center gap-5 md:gap-10 pt-[5rem] md:pt-[6.5rem] lg:pt-0">
            <div className="app-container flex flex-col lg:flex-row justify-between gap-4 divide-y-2 md:divide-y-0">
                <ShortURLForm onCreate={handleOnCreate} />
                <form className="flex justify-between md:justify-center gap-4 pt-4 md:pt-0">
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='app-label'>Search:</label>
                        <input className='app-input w-full' name="name" type="text" placeholder="Search..." value={formik.values.name} onChange={formik.handleChange} />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="status" className='app-label'>Status:</label>
                        <select name="status" onChange={(event) => formik.setFieldValue('status', Number(event.target.value))} value={formik.values.status} 
                            className="app-input">
                            <option key={`status--1`} value="-1">All</option>
                            <option key={`status-1`} value="0">Draft</option>
                            <option key={`status-0`} value="1">Published</option>
                        </select>
                    </div>
                </form>
            </div>
            <div className="app-container space-y-4 overflow-y-auto scrollbar max-h-[45vh] md:max-h-[60vh]">
                {
                    queryLoading ?
                        <div className="flex w-full justify-center">
                            <Loading color="rgb(79 70 229) transparent" />
                        </div>
                    :
                        filteredLinks.map((s, index) => (
                            <ShortURLDetail key={`surl-${index}`} shortURL={s} onDelete={handleSearch} />
                        ))
                }
            </div>
        </section>
    )
}