import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import image from '../../assets/images/error-404.png'
import styles from './Page404.module.css'

export const Page404: FC<{}> = () => {
    return <div className={styles.wrapper}>
        <div className={styles.content}>
            <h1 className={styles.h1}>Здесь нет такой страницы</h1>
            <div className={styles.home}>
                <Link to='/profile' className={styles.link}>Простити(</Link>
            </div>
            <div className={styles.div}>
                <img src={image} alt="" />
            </div>
        </div>
    </div>
}
