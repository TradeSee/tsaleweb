import React from "react"
import { CardBackgr } from "./styles"
import { ColumnContainer, ImgDefault, RowContainer, TextDefault } from "../../../assets/styles"
import ArrowRight from "../../../icons/nextBlue.png"

export default function CardModule({...props}) {
    return(
        <CardBackgr className="cardServices" onClick={props.click}>
            <ImgDefault src={props.img} />
            <ColumnContainer style={{marginLeft: 20}}>
                <TextDefault size="120%" bold="800" color="#4b4b4b">{props.title}</TextDefault>
                <TextDefault style={{marginTop: 5}} size="80%" bold="400" color="#4b4b4b" className="textRespon">{props.subTitle}</TextDefault>
                <ImgDefault src={ArrowRight} style={{marginLeft: "96%"}} width="23px" height="23px"/>
            </ColumnContainer>                        
        </CardBackgr>
    )
}