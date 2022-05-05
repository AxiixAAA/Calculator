import axios from "axios"

const instance = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com' })

export const postAPI = {
    async getRandomPost() {
        const response = await instance.get<TApiPost>(`posts/${Math.floor(Math.random() * 100)}`)
        return response.data
    }
}


export type TApiPost = {
    userId: number
    id: number
    title: string
    body: string
}
