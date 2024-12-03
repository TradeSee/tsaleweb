import React from "react";
import {
  CardSMH,
  ColumnContainer,
  ImgDefault,
  RowContainer,
  TextDefault,
} from "../../../../assets/styles";
import Capitalize from "../../../../utils/capitalize";

export default function CardSmHorizontal({ ...props }) {
  return (
    <ColumnContainer style={{ marginRight: 30, marginBottom: 20 }}>
      <CardSMH>
        <ColumnContainer style={{ width: "100%" }}>
          <TextDefault size={"16px"} color={"#8a97aa"} bold={"400"}>
            {props.txt1 ? props.txt1 : "Percentage Share"}
          </TextDefault>
          <TextDefault color={"#8a97aa"} size={"18px"}>
            {Capitalize(props.data.country)}
          </TextDefault>
          <RowContainer
            style={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <ImgDefault width={"70px"} height={"70px"} src={props.flag} />
            <TextDefault
              style={{ marginRight: 10 }}
              size={"40px"}
              color={"#8a97aa"}
            >
              {props.data.percentageShare.toFixed(2)}%
            </TextDefault>
          </RowContainer>
        </ColumnContainer>
      </CardSMH>
    </ColumnContainer>
  );
}
