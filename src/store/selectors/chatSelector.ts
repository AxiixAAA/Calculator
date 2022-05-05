import { TGlobalState } from "../reduxStore"

export const getChatMessagesSelector = (state: TGlobalState) => state.chat.messages
export const getChatConnectStatusSelector = (state: TGlobalState) => state.chat.connectStatus
export const isFetchingSelector = (state: TGlobalState) => state.chat.isFetching