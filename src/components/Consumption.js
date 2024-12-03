import React from "react";
import { BarProgress, ColumnContainer, RowContainer, StatesProgress, TextDefault } from "../assets/styles";

export default function Consumption({...props}) {
    return(
        <ColumnContainer style={{width: "100%", justifyContent: 'center', alignItems: "center"}}>

            <TextDefault size="10px" color="#fff" bold="400" style={{marginBottom: 5}}>{props.usage}% Usage</TextDefault>

            <BarProgress>
                <StatesProgress usage={props.usage}></StatesProgress>
            </BarProgress>
        </ColumnContainer>
    )
}