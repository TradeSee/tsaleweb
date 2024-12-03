import React from "react";
import "../style.css";
import {
  ColumnContainer,
  ImgDefault,
  TextDefault,
  BtnDefault,
} from "../../../assets/styles";
import { styled } from "styled-components";
import ButtonBlue from "../../../components/myButton";

const Container = styled.div`
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "100%")};
  background-color: #e9edf8;
  border-radius: 30px;
  justify-content: center;
  padding: 30px;
  display: flex;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

export default function Card({ ...props }) {
  return (
    <Container width={props.width} height={props.height}>
      <TextDefault
        style={{ position: "absolute", marginLeft: 200 }}
        size={"16px"}
        color={"#4b4b4b"}
      >
        +{props.value}
      </TextDefault>
      <ColumnContainer style={{ alignItems: "center", width: "100%" }}>
        <ImgDefault
          src={props.src}
          width={props.imgW ? props.imgW : "150px"}
          height={props.imgH ? props.imgH : "150px"}
        />
        <ColumnContainer>
          <TextDefault
            size={"20px"}
            color={"#4b4b4b"}
            style={{ marginTop: 10 }}
          >
            {props.name}
          </TextDefault>
          <TextDefault
            size={"14px"}
            color={"#4b4b4b"}
            bold={"400"}
            style={{ marginTop: 10 }}
          >
            Your data records.
          </TextDefault>
        </ColumnContainer>
        <BtnDefault
          width={"95%"}
          marginTop={"50px"}
          borderR={"20px"}
          onClick={props.next}
        >
          Open
        </BtnDefault>
      </ColumnContainer>
    </Container>
  );
}
