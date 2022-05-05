import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        // "api-key": "9243a6f9-d95e-4164-929d-e17b5c42d95f"
        "api-key": "a0450db5-9e30-42e8-a82d-905ff590711b"
    }
})

export type TResponseData<D = {}> = {
    data: D
    resultCode: number
    messages: string[]
}