import React, { FC } from 'react'
import { Link } from 'react-router-dom';
import userImage from '../../assets/images/user.png';
import { TUser } from '../../types/types';
import styles from './Users.module.css';

export const User: FC<TProps> = ({ user , inProgressFollow, followThunk, unfollowThunk }) => {
    const followButtons = (user: TUser) => {
        return user.followed
            ? <button disabled={inProgressFollow.includes(user.id)} className={styles.button} onClick={(event) => {
                event.preventDefault();
                unfollowThunk(user.id)
            }}> Unfollow </button>
            : <button disabled={inProgressFollow.includes(user.id)} className={styles.button} onClick={(event) => {
                event.preventDefault();
                followThunk(user.id)
            }}> Follow </button>
    }
    return (
        <div className={styles.user} key={user.id}>
            <Link to={'/users/' + user.id} className={styles.link}>
                <div className={styles.userWarp}>
                    <div className={styles.avaSide}>
                        <img src={user.photos.small != null ? user.photos.small : userImage} alt={`Фото пользователя ${user.name}`} width='50px' />
                        {followButtons(user)}
                    </div>
                    <div className={styles.descriptionSide}>
                        <span className={styles.name}>Имя:
                            <span className={styles.nameText}> {user.name}</span>
                        </span>
                        <span className={styles.adress}>ID:
                            <span className={styles.adressText}> {user.id}</span>
                        </span>
                        <span className={styles.message}>
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}


type TProps = {
    user: TUser
    inProgressFollow: number[]
    followThunk: (id: number) => void
    unfollowThunk: (id: number) => void
}
