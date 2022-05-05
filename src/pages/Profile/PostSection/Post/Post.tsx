import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, getPost } from "../../../../store/reducers/profileReducer";
import { TGlobalState } from "../../../../store/reduxStore";
import styles from './Post.module.css'

export const Post: FC = () => {
    const posts = useSelector((state: TGlobalState) => state.profilePage.posts)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPost())
    }, [dispatch])
    return <>
        {posts.map(item => {
            let likesClasses = styles.likesCount;
            if (item.onLike) {
                likesClasses = styles.onLike
            }
            return (
                <div key={item.id} className={styles.post}>
                    <p className={styles.text}>{item.text}</p>
                    <p className={styles.likes}>
                        Likes: <span className={likesClasses}
                            onClick={() => dispatch(actionCreators.pressLike(item.id))}>
                            &#x2661; {item.likes}
                        </span>
                    </p>
                </div>
            )
        })}
    </>
}
