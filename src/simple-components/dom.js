import React from "react";
import myImg from "../theme/images/l4-1.png"
import {default as ThumbUp} from "../theme/images/thumbs-up.svg"
import thumbsUp from "../theme/images/thumbs-up.svg"
import styles from "../theme/main.css";

export const MyDom = () => {
    console.log(RELEASE)
    console.log(TWO)
    console.log(THREE)
    console.log(FOUR)
    console.log(TRUE_SIMPLE)
    console.log(TRUE_STRINGIFIED)
    return (
        <div>
            hello
            <img src={myImg}/>
            <ThumbUp />
            <img src={thumbsUp}/>
        </div>
    )
}
