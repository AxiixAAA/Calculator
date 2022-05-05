import React, { ComponentType, FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import withNavigateToLogin from "../../hoc/withNavigateToLogin";
import { getDialogsOpponents } from "../../store/reducers/dialogsReducer";
import { getUserProfileThunk } from "../../store/reducers/userProfileReducer";
import { getAuthUserId } from "../../store/selectors/authSelector";
import { getCurrentOpponentSelector, getOpponentMessagesSelector, getOpponentsSelector } from "../../store/selectors/dialogsSelector";
import { getUserProfile } from "../../store/selectors/userProfileSelector";
import { InputField } from "./InputField/InputField";
import { Messages } from "./Messages/Messages";
import { Opponents } from "./Opponents/Opponents";
import styles from './Dialogs.module.css';

const Dialogs: FC = () => {
    const dispatch = useDispatch()
    const authProfile = useSelector(getUserProfile)
    const currentOpponent = useSelector(getCurrentOpponentSelector)
    const messages = useSelector(getOpponentMessagesSelector)
    const opponents = useSelector(getOpponentsSelector)
    const authId = useSelector(getAuthUserId)
    useEffect(() => {
        dispatch(getDialogsOpponents())
        dispatch(getUserProfileThunk(authId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogList}>
                <Opponents opponents={opponents} />
            </div>
            <div className={styles.messages}>
                <Messages messages={messages}
                    currentOpponent={currentOpponent}
                    authProfile={authProfile}
                />
                <InputField currentOpponent={currentOpponent} />
            </div>
        </div>
    )
}

export default compose<ComponentType>(
    withNavigateToLogin
)(Dialogs)