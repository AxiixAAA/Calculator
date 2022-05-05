import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { getAuthData } from '../../store/selectors/authSelector';
import {Logged} from './Logged/Logged';
import {UnLogged} from './UnLogged/UnLogged';

export const Header: FC = () => {
    const data = useSelector(getAuthData)
    return data.isLogged
        ? <Logged />
        : <UnLogged />
}
