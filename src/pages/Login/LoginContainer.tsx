import React, { FC } from 'react'
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { getIsLogged } from "../../store/selectors/authSelector";
import {Login} from "./Login"

export const LoginContainer: FC = () => {
    const isLogged = useSelector(getIsLogged)
    if (isLogged) return <Navigate to={'/profile'} />

    return <Login />
}
