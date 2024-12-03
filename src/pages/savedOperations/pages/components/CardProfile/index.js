import React from "react";
import { ImgDefault } from "../../../../../assets/styles";
import { Container, Description, Profile } from "./styles";

export default function CardProfile({ ...props }) {
  return (
    <Container style={props.style}>
      <Profile>
        <h1>{props.title}</h1>
        <ImgDefault className="imgCard" src={props.src} />
      </Profile>

      <Description>
        <div className="card-time-profile">{props.value}</div>
      </Description>
    </Container>
  );
}
