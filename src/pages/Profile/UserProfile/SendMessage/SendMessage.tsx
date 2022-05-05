import React, { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { sendMessage } from '../../../../store/reducers/dialogsReducer'
import styles from './SendMessage.module.css'

export const SendMessage: FC<TProps> = ({ userId, isOwner }) => {
    const dispatch = useDispatch()
    const [value, setValue] = useState('')
    const [isTyping, setTyping] = useState(false)
    const [isSended, setSended] = useState(false)
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    const handleClick = () => {
        dispatch(sendMessage(userId, value))
        setValue('')
        setSended(true)
    }

    return (
        !isOwner && <div className={styles.wrapper}>
            {!isSended // if message has been sent, show Link
                ? !isTyping // if click on 'Написать сообщение', show Input
                    ? <span className={styles.write} onClick={() => setTyping(true)}>Написать сообщение</span>
                    : <div>
                        <input className={styles.input} type="text" autoFocus value={value} onChange={handleChange} />
                        <button className={styles.sendBtn} onClick={handleClick}>✓</button>           
                        <button className={styles.cancelBtn} onClick={() => setTyping(false)}>✗</button>
                    </div>
                : <div>
                    <span className={styles.sended}>Отправлено!</span>
                    <Link to={'/dialogs'} className={styles.link}>Перейти в диалоги</Link>
                </div>}
        </div>
    )
}


type TProps = {
    userId: number
    isOwner: boolean
}