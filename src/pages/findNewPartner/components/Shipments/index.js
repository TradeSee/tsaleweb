/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import Box from "@mui/material/Box";
import { FileDownloadOutlined } from "@mui/icons-material";
import { format } from "date-fns";
import { Table } from "antd";
import { Grid } from "@mui/material";
import CSV from "../../../../icons/x-file.png";

import * as XLSX from "xlsx";

import { ThemeContext } from "styled-components";

import {
  ColumnContainer,
  RowContainer,
  TextDefault,
} from "../../../../assets/styles";
import "./styles.css";

import Capitalize from "../../../../utils/capitalize";

import formatToCurrency from "../../../../utils/formatToCurrency";
import formatNumber from "../../../../utils/numberFormat";
import Loader from "../../../../components/Loader";

export default function Shipments({
  shipments,
  role,
  toggleDrawer,
  animatedStep,
  moveStepAnimation,
  isLoading,
  updateShipments,
}) {
  const theme = useContext(ThemeContext);

  const textStyle = { color: "#4D6484", height: "100%" };

  const sheetName = `Shipments Info`;
  const excel = () => {
    const filteredData = shipments.map((item) => ({
      CompanyShipper: Capitalize(item.shipperName) || "Not Informed",
      CompanyConsignee: Capitalize(item.consigneeName) || "Not Informed",
      Identifier: item.identifier || "Not Informed",
      ShipmentDate:
        format(new Date(item.shipmentDate), "MM/dd/yyyy") || "Not Informed",
      Country: Capitalize(item.consigneeCountry) || "Not Informed",
      HsCode: Array.isArray(item.hsCode)
        ? item.hsCode.join(", ")
        : "Not Informed",
      KeyProduct: item.productDescription || "Not Informed",
      ShipmentValue:
        item.shipmentValue < 0
          ? "Not Informed"
          : formatToCurrency(item.shipmentValue),
      ShipmentWeight: formatNumber(item.shipmentWeight) || "Not Informed",
      OperationType: role === "Supplier" ? "Exportation" : "Importation",
      Via: Capitalize(item.modeOfTransportation) || "Not Informed",
      PortOfLading: Capitalize(item.portOfLading) || "Not Informed",
      PortOfUnlading: Capitalize(item.portOfUnlading) || "Not Informed",
    }));

    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, sheetName + ".xlsx");
  };

  return (
    <>
      <Loader isLoading={isLoading} />
      <Grid item xs={toggleDrawer ? 10 : 11} container className={animatedStep}>
        <Grid item xs={12} style={{ marginBottom: 50 }}>
          {shipments?.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <div style={{ gridColumn: "1/-1" }}>
                {shipments?.length > 0 ? (
                  <>
                    <RowContainer
                      style={{
                        marginTop: 40,
                        marginBottom: 24,
                        justifyContent: "space-between",
                      }}
                    >
                      <ColumnContainer>
                        <RowContainer
                          style={{
                            width: 55,
                            position: "fixed",
                            left: "5%",
                            top: 40,
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
                              updateShipments([]);
                              moveStepAnimation("back", 1);
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
                        <TextDefault
                          size={"32px"}
                          color={theme.colors.gray[700]}
                        >
                          Shipments
                        </TextDefault>
                        <TextDefault
                          color={"#8a97aa"}
                          bold={"400"}
                          size={"16px"}
                          style={{ marginTop: "8px" }}
                        >
                          Shipments Info
                        </TextDefault>
                      </ColumnContainer>

                      <div
                        style={{ position: "absolute", right: 50, top: -10 }}
                      >
                        <ul className="wrapper">
                          <li className="icon twitter" onClick={excel}>
                            <span className="tooltip">EXCEL</span>
                            <span>
                              <i className="fab fa-twitter"></i>
                            </span>
                            <img
                              src={CSV}
                              style={{ width: 25, height: 25 }}
                              alt="CSV Icon"
                            />
                          </li>
                        </ul>
                      </div>
                    </RowContainer>

                    <Box sx={{ height: "85%", width: "98%" }}>
                      <Table
                        dataSource={shipments}
                        columns={[
                          {
                            dataIndex: "shipperName",
                            title: "Shipper Name",
                            flex: 1,
                            render: (_, record) =>
                              `${
                                record?.shipperName === ""
                                  ? "Not Informed"
                                  : Capitalize(record?.shipperName)
                              }`,
                          },
                          {
                            dataIndex: "consigneeName",
                            title: "Consignee Name",
                            flex: 1,
                            render: (_, record) =>
                              `${
                                record?.consigneeName === ""
                                  ? "Not Informed"
                                  : Capitalize(record?.consigneeName)
                              }`,
                          },
                          {
                            dataIndex: "shipmentDate",
                            title: "Shipment Date",
                            flex: 1,
                            render: (_, record) =>
                              format(
                                new Date(record.shipmentDate),
                                "MM/dd/yyyy"
                              ),
                          },
                          {
                            dataIndex: "country",
                            title: "Country",
                            flex: 1,
                            render: (_, record) =>
                              `${
                                record?.consigneeCountry === ""
                                  ? "Not Informed"
                                  : Capitalize(record?.consigneeCountry)
                              }`,
                          },
                          {
                            dataIndex: "hscode",
                            title: "Hs Code",
                            flex: 1,
                            render: (_, record) => record?.hsCode[0],
                          },
                          {
                            dataIndex: "productDescription",
                            title: "Key Product",
                            flex: 1,
                            render: (_, record) =>
                              `${
                                record?.productDescription === ""
                                  ? "Not Informed"
                                  : record?.productDescription.replace(
                                      /undefined/gi,
                                      ""
                                    )
                              }`,
                          },
                          {
                            dataIndex: "shipmentValue",
                            title: "Shipment Value (USD)",
                            flex: 1,
                            render: (_, record) =>
                              `${
                                record.shipmentValue < 0
                                  ? "Not Informed"
                                  : formatToCurrency(record?.shipmentValue)
                              }`,
                          },
                          {
                            dataIndex: "shipmentWeight",
                            title: "Shipment Weight (Ton.)",
                            flex: 1,
                            render: (_, record) =>
                              `${
                                record.shipmentWeight < 0
                                  ? "Not Informed"
                                  : formatNumber(record?.shipmentWeight)
                              }`,
                          },
                          {
                            dataIndex: "shipperCountry",
                            title: "Operation Type",
                            flex: 1,
                            render: (_, record) =>
                              `${
                                role === "Supplier"
                                  ? "Exportation"
                                  : "Importation"
                              }`,
                          },
                          {
                            dataIndex: "modeOfTransportation",
                            title: "Via",
                            flex: 1,
                            render: (_, record) =>
                              `${
                                record?.modeOfTransportation === ""
                                  ? "Not Informed"
                                  : Capitalize(record?.modeOfTransportation)
                              }`,
                          },
                          {
                            dataIndex: "portOfLading",
                            title: "Port Of Lading",
                            flex: 1,
                            render: (_, record) =>
                              `${
                                record.portOfLading === ""
                                  ? "Not Informed"
                                  : Capitalize(record?.portOfLading)
                              }`,
                          },
                          {
                            dataIndex: "portOfUnlading",
                            title: "Port Of Unlading",
                            flex: 1,
                            render: (_, record) =>
                              `${
                                record.portOfUnlading === ""
                                  ? "Not Informed"
                                  : Capitalize(record?.portOfUnlading)
                              }`,
                          },
                        ]}
                        style={textStyle}
                        pagination={false}
                      />
                    </Box>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}

          {shipments.length <= 0 && !isLoading && (
            <div>
              <h1 style={{ color: theme.colors.gray[300] }}>
                - No Data Avaliable -
              </h1>
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
}
