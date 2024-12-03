import { useNavigate, useSearchParams } from "react-router-dom";

import {
  ColumnContainer,
  ImgDefault,
  RowContainer,
  TextDefault,
} from "../../../../../../assets/styles";
import CardProfile from "../../../../assets/CardProfile";
import ExportBtn from "../../../../assets/ExportBtn";

import PingV2 from "../../../../../../icons/ping-v2.png";
import RoleIcon from "../../../../../../icons/pass.png";
import BoatIcon from "../../../../../../icons/boatv2.png";
import ShipValue from "../../../../../../icons/buyerW.png";

import Capitalize from "../../../../../../utils/capitalize";
import { useState } from "react";
import * as XLSX from "xlsx";

export default function Header({
  onPrint,
  onSave,
  companySelect,
  supplierOrBuyer,
  moveStepAnimation,
  renderFlag,
  excelData,
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [redirectCompanyName] = useState(searchParams.get("companyName"));
  const [redirectCompanyId] = useState(searchParams.get("companyId"));
  const [redirectCountry] = useState(searchParams.get("country"));

  const handleExportSimulation = () => {
    const impHsCodes = companySelect[0]?.imported6DigitHsCodes.map((hs) =>
      hs.hscode.toString().substr(0, 4)
    );
    const expHsCodes = companySelect[0]?.imported6DigitHsCodes.map((hs) =>
      hs.hscode.toString().substr(0, 4)
    );
    const allHsCodes = [...impHsCodes, expHsCodes];

    navigate("/simulation", {
      state: {
        hsCodes: allHsCodes,
        country: companySelect[0]?.country,
        transactionType: supplierOrBuyer,
        companySelected: companySelect[0],
      },
    });
  };

  const formatWeight = (number) => {
    const kg = number / 1000;

    const formattedKg = kg.toFixed(2);

    return formattedKg + " kg";
  };

  const excel = () => {
    const dataCopy = { ...excelData[0] };

    // Export
    const exPartners = XLSX.utils.json_to_sheet(
      dataCopy?.exportTradingPartners
    );
    const exKeyword = XLSX.utils.json_to_sheet(
      dataCopy?.exportedProductKeywords
    );
    const portLading = XLSX.utils.json_to_sheet(dataCopy?.portsOfLading);
    const exCountries = XLSX.utils.json_to_sheet(
      dataCopy?.countriesExportingTo
    );
    const ex6digitHs = XLSX.utils.json_to_sheet(
      dataCopy?.exported6DigitHsCodes
    );

    //Import
    const imPartners = XLSX.utils.json_to_sheet(
      dataCopy?.importTradingPartners
    );
    const imKeyword = XLSX.utils.json_to_sheet(
      dataCopy?.importedProductKeywords
    );
    const portUnlading = XLSX.utils.json_to_sheet(dataCopy?.portsOfUnlading);
    const imCountries = XLSX.utils.json_to_sheet(
      dataCopy?.countriesExportingTo
    );
    const im6digitHs = XLSX.utils.json_to_sheet(
      dataCopy?.imported6DigitHsCodes
    );

    const shipments = XLSX.utils.json_to_sheet(dataCopy?.shipments);

    const wb = XLSX.utils.book_new();
    // Export Data
    XLSX.utils.book_append_sheet(wb, exPartners, "Export Partners");
    XLSX.utils.book_append_sheet(wb, exKeyword, "Export Products");
    XLSX.utils.book_append_sheet(wb, portLading, "Ports of Lading");
    XLSX.utils.book_append_sheet(wb, exCountries, "Countries Exporting To");
    XLSX.utils.book_append_sheet(wb, ex6digitHs, "Exported HsCodes");

    //Import Data
    XLSX.utils.book_append_sheet(wb, imPartners, "Import Partners");
    XLSX.utils.book_append_sheet(wb, imKeyword, "Import Products");
    XLSX.utils.book_append_sheet(wb, portUnlading, "Ports of Unlading");
    XLSX.utils.book_append_sheet(wb, imCountries, "Countries Importing From");
    XLSX.utils.book_append_sheet(wb, im6digitHs, "Imported HsCodes");
    XLSX.utils.book_append_sheet(wb, shipments, "Shipments");

    XLSX.writeFile(wb, dataCopy.companyName + ".xlsx");
  };

  return (
    <ColumnContainer>
      <RowContainer
        style={{
          position: "absolute",
          width: 55,
          marginTop: 16,
          left: "-3.8%",
        }}
      >
        <button
          className="cursor-pointer duration-200 hover:scale-125 active:scale-100"
          title="Go Back"
          style={{
            backgroundColor: "transparent",
            borderWidth: 0,
            width: "100%",
            justifyContent: "flex-start",
            display: "flex",
          }}
          onClick={() => {
            redirectCompanyName && redirectCompanyId && redirectCountry
              ? window.close()
              : moveStepAnimation("back", 4);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            className="stroke-blue-300"
          >
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="1.5"
              d="M11 6L5 12M5 12L11 18M5 12H19"
            ></path>
          </svg>
        </button>
      </RowContainer>

      <RowContainer style={{ alignItems: "center", marginTop: "20px" }}>
        <TextDefault color={"#4b4b4b"} size={"32px"}>
          {Capitalize(companySelect[0]?.companyName)}
        </TextDefault>
        <ImgDefault
          src={renderFlag(companySelect[0].country)}
          style={{ marginLeft: 20 }}
          width={"40px"}
          height={"40px"}
        />
        <ExportBtn
          action={onPrint}
          exportSimu={handleExportSimulation}
          excel={excel}
        />
      </RowContainer>

      {companySelect[0].addressList !== "" ||
      companySelect[0]?.address !== "" ? (
        <RowContainer style={{ alignItems: "center", margin: "12px 0" }}>
          <ImgDefault src={PingV2} width={"18px"} height={"18px"} />
          <TextDefault
            color={"#8a97aa"}
            size={"16px"}
            bold={"400"}
            style={{ width: "75%", marginLeft: 5 }}
          >
            {Capitalize(
              (companySelect[0]?.addressList === "undefined" ||
              companySelect[0]?.address === "undefined"
                ? companySelect[0]?.addressList || companySelect[0]?.address
                : supplierOrBuyer) +
                ", " +
                companySelect[0].country
            )}
          </TextDefault>
        </RowContainer>
      ) : (
        <RowContainer style={{ alignItems: "center", marginTop: 10 }}>
          <ImgDefault src={RoleIcon} width={"18px"} height={"18px"} />
          <TextDefault
            color={"#8a97aa"}
            size={"16px"}
            bold={"400"}
            style={{ width: "75%", marginLeft: 5 }}
          >
            {Capitalize(
              companySelect[0]?.role === undefined
                ? `Supplier, ${companySelect[0].country}`
                : companySelect[0].role + ", " + companySelect[0].country
            )}
          </TextDefault>
        </RowContainer>
      )}
      <div
        style={{
          columnGap: 12,
          width: "98%",
          display: "grid",
          justifyContent: "space-between",
          alignContent: "space-between",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
        }}
      >
        <CardProfile
          title={"Total Partners of Importing"}
          value={`${companySelect[0]?.importTradingPartnerCount} Partners`}
          src={BoatIcon}
        />
        <CardProfile
          title={"Total Importing Weight"}
          value={`${formatWeight(
            companySelect[0]?.totalShipmentsImportedWeight
          )}`}
          src={ShipValue}
        />
        <CardProfile
          title={"Total Partners of Exporting"}
          value={`${companySelect[0]?.exportTradingPartnerCount} Partners`}
          src={BoatIcon}
        />
        <CardProfile
          title={"Total Exporting Weight"}
          value={`${formatWeight(
            companySelect[0]?.totalShipmentsExportedWeight
          )}`}
          src={ShipValue}
        />
      </div>
    </ColumnContainer>
  );
}
