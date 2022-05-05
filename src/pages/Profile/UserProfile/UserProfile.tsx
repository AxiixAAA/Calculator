import React, { ChangeEvent, FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userImage from "../../../assets/images/user.png";
import { Preloader } from "../../../components/common/Preloader/Preloader";
import { setPhoto, setProfileDataThunk } from "../../../store/reducers/userProfileReducer";
import { getAuthUserId } from "../../../store/selectors/authSelector";
import { TSetProfileData, TUserProfile } from "../../../types/types";
import { EditProfile } from "./EditProfile/EditProfile";
import { SendMessage } from "./SendMessage/SendMessage";
import { SocialLinks } from "./SocialsLinks/SocialLinks";
import { StatusInput } from "./StatusInput/StatusInput";
import { UserPhoto } from "./UserPhoto/UserPhoto";
import styles from "./UserProfile.module.css";

export const UserProfile: FC<TProps> = ({ aboutMe, contacts, lookingForAJob, lookingForAJobDescription, fullName, userId, photos }) => {
    const dispatch = useDispatch()
    const authId = useSelector(getAuthUserId)
    const isOwner = userId === authId;

    const [modalActive, setModalActive] = useState(false)
    const [editActive, setEditActive] = useState(false)

    const handleEditProfileSubmit = (values: TSetProfileData) => {
        dispatch(setProfileDataThunk(values))
        setEditActive(false)
    }

    const onPhotoSelected = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files.length) dispatch(setPhoto(event.target.files[0]))
    }

    if (!userId) { return <Preloader /> }
    return (
        <div className={styles.wrapper}>
            <div className={styles.photoWrapper}>
                {photos.large
                    ? <img src={photos.large} alt={fullName} className={styles.avaPhoto} onClick={() => setModalActive(true)} />
                    : <img src={userImage} alt={fullName} className={styles.avaImage} />}
                {isOwner
                    && <>
                        <label htmlFor="fileInput" className={styles.labelInput}>Загрузить фото</label>
                        <input type="file" id="fileInput" className={styles.fileInput} onChange={onPhotoSelected} />
                    </>}

            </div>
            <div className={styles.about}>
                <h2 className={styles.name}>{fullName}</h2>
                <div className={styles.status}>
                    <StatusInput />
                </div>
                <div className={styles.idDiv}>
                    <span className={styles.idSpan}>ID:</span>
                    <span>{userId}</span>
                </div>
                <div className={styles.div}>
                    {!lookingForAJob
                        ? <span className={styles.idSpan}>Работу не ищет</span>
                        : <div className={styles.jobDiv}>
                            <span className={styles.idSpan}>Работа:</span>
                            <span>
                                {lookingForAJobDescription}
                            </span>
                        </div>}
                </div>
                <div className={styles.div}>
                    {!aboutMe
                        ? <span className={styles.idSpan}>О себе ничего не рассказывает</span>
                        : <div className={styles.aboutDiv}>
                            <span className={styles.idSpan}>О себе:</span>
                            <span>
                                {aboutMe}
                            </span>
                        </div>}

                </div>
                <div className={styles.socialDiv}>
                    <div>
                        <SocialLinks fb={contacts.facebook}
                            web={contacts.website}
                            vk={contacts.vk}
                            tw={contacts.twitter}
                            inst={contacts.instagram}
                            yt={contacts.youtube}
                            git={contacts.github} />
                    </div>
                    {isOwner
                        &&<div>
                            {editActive
                                ? <button className={styles.closeEditButton} onClick={() => setEditActive(false)}></button>
                                : <button className={styles.openEditButton} onClick={() => setEditActive(true)}></button>}
                        </div>}
                </div>

                {isOwner
                    && <div className={editActive ? styles.formWrapper : styles.hideEditProfile }>
                        <EditProfile handleEditProfileSubmit={handleEditProfileSubmit} />
                    </div>}
                <div className={styles.startDialog}>
                    <SendMessage userId={userId} isOwner={isOwner} />
                </div>
            </div>

            <UserPhoto photo={photos.large} modalActive={modalActive} setModalActive={setModalActive} />
        </div>
    )
}


type TProps = TUserProfile