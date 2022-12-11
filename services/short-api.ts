import { ShortURl } from "../models/shortUrl.model"

export const getOriginalShortURL = async (id: string): Promise<ShortURl | any> => {
    return fetch(`${process.env.NEXT_PUBLIC_HOST}/${process.env.NEXT_PUBLIC_API_V}/short-urls/${id}`,
    {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .catch(console.log)
}