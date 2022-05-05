import React, { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import logo from "../../../assets/images/network.png"
import { actionCreators, logoutThunk } from "../../../store/reducers/authReducer"
import { getAuthData, getNavMenuSelector } from "../../../store/selectors/authSelector"
import styles from "./Logged.module.css"

export const Logged: FC = () => {
    const data = useSelector(getAuthData)
    const isNavMenu = useSelector(getNavMenuSelector)
    const dispatch = useDispatch()
    return (
        <header className={styles.header}>
            <img className={styles.logo} src={logo} alt='logo' />
            <div className={!isNavMenu ? styles.mobileBurger : styles.mobileCross} onClick={() => { dispatch(actionCreators.toggleNavMenu(!isNavMenu)) }}></div>
            <div className={!isNavMenu ? styles.linkDiv : styles.mobileLinkDiv}>
                <Link to={'/profile'} className={`${styles.link} ${styles.userName}`}>{data.login}</Link>
                <button onClick={() => {
                    dispatch(logoutThunk())
                    dispatch(actionCreators.toggleNavMenu(!isNavMenu))
                }} className={styles.exit}>Выйти</button>
            </div>
        </header>
    )
}
