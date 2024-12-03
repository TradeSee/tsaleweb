import React from "react";
import { ImgDefault, RowContainer, TextDefault } from "../../../assets/styles";
import TradeUp from "../../../icons/upTrade.png"
import TradeDown from "../../../icons/downTrade.png"
import TradeNull from "../../../icons/NullTrade.png"

export default function TradeMetalsList({...props}) {
    return(
        <RowContainer style={{alignItems: "center"}}>
            <TextDefault color="#fff" size="18px" bold="800">{props.acron}</TextDefault>
            <ImgDefault src={props.state == 1 ? TradeUp : props.state == 0 ? TradeNull : TradeDown} width="10px" height="10px" style={{marginLeft: 7, marginRight: 3}}/>
            <TextDefault size='12px' color={props.state == 1 ? "#3BC17A" : props.state == 0 ? "#8a97aa" : "#E93939"} bold='700' style={{marginLeft: 4}}>{props.var}</TextDefault>
        </RowContainer>
    )
}