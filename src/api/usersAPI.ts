import { instance, TResponseData } from "./api"

export const usersAPI = {
    async getUsers(currentPage: number, pageSize: number, searchTerm: string) {
        const response = await instance.get<TResponseUsers>(`users?page=${currentPage}&count=${pageSize}&term=${searchTerm}`)
        return response.data
    },
    async getFriends() {
        const response = await instance.get<TResponseUsers>(`users?count=100&friend=true`)
        return response.data
    },
    async searchUser(value: string) {
        const response = await instance.get<TResponseUsers>(`users?term=${value}`)
        return response.data
    }
}

export const followAPI = {
    async setFollow(id: number) {
        const response = await instance.post<TResponseData>(`follow/${id}`)
        return response.data
    },
    async setUnfollow(id: number) {
        const response = await instance.delete<TResponseData>(`follow/${id}`)
        return response.data
    }
}

type TResponseUsers = {
    items: TUser[]
    totalCount: number
    error: string
}
type TUser = {
    id: number
    name: string
    status: string
    photos:{
        small: string
        large: string
    }
    followed: boolean
}