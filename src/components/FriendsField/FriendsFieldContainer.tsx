import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {FriendsField} from "./FriendsField";
import { getFollowedFriends } from "../../store/reducers/friendsReducer";
import { getIsLogged } from "../../store/selectors/authSelector";

export const FriendsFieldContainer: FC = () => {
    const dispatch = useDispatch()
    const isLogged = useSelector(getIsLogged)

    useEffect(() => {
        dispatch(getFollowedFriends())
    }, [dispatch])

    return (
        isLogged && <FriendsField />
    )
}
