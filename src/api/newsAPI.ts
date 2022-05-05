import axios from "axios";

const instance = axios.create({
    baseURL: 'https://newsdata.io/api/1'
})
const apiKey = '&apikey=pub_7040e5f1e34185e51d84adbe2b36c5de92bb'

export const newsAPI = {
    async getNews(page: number, categories?: TCategory[]) {
        const response = await instance.get<TNewsData>(`news?country=ru${apiKey}&category=${categories.join()}&page=${page}`);
        return response.data;
    }
}


export type TNewsData = {
    status: string
    totalResults: number
    results: TNews[]
    nextPage: number
}

export type TNews = {
    title: null | string
    link: null | string
    keywords: null | string[]
    creator: null | string[]
    video_url: null | string
    description: null | string
    content: null | string
    pubDate: null | string
    image_url: null | string
    source_id: null | string
    country: null | string[]
    category: null | string[]
    language: null | string
}

export type TCategory = 'sports' | 'technology' | 'top'