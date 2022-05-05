import { Dispatch } from "redux"
import { TMessages, TStatus, webSocket } from "../../api/wsAPI"
import { TThunkAction } from "../../types/types"
import { TReturnActionType } from "../reduxStore"

const MESSAGES_RECEIVED = 'chat/MESSAGE-RECEIVED'
const MESSAGES_REMOVED = 'chat/MESSAGE-REMOVED'
const CONNECT_STATUS_CHANGED = 'chat/CONNECT-STATUS-CHANGED'

const initialState = {
    messages: [] as TMessages[],
    connectStatus: 'connecting' || 'OK' as TStatus,
    isFetching: true
}

const chatReducer = (state = initialState, action: TAction): TState => {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return {
                ...state,
                messages: [...state.messages, ...action.messages],
                isFetching: false
            } 
        case MESSAGES_REMOVED:
            return {
                ...state,
                messages: [],
                isFetching: true
            }
        case CONNECT_STATUS_CHANGED:
            return {
                ...state,
                connectStatus: action.status
            }
        default:
            return state
    }
}

const actionCreators = {
    messagesReceived: (messages: TMessages[]) => ({type: MESSAGES_RECEIVED, messages} as const),
    messagesRemoved: () => ({type: MESSAGES_REMOVED} as const),
    statusChanged: (status: TStatus) => ({type: CONNECT_STATUS_CHANGED, status} as const)
}

let _handleDM: ((messages: TMessages[]) => void) | null = null
const handleDispatchMessages = (dispatch: Dispatch) => {
    if (_handleDM === null) {
        return (
            _handleDM = (messages) => dispatch(actionCreators.messagesReceived(messages))
        )
    }
    return _handleDM
}
let _handleDS: ((status: TStatus) => void) | null = null
const handleDispatchStatus = (dispatch: Dispatch) => {
    if (_handleDS === null) {
        return (
            _handleDS = (status) => dispatch(actionCreators.statusChanged(status))
        )
    }
    return _handleDS
}

export const startChatListener = (): TThunk => (dispatch) => {
    webSocket.start()
    webSocket.subscribe('messages', handleDispatchMessages(dispatch))
    webSocket.subscribe('status', handleDispatchStatus(dispatch))
}
export const stopChatListener = (): TThunk => (dispatch) => {
    webSocket.stop()
    webSocket.unsubscribe('messages', handleDispatchMessages(dispatch))
    webSocket.unsubscribe('status', handleDispatchStatus(dispatch))
    dispatch(actionCreators.messagesRemoved())
}
export const sendMessage = (message: string): TThunk => (dispatch) => {
    webSocket.sendMessage(message)
}

export default chatReducer


type TAction = TReturnActionType<typeof actionCreators>
type TState = typeof initialState
type TThunk = TThunkAction<TAction, void>
