import React from "react";
import ArrowRight from "../../../icons/arrow-right.png"
import ArrowLeft from "../../../icons/arrow-left.png"

export default function BtnScroll({...props}) {

    return(
        <div class="button-box-scroll">
            <img src={props.side == "left" ? ArrowLeft : ArrowRight} class="button-elem-scroll"/>
            <span class="button-elem-scroll">
                <img src={props.side == "left" ? ArrowLeft : ArrowRight} class="button-elem-scroll"/>
            </span>
        </div>
    )
}