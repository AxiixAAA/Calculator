import { Field, Form, Formik } from "formik";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { TOpponent } from "../../../api/dialogsAPI";
import { sendMessage } from "../../../store/reducers/dialogsReducer";
import styles from "./InputField.module.css";

export const InputField: FC<TProps> = ({ currentOpponent }) => {
    const dispatch = useDispatch()

    return (
        <Formik
            initialValues={{
                textarea: ''
            }}
            onSubmit={(values, { resetForm }) => {
                dispatch(sendMessage(currentOpponent.id, values.textarea))
                resetForm({})
            }}>
            {currentOpponent.id
                && <Form className={styles.form}>
                    <Field
                        type='textarea'
                        name='textarea'
                        placeholder="Введите сообщение"
                        className={styles.input} />
                    <button type='submit' className={styles.button}>Отправить</button>
                </Form>}
        </Formik>
    )
}


type TProps = {
    currentOpponent: TOpponent
}