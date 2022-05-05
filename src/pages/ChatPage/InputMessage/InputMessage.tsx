import React, { FC, useEffect, useState } from 'react'
import { TStatus } from '../../../api/wsAPI'
import styles from './InputMessages.module.css'

export const InputMessage: FC<TProps> = ({ handleSendMessage, connectStatus }) => {
    const [value, setValue] = useState('')
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)
    const handleSend = () => {
        handleSendMessage(value)
        setValue('')
    }
    const keyListener = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.code === 'Enter') {
            value.length !== 0 && handleSend()
        }
    }
    useEffect(() => {
        const textarea = document.getElementById('textarea')
        textarea.addEventListener('keydown', keyListener)
        return () => textarea.removeEventListener('keydown', keyListener)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])
    
    return <div className={styles.wrapper}>
        <textarea value={value} onChange={handleChange} className={styles.textarea} placeholder='Начни писать...' id='textarea' />
        <button disabled={connectStatus === 'connecting' || value.length === 0 } onClick={handleSend} className={styles.button}>
            { connectStatus === 'connecting'
                ? 'Загрузка...'
                : value.length === 0
                    ? 'Пусто'
                    : 'Отправить' }
            </button>
    </div>
}


type TProps = { 
    connectStatus: TStatus
    handleSendMessage: (message: string) => void
}