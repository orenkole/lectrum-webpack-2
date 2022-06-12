import React from "react";
import myImg from "../theme/images/l4-1.png"
import {default as ThumbUp} from "../theme/images/thumbs-up.svg"
import thumbsUp from "../theme/images/thumbs-up.svg"
import styles from "../theme/main.css";

export const MyDom = () => {
    return (
        <div>
            hello
            <img src={myImg} className={styles.image}/>
            <ThumbUp />
            <img src={thumbsUp}/>
        </div>
    )
}
