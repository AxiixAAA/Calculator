export const lineBreaker = (message: string, lineLength: number): string => {
    if(message.length < lineLength) {
        return message
    } else {
        return message.slice(0, lineLength) + '' + lineBreaker(message.slice(30), lineLength)
    }
}