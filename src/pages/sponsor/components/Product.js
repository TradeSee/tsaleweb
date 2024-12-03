import React from "react";
import './styles.css';
import { ImgDefault } from "../../../assets/styles";

export default function Product({...props}) {
    return(
        <div class="card-profile work-profile">
          <div class="img-section-profile">
            <ImgDefault className="imgCard" src={props.src}/>
          </div>
          <div class="card-desc-profile">
          <div class="card-header-profile">
          <div class="card-title-profile"></div>
          <div class="card-menu-profile">
          <div class="dot-profile"></div>
          <div class="dot-profile"></div>
          <div class="dot-profile"></div>
          </div>
        </div>
        <div class="card-time-profile">{props.value}</div>
        <p class="recent-profile">{props.title}</p>
      </div>
      </div>
    )
}