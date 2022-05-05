import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { TOpponent } from '../../../api/dialogsAPI';
import { actionCreators, getDialogWithOpponent } from '../../../store/reducers/dialogsReducer';
import userImage from '../../../assets/images/user.png';
import styles from './Opponents.module.css';

export const Opponents: FC<TProps> = ({ opponents }) => {
    const dispatch = useDispatch()

    const handleClick = (opponent: TOpponent) => {
        dispatch(getDialogWithOpponent(opponent.id))
        dispatch(actionCreators.setCurrentOpponent(opponent))
    }

    return <div className={styles.wrapper}>
        {opponents.map(o => {
            return <div key={o.id} onClick={() => handleClick(o)} className={styles.opponent}>
                <img src={o.photos.small || userImage} alt={o.userName} className={styles.photo} width='30px' />
                <p className={styles.name}>{o.userName}</p>
            </div>
        })}
    </div>
}


type TProps = {
    opponents: TOpponent[]
}