import { instance, TResponseData } from "./api"

export const authAPI = {
    async getAuth() {
        const response = await instance.get<TResponseData<TAuthData>>('auth/me')
        return response.data
    },
    async login(values: TLoginValues) {
        const response = await instance.post<TResponseData<TLoginData>>('auth/login', values)
        return response.data
    },
    async logout() {
        const response = await instance.delete<TResponseData>('auth/login')
        return response.data
    },
    async getCaptcha() {
        const response = await instance.get<TCaptchaData>('security/get-captcha-url')
        return response.data
    }
}

export type TAuthData = {
    id: number
    email: string
    login: string
}
export type TLoginData = {
    userId: number
}
export type TLoginValues = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: boolean
}
type TCaptchaData = {
    url: string
    messages: []
}
