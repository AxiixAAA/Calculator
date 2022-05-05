let subscribers = {
    'messages': [] as TMessageSubscribers[],
    'status': [] as TStatusSubscribers[]
}
let ws: WebSocket | null

const notifyStatusSubscribers = (status: TStatus) => {
    subscribers['status'].forEach(s => s(status))
}

const handleOpen = () => {
    notifyStatusSubscribers('OK')
}
const handleClose = () => {
    console.log('WS CLOSED');
    setTimeout(createChanel, 5000)
    notifyStatusSubscribers('connecting')
}
const handleMessage = (event: MessageEvent) => {
    const newMessages = JSON.parse(event.data)
    subscribers['messages'].forEach(s => s(newMessages))
}
const handleError = () => {
    console.log('WS ERROR');
    notifyStatusSubscribers('connecting')
}

const removeAllListeners = () => {
    ws?.removeEventListener('close', handleClose)
    ws?.removeEventListener('message', handleMessage)
    ws?.removeEventListener('open', handleOpen)
    ws?.removeEventListener('error', handleError)
}

const createChanel = () => {
    removeAllListeners()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifyStatusSubscribers('connecting')
    ws.addEventListener('open', handleOpen)
    ws.addEventListener('close', handleClose)
    ws.addEventListener('message', handleMessage)
    ws.addEventListener('error', handleError)
}

export const webSocket = {
    start: () => createChanel(),
    stop: () => {
        subscribers['messages'] = []
        subscribers['status'] = []
        removeAllListeners()
        ws?.close()
    },
    subscribe: (event: TEvents, callback: TMessageSubscribers | TStatusSubscribers) => {
        //@ts-ignore
        subscribers[event].push(callback)
    },
    unsubscribe: (event: TEvents, callback: TMessageSubscribers | TStatusSubscribers) => {
        //@ts-ignore
        subscribers[event] = subscribers[event].filter((s) => s !== callback)
    },
    sendMessage: (message: string) => {
        ws?.send(message)
    }
}


export type TMessages = {
    userId: number
    userName: string
    message: string
    photo: string
}
export type TStatus = 'connecting' | 'OK'
type TMessageSubscribers = (messages: TMessages[]) => void
type TStatusSubscribers = (status: TStatus) => void
type TEvents = 'messages' | 'status'