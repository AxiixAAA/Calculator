import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getFriends, getTotalFriends } from "../../store/selectors/friendsSelector";
import userImage from '../../assets/images/user.png';
import styles from './FriendsField.module.css';

export const FriendsField: FC = () => {
    const friends = useSelector(getFriends)
    const totalFriends = useSelector(getTotalFriends)

    const slicedFriends = friends.slice(0, 6)
    const friendRender = slicedFriends.map((item) => {
        return (
            <Link to={'/users/' + item.id} key={item.id} className={styles.link}>
                <img className={styles.img} alt='ava' src={item.photos.small || userImage} width='50px' />
                <p className={styles.p}>{item.name}</p>
            </Link>
        )
    })

    return (
        <section className={styles.friends}>
            <div  className={ styles.friendsHeaderWrap}>
                    <NavLink to='/friends' className={navData => navData.isActive ? styles.active : styles.friendsHeader}>
                        <span>Друзья</span>
                        <span>{totalFriends}</span>
                    </NavLink>
            </div>
            <div className={styles.friendsWrapper}>
                {friendRender}
            </div>
        </section>
    )

}
