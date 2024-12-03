import React, { useContext } from "react";
import {
  ColumnContainer,
  ImgDefault,
  RowContainer,
  TextDefault,
} from "../../../assets/styles";
import { ThemeContext } from "styled-components";

export default function CardModulev2({ ...props }) {
  const theme = useContext(ThemeContext);

  return (
    <article class="article-wrapper" onClick={props.click}>
      <div class="rounded-lg container-project">
        <RowContainer>
          <ImgDefault src={props.img} />
          <ColumnContainer style={{ marginLeft: 20 }}>
            <TextDefault
              style={{ marginTop: 5 }}
              size="80%"
              bold="400"
              color="#fff"
              className="textRespon"
            >
              {props.subTitle}
            </TextDefault>
          </ColumnContainer>
        </RowContainer>
      </div>
      <div class="project-info">
        <div class="flex-pr">
          <div class="project-title text-nowrap">{props.title}</div>
          <div class="project-hover">
            <svg
              style={{ color: theme.colors.main[500] }}
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              color="black"
              stroke-linejoin="round"
              stroke-linecap="round"
              viewBox="0 0 24 24"
              stroke-width="2"
              fill="none"
              stroke="currentColor"
            >
              <line y2="12" x2="19" y1="12" x1="5"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
       
      </div>
    </article>
  );
}
