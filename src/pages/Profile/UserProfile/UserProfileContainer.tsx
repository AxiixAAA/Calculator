import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import { getUserProfileThunk } from "../../../store/reducers/userProfileReducer";
import { UserProfile } from "./UserProfile";
import withNavigateToLogin from "../../../hoc/withNavigateToLogin";
import { getUserProfile } from "../../../store/selectors/userProfileSelector";
import { getAuthUserId } from "../../../store/selectors/authSelector";
import { useMatch } from "react-router-dom";

const UserProfileContainer: FC = () => {
    const dispatch = useDispatch()
    const authId = useSelector(getAuthUserId)
    const userProfile = useSelector(getUserProfile)
    const match = useMatch('/users/:userId');
    const matchUserId = match != null ? match.params.userId : authId
    useEffect(() => {
        dispatch(getUserProfileThunk(+matchUserId))
    }, [matchUserId, dispatch])

    return <UserProfile {...userProfile} />
}


export default compose<React.ComponentType>(
    withNavigateToLogin
)(UserProfileContainer)
