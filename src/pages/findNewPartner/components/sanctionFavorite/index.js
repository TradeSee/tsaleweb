import React from "react";
import { ButtonAction, ButtonPdf, ButtonWrapper, InfoItem, InfoWrapper, PillScore, StyledRectangle } from "./styleSanction";
import { TextDefault } from "../../../../assets/styles";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import BookmarkIcon from '@mui/icons-material/Bookmark';
const CardFavoriteSanction = ({ data }) => {

    const openPdfLink = () => {
        const pdfUrl = "https://www.google.com";      
        window.open(pdfUrl, "_blank");
      };
      
  return (
    <>
       <TextDefault color={"#4B4B4B"} bold={"600"}>
           Favorites
       </TextDefault>
    <StyledRectangle>
        
      <InfoWrapper>
        <InfoItem><TextDefault color={"#8A97AA"} bold={"700"}>Match Score</TextDefault></InfoItem>
        <InfoItem><PillScore><TextDefault color={"#fff"} bold={"700"}>91%</TextDefault></PillScore></InfoItem>
      </InfoWrapper>
      <InfoWrapper>
        <InfoItem><TextDefault color={"#8A97AA"} bold={"700"}>Match Name</TextDefault></InfoItem>
        <InfoItem><TextDefault color={"#8A97AA"} bold={"400"}>GERDA</TextDefault></InfoItem>
      </InfoWrapper>
      <InfoWrapper>
        <InfoItem><TextDefault color={"#8A97AA"} bold={"700"}>Entity Type/Country</TextDefault></InfoItem>
        <InfoItem><TextDefault color={"#8A97AA"} bold={"400"}>Russian Federation</TextDefault></InfoItem>
      </InfoWrapper>
      <InfoWrapper>
        <InfoItem><TextDefault color={"#8A97AA"} bold={"700"}>Scope</TextDefault></InfoItem>
        <InfoItem><TextDefault color={"#8A97AA"} bold={"400"}>Scurrently Banned Ships by Europe an Maritime Safety Agency</TextDefault></InfoItem>
      </InfoWrapper>
      <ButtonWrapper>
        <ButtonPdf onClick={openPdfLink}>
          <TextDefault color={"#8A97AA"} bold={"700"}>PDF
           <ArrowDownwardIcon sx={{ fontSize: "1.2rem", verticalAlign: "middle"}} /></TextDefault>
        </ButtonPdf>
      </ButtonWrapper>
      <ButtonWrapper>
        <ButtonAction>
          <TextDefault color={"#8A97AA"} bold={"700"}>
           <BookmarkIcon sx={{ fontSize: "1.2rem", verticalAlign: "middle"}} /></TextDefault>
        </ButtonAction>
      </ButtonWrapper>
    </StyledRectangle>
    </>
  );
};

export default CardFavoriteSanction;
