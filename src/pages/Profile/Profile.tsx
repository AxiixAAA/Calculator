import React, { FC } from 'react';
import {PostSection} from './PostSection/PostSection';
import {Input} from './PostSection/InputField/Input';
import UserProfileContainer from './UserProfile/UserProfileContainer';
import style from './Profile.module.css';

export const Profile: FC = () => {
    return <div className={style.content}>
        <div className={style.userProfile}>
            <UserProfileContainer />
        </div>
        <div className={style.posts}>
            <Input />
            <PostSection />
        </div>
    </div>
}
