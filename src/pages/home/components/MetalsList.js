import React, { useState } from "react";
import {
  BackgrNut,
  ColumnContainer,
  ImgDefault,
  RowContainer,
  TextDefault,
} from "../../../assets/styles";
import NutIcon from "../../../icons/nut.png";
import GraphUp from "../../../icons/lineUp.png";
import GraphDown from "../../../icons/lineDown.png";
import GraphNull from "../../../icons/lineNull.png";
import TradeUp from "../../../icons/upTrade.png";
import TradeDown from "../../../icons/downTrade.png";
import TradeNull from "../../../icons/NullTrade.png";

export default function MetalList({ ...props }) {
  return (
    <RowContainer
      style={{
        alignItems: "center",
        marginTop: 10,
        padding: 5,
        borderRadius: 6,
        maxWidth: "100%",
      }}
    >
      <BackgrNut>
        <ImgDefault src={NutIcon} width="30px" height="30px" />
      </BackgrNut>

      <ColumnContainer style={{ marginLeft: 10, width: 60 }}>
        <TextDefault size="15px" color="#4b4b4b" bold="800">
          {props.title}
        </TextDefault>
        <TextDefault size="11px" color="#8a97aa" bold="400">
          Daily Variation
        </TextDefault>
      </ColumnContainer>

      <ImgDefault
        style={{ marginLeft: 42 }}
        src={
          props.state == 1 ? GraphUp : props.state == 0 ? GraphNull : GraphDown
        }
      />

      <ColumnContainer
        style={{
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginLeft: 42,
        }}
      >
        <TextDefault size="15px" color="#4b4b4b" bold="800">
          {props.price}
        </TextDefault>
        <RowContainer
          style={{ alignItems: "center", justifyContent: "flex-end" }}
        >
          <ImgDefault
            src={
              props.state == 1
                ? TradeUp
                : props.state == 0
                ? TradeNull
                : TradeDown
            }
            width="7px"
            height="7px"
          />
          <TextDefault
            size="12px"
            color={
              props.state == 1
                ? "#3BC17A"
                : props.state == 0
                ? "#8a97aa"
                : "#E93939"
            }
            bold="700"
            style={{ marginLeft: 4 }}
          >
            {props.var}
          </TextDefault>
        </RowContainer>
      </ColumnContainer>
    </RowContainer>
  );
}
