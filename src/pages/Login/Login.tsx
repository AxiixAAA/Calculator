import React, { FC } from "react";
import { Formik, Form, Field } from 'formik';
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../store/reducers/authReducer";
import { getCaptchaURL, getErrorMessage } from "../../store/selectors/authSelector";
import styles from "./Login.module.css";

export const Login: FC = () => {
    const errorMessage = useSelector(getErrorMessage)
    const captchaURL = useSelector(getCaptchaURL)
    const dispatch = useDispatch()

    const schema = yup.object().shape({
        email: yup.string().required('Обязательно').email('Неправильно, ебанные волки!'),
        password: yup.string().required('Обязательно')
    });

    const handleClick = () => {
        dispatch(loginThunk({
            email: 'free@samuraijs.com',
            password: 'free',
            rememberMe: false
            })
        )
    }

    return (
        <div className={styles.wrapper}>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    rememberMe: false,
                    captcha: false
                }}
                validateOnChange
                validationSchema={schema}
                onSubmit={(values) => {
                    dispatch(loginThunk(values))
                }}
            >
                {({ errors, touched, dirty, isValid, handleBlur }) => (
                    <>
                        <Form className={styles.form}>
                            <Field type='email' name='email' placeholder='e-mail' className={styles.input} onBlur={handleBlur} />
                            {touched.email && errors.email && <span>{errors.email}</span>}

                            <Field type='password' name='password' placeholder='пароль' className={styles.input} />
                            {touched.password && errors.password && <span>{errors.password}</span>}

                            {!!errorMessage && <div>{errorMessage}</div>}
                            {!!captchaURL
                                && <div className={styles.captchaWrapper}>
                                    <Field type='input' name='captcha' onBlur={handleBlur} />
                                    <img src={captchaURL} alt='' />
                                </div>}

                            <div className={styles.checkboxWrapper}>
                                <Field type='checkbox' name='rememberMe' id='rememberMe' className={styles.checkbox} />
                                <label htmlFor="rememberMe" className={styles.label}>Запомнить меня</label>
                            </div>
                            <button type='submit' disabled={!isValid || !dirty} >Погнали!</button>
                        </Form>
                    </>
                )}
            </Formik>
            <div className={styles.descr}>
                <p className={styles.phrase}>
                    <span className={styles.descrText}>Для входа без регистрации:</span>
                    <span >Email: </span>
                    <span className={styles.descData}>free@samuraijs.com</span>
                    <span >Password: </span>
                    <span className={styles.descData}>free</span>
                    <span className={styles.phrase}>Либо воспользоваться кнопкой <button onClick={handleClick}>Войти как гость</button></span>
                </p>
            </div>
            <div className={styles.descr}>

            </div>
        </div>
    )
}
