import React, { FC } from "react";
import loadingRing from "../../../assets/images/loadingRing.svg"
import styles from "./Preloader.module.css";

export const Preloader: FC = () => {
    return(
        <div className={styles.imgWrapper}>
            <img src={loadingRing} alt=""/>
        </div>
    )
}
