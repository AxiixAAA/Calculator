import React, { FC } from 'react'
import { Field, Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { getUserProfile } from '../../../../store/selectors/userProfileSelector';
import { TSetProfileData } from '../../../../types/types';
import styles from './EditProfile.module.css';

export const EditProfile: FC<TProps> = ({ handleEditProfileSubmit }) => {
    const userProfile = useSelector(getUserProfile)

    const {
        aboutMe,
        lookingForAJob,
        lookingForAJobDescription,
        fullName
    } = userProfile
    const {
        github,
        vk,
        facebook,
        instagram,
        twitter,
        website,
        youtube,
        mainLink
    } = userProfile.contacts

    const schema = yup.object().shape({
        aboutMe: yup.string().required(),
        lookingForAJob: yup.boolean().required(),
        fullName: yup.string().required(),
        contacts: yup.object().shape({
            github: yup.string().url('неправильный url-адрес'),
            vk: yup.string().url('неправильный url-адрес'),
            facebook: yup.string().url('неправильный url-адрес'),
            instagram: yup.string().url('неправильный url-адрес'),
            twitter: yup.string().url('неправильный url-адрес'),
            website: yup.string().url('неправильный url-адрес'),
            youtube: yup.string().url('неправильный url-адрес'),
            mainLink: yup.string().url('неправильный url-адрес')
        })
    })

    return (
        <div>
            <Formik
                initialValues={{
                    aboutMe: aboutMe || '',
                    lookingForAJob: lookingForAJob || false,
                    lookingForAJobDescription: lookingForAJobDescription || '',
                    fullName: fullName || '',
                    contacts: {
                        github: github || '',
                        vk: vk || '',
                        facebook: facebook || '',
                        instagram: instagram || '',
                        twitter: twitter || '',
                        website: website || '',
                        youtube: youtube || '',
                        mainLink: mainLink || ''
                    }
                }}
                validateOnBlur
                validationSchema={schema}
                onSubmit={(values) => {
                    handleEditProfileSubmit(values)
                }}
            >
                {({ errors, values }) => (
                    <Form className={styles.form}>
                        <div className={styles.div}>
                            <label htmlFor='aboutMe'>Обо мне</label>
                            <div className={styles.divWithReqField}>
                                <Field className={styles.input} type='textarea' name='aboutMe' placeholder='Расскажите о себе' id='aboutMe'/>
                                {errors.aboutMe && <span className={styles.error}>Обязательно</span>}
                            </div>
                        </div>
                        <div className={styles.checkboxDiv}>
                            <Field type='checkbox' name='lookingForAJob' id='checkbox' />
                            <label htmlFor="checkbox">В поисках работы</label>
                        </div>
                        <Field className={styles.input} type='textarea' name='lookingForAJobDescription' placeholder='Описание работы' disabled={!values.lookingForAJob} />
                        <div className={styles.div}>
                            <label htmlFor='fullName'>Имя</label>
                            <div className={styles.divWithReqField}>
                                <Field className={styles.input} type='input' name='fullName' placeholder='Введите имя' id='fullName' />
                                {errors.fullName && <span className={styles.error}>Обязательно</span>}
                            </div>
                        </div>
                        {Object.keys(userProfile.contacts).map(key => {
                            return <div key={key} className={styles.div}>
                                <label htmlFor={key}>{key}</label>
                                <div className={styles.contactDiv}>
                                    <Field className={styles.input} type='input' name={`contacts.${key}`} placeholder='введите URL-адрес' id={key} />
                                    {errors.contacts && errors.contacts[key] && <span className={styles.error}>Неправильный URL-адрес. Пример: https://anysite.com</span>}
                                </div>
                            </div>
                        })}
                        <div className={styles.buttonSubmitDiv}>
                            <button type='submit' className={styles.buttonSubmit}>Отправить</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}


type TProps = {
    handleEditProfileSubmit: (vales: TSetProfileData) => void
}
