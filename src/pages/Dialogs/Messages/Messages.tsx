import React, { FC, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { TOpponent, TOpponentMessages } from "../../../api/dialogsAPI";
import { TUserProfile } from "../../../types/types";
import userImage from '../../../assets/images/user.png';
import styles from './Messages.module.css';

export const Messages: FC<TProps> = ({ messages, currentOpponent, authProfile }) => {
    const divRef = useRef(null)

    const scrollToBottom = () => {
        divRef.current?.scrollIntoView({ block: 'end' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return <div className={styles.wrapper}>
        {currentOpponent.id
            ? messages.map(m => {
                return <div key={m.id} className={styles.messageWrapper}>
                    <div className={styles.photoWrapper}>
                        <Link to={`/users/${m.senderId}`}>
                            <img
                                src={currentOpponent.id === m.senderId
                                    ? currentOpponent.photos.small || userImage
                                    : authProfile.photos.small || userImage}
                                alt='фото пользователя'
                                width='30px'
                                className={styles.photo}
                            />
                        </Link>
                    </div>
                    <div>
                        <p className={styles.senderName}>{m.senderName}</p>
                        <p className={styles.message}>{m.body}</p>
                    </div>
                </div>
            })
            : <div className={styles.chooseOpponent}>Выберите собеседника</div>}
            <div ref={divRef}></div> {/* for autosrolling to this div */}
    </div>
}


type TProps = {
    messages: TOpponentMessages[]
    currentOpponent: TOpponent
    authProfile: TUserProfile
}