import { instance } from "./api"

export const dialogsAPI = {
    async getDialogsOpponents() {
        const response = await instance.get('dialogs')
        return response.data
    },
    async getDialogWithOpponent(userId: number, page?: number, count?: number) {
        const response = await instance.get<{items: TOpponentMessages[]}>(`dialogs/${userId}/messages?page=${page}&count=${count}`)
        return response.data
    },
    async sendUserMessage(userId: number, message: string) {
        const response = await instance.post(`dialogs/${userId}/messages`, { body: message })
        return response.data
    },
    async getMessagesFromUser(userId: number) {
        const response = await instance.get<TOpponent[]>(`dialogs/${userId}/messages`)
        return response.data
    },
    async startDialog(userId: number) {
        const response = await instance.post(`dialogs/${userId}`)
        return response.data
    }
}



export type TOpponent = {
    id: number
    userName: string
    hasNewMessages: boolean
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: {
        small: string | null
        large: string | null
    }
}
export type TOpponentMessages = {
    id: string
    body: string
    translatedBody: null | string
    addedAt: string
    senderId: number
    senderName: string
    recipientId: number
    viewed: boolean
}