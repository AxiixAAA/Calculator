import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Preloader } from '../../components/common/Preloader/Preloader'
import { sendMessage, startChatListener, stopChatListener } from '../../store/reducers/chatReducer'
import { getIsLogged } from '../../store/selectors/authSelector'
import { getChatConnectStatusSelector, getChatMessagesSelector, isFetchingSelector } from '../../store/selectors/chatSelector'
import { InputMessage } from './InputMessage/InputMessage'
import { Messages } from './Messages/Messages'

const ChatPage: FC = () => {
    const messages = useSelector(getChatMessagesSelector)
    const isLogged = useSelector(getIsLogged)
    const isFetching = useSelector(isFetchingSelector)
    const connectStatus = useSelector(getChatConnectStatusSelector)
    const dispatch = useDispatch()
    const handleSendMessage = (message: string) => {
        dispatch(sendMessage(message))
    }
    useEffect(() => {
        dispatch(startChatListener())
        return () => {
            dispatch(stopChatListener())
        }
    }, [dispatch])

    return (
        <>
            {isFetching
                ? <Preloader />
                : <Messages messages={messages} /> }
            {isLogged && <InputMessage handleSendMessage={handleSendMessage} connectStatus={connectStatus} />}
        </>
    )
}

export default ChatPage