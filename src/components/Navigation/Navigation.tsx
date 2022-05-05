import React, { FC, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { actionCreators } from '../../store/reducers/authReducer';
import { getIsLogged, getNavMenuSelector } from '../../store/selectors/authSelector';
import { FriendsFieldContainer } from '../FriendsField/FriendsFieldContainer';
import styles from './Navigation.module.css';

export const Navigation: FC = () => {
    const isLogged = useSelector(getIsLogged)
    const isNavMenu = useSelector(getNavMenuSelector)
    const dispatch = useDispatch()
    const handleClick = (e: MouseEvent<HTMLElement>) => {
        window.innerWidth < 600
        && dispatch(actionCreators.toggleNavMenu(!isNavMenu))
    }
    return <nav className={!isNavMenu ? styles.nav : styles.mobileNav} onClick={handleClick} >
        <ul className={styles.ul}>
            <li className={styles.li}>
                <NavLink className={navData => navData.isActive ? styles.active : styles.link} to='/profile'>Мой профиль</NavLink>
            </li>
            <li className={styles.li}>
                <NavLink className={navData => navData.isActive ? styles.active : styles.link} to='/dialogs'>Сообщения</NavLink>
            </li>
            <li className={styles.li}>
                <NavLink className={navData => navData.isActive ? styles.active : styles.link} to='/news'>Новости</NavLink>
            </li>
            <li className={styles.li}>
                <NavLink className={navData => navData.isActive ? styles.active : styles.link} to='/users'>Люди</NavLink>
            </li>
            <li className={styles.li}>
                <NavLink className={navData => navData.isActive ? styles.active : styles.link} to='/chat'>Чат</NavLink>
            </li>
        </ul>

        {isLogged && <FriendsFieldContainer />}
    </nav>
}
