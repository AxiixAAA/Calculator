import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStatusThunk } from "../../../../store/reducers/userProfileReducer";
import { getAuthUserId } from "../../../../store/selectors/authSelector";
import { getStatus, getUserId } from "../../../../store/selectors/userProfileSelector";
import styles from "./StatusInput.module.css";

export const StatusInput: FC = () => {
    const dispatch = useDispatch()
    const status = useSelector(getStatus)
    const userId = useSelector(getUserId)
    const authUserId = useSelector(getAuthUserId)
    const [editMode, setEditMode] = useState(false)
    const [statusValue, setStatusValue] = useState(status)
    
    useEffect(() => setStatusValue(status), [status])

    const handleClick = () => {
        if (userId === authUserId) {
            setEditMode(true)
        }
    }

    const handleOnBlur = () => {
        dispatch(updateStatusThunk(statusValue))
        setEditMode(false)
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatusValue(event.target.value)
    }

    return (
        <div className={styles.div}>
            {!!editMode
                ? <input className={styles.input}
                    type="text" placeholder="Чего расскажешь?"
                    defaultValue={statusValue}
                    onBlur={handleOnBlur}
                    onChange={handleOnChange}
                    autoFocus={true} />
                : userId === authUserId
                    ? <p className={styles.pForAuthUser} onClick={handleClick}>{ status || 'жмяк ми'}</p>
                    : <p className={styles.p}>{ status || ''}</p> }
        </div>
    )
}
