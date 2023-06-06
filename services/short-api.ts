import { API_HOST, API_VERSION } from "../constants"
import { ShortURl } from "../models/shortUrl.model"

export const getOriginalShortURL = async (id: string): Promise<ShortURl | any> => {
    return fetch(`${API_HOST}/${API_VERSION}/short-urls/${id}`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch()
}

export const getMyUser = async (token?: string) => {
    return fetch(`${API_HOST}/${API_VERSION}/user/me`,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
}

export const createUser = async (token?: string) => {
    return fetch(`${API_HOST}/${API_VERSION}/user/register`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
}