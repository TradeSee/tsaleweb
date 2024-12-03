import React, { useEffect, useState } from "react";

import country from "../../../components/Flag";
import { Container } from "./styles";
import Capitalize from "../../../utils/capitalize";
import {
  ColumnContainer,
  ImgDefault,
  RowContainer,
  TextDefault,
} from "../../../assets/styles";
import NextIcon from "../../../icons/nextBlue.png";

const Partner = ({ data }) => {
  const [png, setPng] = useState(null);

  useEffect(() => {
    country.forEach((item) => {
      if (data.country.toLowerCase() === item.country.toLowerCase()) {
        return setPng(item.src);
      }
    });
  }, [data.country]);

  function linkSavedOperation(id, companyName, country) {
    window.open(
      `/trade-data?companyName=${companyName}&companyId=${id}&country=${country}&role=${"Supplier"}`,
      "_blank"
    );
  }

  return (
    <Container
      className="cardsFavoriteCompanies"
      style={{
        width: "99%",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
      onClick={() =>
        linkSavedOperation(data.id, data.companyName, data.country)
      }
    >
      <div
        style={{
          marginRight: "16px",
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 8,
        }}
      >
        <img
          style={{ width: "35px", height: "35px" }}
          src={png}
          alt="Company country"
        />
      </div>

      <RowContainer
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <ColumnContainer
          style={{ width: "100%", justifyContent: "center", height: 50 }}
        >
          <TextDefault bold={"400"} size={"12px"} color={"#8a97aa"}>
            {Capitalize(data.country)}
          </TextDefault>
          <TextDefault
            className="lineLM2"
            color={"#4D6484"}
            size={"15px"}
            style={{ overflow: "hidden", width: "95%", marginTop: 2 }}
          >
            {data.companyName ? Capitalize(data.companyName) : "-"}
          </TextDefault>
        </ColumnContainer>

        <ImgDefault src={NextIcon} width={"20px"} height={"20px"} />
      </RowContainer>
    </Container>
  );
};

export default Partner;
