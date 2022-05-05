import { TSetProfileData, TUserProfile } from "../types/types"
import { instance, TResponseData } from "./api"

export const profileAPI = {
    async getProfile(userId: number) {
        const response = await instance.get<TUserProfile>(`profile/${userId}`)
        return response.data
    },
    async setProfile(profileData: TSetProfileData) {
        const response = await instance.put<TResponseData>(`profile`, profileData)
        return response.data
    },
    async setStatus(status: string) {
        const response = await instance.put<TResponseData>(`profile/status`, { status: status })
        return response.data
    },
    async getStatus(userId: number) {
        const response = await instance.get<string>(`profile/status/${userId}`)
        return response.data
    },
    async setPhoto(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)
        
        const response = await instance.put<TResponseData<TPhotoData>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    }
}

type TPhotoData = {
    photos: {
        small: string
        large: string
    }
}