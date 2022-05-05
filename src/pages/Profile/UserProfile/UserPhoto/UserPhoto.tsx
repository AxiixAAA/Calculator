import React, { FC } from 'react'
import styles from './UserPhoto.module.css';

export const UserPhoto: FC<TProps> = ({ photo, modalActive, setModalActive }) => {
    return (
        <div className={modalActive ? styles.photoWrapper : styles.hide} onClick={() => setModalActive(false)}>
            <img className={styles.photo} src={photo} alt="Фото пользователя" onClick={(e) => e.stopPropagation()} />
        </div>
    )
}


type TProps = {
    photo: string
    modalActive: boolean
    setModalActive: (boolean: boolean) => void
}
