import React from "react";
import {
  ColumnContainer,
  ImgDefault,
  RowContainer,
  TextDefault,
} from "../../../../assets/styles";
import { CardImg, Container, Description, Profile } from "./styles";

export default function CardProfile({ ...props }) {
  return (
    <Container style={{ marginTop: 20 }}>
      <RowContainer style={{ justifyContent: "start", alignItems: "center" }}>
        <CardImg>
          <ImgDefault width="40px" height="40px" src={props.src} />
        </CardImg>

        <ColumnContainer style={{ marginLeft: 20 }}>
          <TextDefault bold="400" size="15px">
            {props.title}
          </TextDefault>
          <TextDefault style={{ marginTop: 8 }} size="17px">
            {props.value}
          </TextDefault>
        </ColumnContainer>
      </RowContainer>
    </Container>
  );
}

//<Container style={props.style}>
//  <Profile>
//    <h1>{props.title}</h1>
//    <ImgDefault className="imgCard" src={props.src} />
//  </Profile>
//
//  <Description>
//    <div className="card-time-profile">{props.value}</div>
//  </Description>
//</Container>
