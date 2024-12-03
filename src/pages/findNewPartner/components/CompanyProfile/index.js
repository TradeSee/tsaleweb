/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { FileDownloadOutlined } from "@mui/icons-material";
import { format } from "date-fns";
import { Table, Collapse, message, Space } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Pdf } from "../Pdf";
import * as XLSX from "xlsx";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ThemeContext } from "styled-components";
import { publicIpv4 } from "public-ip";
import Select from "react-select";

import country from "../../utils/flag";
import Capitalize from "../../../../utils/capitalize";
import formatToCurrency from "../../../../utils/formatToCurrency";
import formatNumber from "../../../../utils/numberFormat";

import {
  ColumnContainer,
  GroupInput,
  ImgOpt,
  RowContainer,
  SelectDefault,
  TextDefault,
} from "../../../../assets/styles";
import {
  TablesContainer,
  SanctionContainer,
  SanctionImage,
  TableNavigator,
  NavigationContainer,
  DownloadButton,
  ShipmentsDownload,
  Container,
  SearchButton,
  Option,
} from "./styles";
import "./styles.css";
import {
  HeaderFilter,
  MyCardContent,
  OptionsContainer,
} from "../../../leadsEnrichment/search/style";

import ShipmentsCompany from "../../../../service/Shipments";
import { finderLink } from "../../../../service/apiHunter";

import ButtonBlue from "../../../../components/myButton";
import Spinner from "../../../../components/Spinner";
import CardSanction from "../sanctionCard";
import Header from "./components/Header";
import CountryTable from "./components/CountryTable";
import TradePartnersTable from "./components/tradePartnersTable";
import ProductKeywords from "./components/ProductKeywords";
import PortsTable from "./components/PortsTable";
import HsCodesTable from "./components/HsCodesTable";
import CardFavoriteSanction from "../sanctionFavorite";
import { PopOver } from "../../../../components/PopOver";
import Ping from "../../../../icons/ping.png";
import { deleteListByName, getAllLists } from "../../../../hooks/leads";
import LinksTable from "../../../leadsEnrichment/components/tableCompany";
import ProfileCompany from "../../../leadsEnrichment/profileCompany";
import { addLeadView, checkLeadView } from "../../../../hooks/findNewPartner";
import { filterLeadsCompanyIdDB } from "../../../../hooks/filterLeadsDB";
import LoadingBar from "../../../../components/PercentLoading";

function CountryOption({ country }) {
  return (
    <div
      className="country-option"
      style={{ display: "flex", alignItems: "center" }}
    >
      <img src={country?.src} alt={country?.label} width={20} height={20} />
      <strong style={{ marginLeft: 12 }}>{country?.label}</strong>
    </div>
  );
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box sx={{ p: 3 }}>{children}</Box>
    </div>
  );
}

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Shipments({ shipments, companyName, country }) {
  const theme = useContext(ThemeContext);

  const textStyle = { color: "#4D6484", height: "100%" };
  const truncatedCompanyName = companyName?.substring(0, 12);
  const capitalizedTruncatedCompanyName =
    truncatedCompanyName?.charAt(0)?.toUpperCase() +
    truncatedCompanyName?.slice(1);

  const sheetName = `${capitalizedTruncatedCompanyName} - Shipments Info`;
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
      OperationType:
        item.shipperCountry === country
          ? "Exportation"
          : "Importation" || "Not Informed",
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
      {shipments?.length > 0 ? (
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
                    marginTop: 12,
                    marginBottom: 8,
                    justifyContent: "space-between",
                  }}
                >
                  <ColumnContainer>
                    <TextDefault size={"24px"} color={theme.colors.gray[700]}>
                      Shipments
                    </TextDefault>
                    <TextDefault color={"#8a97aa"} bold={"400"}>
                      Shipments Info
                    </TextDefault>
                  </ColumnContainer>

                  <ShipmentsDownload onClick={excel}>
                    <span>Download</span>
                    <FileDownloadOutlined
                      sx={{
                        fontSize: "24px",
                        color: "#fafafa",
                      }}
                    />
                  </ShipmentsDownload>
                </RowContainer>

                <Box sx={{ height: "85%", width: "98%" }}>
                  <Table
                    dataSource={shipments}
                    columns={[
                      {
                        dataIndex: "consigneeName",
                        title: "Company Name",
                        flex: 1,
                        render: (_, record) => (
                          <>
                            {record?.consigneeName === "" ? (
                              <em>Not Informed</em>
                            ) : (
                              Capitalize(record?.consigneeName)
                            )}
                          </>
                        ),
                      },
                      {
                        dataIndex: "shipmentDate",
                        title: "Shipment Date",
                        flex: 1,
                        render: (_, record) =>
                          format(new Date(record.shipmentDate), "MM/dd/yyyy"),
                      },
                      {
                        dataIndex: "country",
                        title: "Country",
                        flex: 1,
                        render: (_, record) => (
                          <>
                            {record?.consigneeCountry === "" ? (
                              <em>Not Informed</em>
                            ) : (
                              Capitalize(record?.consigneeCountry)
                            )}
                          </>
                        ),
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
                        render: (_, record) => (
                          <>
                            {record?.productDescription === "" ? (
                              <em>Not Informed</em>
                            ) : (
                              record?.productDescription.replace(
                                /undefined/gi,
                                ""
                              )
                            )}
                          </>
                        ),
                      },
                      {
                        dataIndex: "shipmentValue",
                        title: "Shipment Value (USD)",
                        flex: 1,
                        render: (_, record) => (
                          <>
                            {record.shipmentValue <= 0 ? (
                              <em>Not Informed</em>
                            ) : (
                              formatToCurrency(record?.shipmentValue)
                            )}
                          </>
                        ),
                      },
                      {
                        dataIndex: "shipmentWeight",
                        title: "Shipment Weight (Ton.)",
                        flex: 1,
                        render: (_, record) => (
                          <>
                            {record.shipmentWeight <= 0 ? (
                              <em>Not Informed</em>
                            ) : (
                              formatNumber(record?.shipmentWeight)
                            )}
                          </>
                        ),
                      },
                      {
                        dataIndex: "shipperCountry",
                        title: "Operation Type",
                        flex: 1,
                        render: (_, record) =>
                          `${
                            record?.shipperCountry === country
                              ? "Exportation"
                              : "Importation"
                          }`,
                      },
                      {
                        dataIndex: "modeOfTransportation",
                        title: "Via",
                        flex: 1,
                        render: (_, record) => (
                          <>
                            {record?.modeOfTransportation === "" ? (
                              <em>Not Informed</em>
                            ) : (
                              Capitalize(record?.modeOfTransportation)
                            )}
                          </>
                        ),
                      },
                      {
                        dataIndex: "portOfLading",
                        title: "Port Of Lading",
                        flex: 1,
                        render: (_, record) => (
                          <>
                            {record.portOfLading === "" ? (
                              <em>Not Informed</em>
                            ) : (
                              Capitalize(record?.portOfLading)
                            )}
                          </>
                        ),
                      },
                      {
                        dataIndex: "portOfUnlading",
                        title: "Port Of Unlading",
                        flex: 1,
                        render: (_, record) => (
                          <>
                            {record.portOfUnlading === "" ? (
                              <em>Not Informed</em>
                            ) : (
                              Capitalize(record?.portOfUnlading)
                            )}
                          </>
                        ),
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
      ) : (
        <div>
          <h1 style={{ color: theme.colors.gray[300] }}>
            - No Data Avaliable -
          </h1>
        </div>
      )}
    </>
  );
}

function Tables({
  companyProfile,
  renderFlag,
  role,
  supplierOrBuyer,
  handleScroll,
  selectedId,
}) {
  const theme = useContext(ThemeContext);

  const [isLoading, setIsLoading] = useState(false);

  const panelStyle = {
    marginBottom: 24,
    background: theme.colors.light[100],
    borderRadius: 8,
    border: "none",
  };

  const truncatedCompanyName = companyProfile?.companyName?.substring(0, 12);
  const capitalizedTruncatedCompanyName =
    truncatedCompanyName?.charAt(0)?.toUpperCase() +
    truncatedCompanyName?.slice(1);

  const excel = (data, title) => {
    setIsLoading(true);
    const sheetName = `${capitalizedTruncatedCompanyName} - ${title}`;
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, sheetName + ".xlsx");
    setIsLoading(false);
  };

  const Header = (title, description, id) => {
    const handleDownload = () => {
      if (role === "export") {
        if (title === "Countries Exporting To") {
          const titulo = "CET";
          excel(companyProfile.countriesExportingTo, titulo);
        } else if (title.includes("Export Trading Partners")) {
          const titulo = "ETP";
          excel(companyProfile.exportTradingPartners, titulo);
        } else if (title === "Exported Product Keywords") {
          const titulo = "EPK";
          excel(companyProfile.exportedProductKeywords, titulo);
        } else if (title === "Ports Of Lading") {
          const titulo = "POL";
          excel(companyProfile.portsOfLading, titulo);
        } else if (title === "Exported 6 Digits HsCode") {
          const titulo = "EHC";
          excel(companyProfile.exported6DigitHsCodes, titulo);
        }
      } else {
        if (title === "Countries Importing From") {
          const titulo = "CIF";
          excel(companyProfile.countriesImportingFrom, titulo);
        } else if (title.includes("Import Trading Partners")) {
          const titulo = "ITP";
          excel(companyProfile.importTradingPartners, titulo);
        } else if (title === "Imported Product Keywords") {
          const titulo = "IPK";
          excel(companyProfile.imported6DigitHsCodes, titulo);
        } else if (title === "Ports Of Unlading") {
          const titulo = "POU";
          excel(companyProfile.portsOfUnlading, titulo);
        } else if (title === "Imported 6 Digits HsCode") {
          const titulo = "IHC";
          excel(companyProfile.imported6DigitHsCodes, titulo);
        }
      }
    };

    return (
      <RowContainer
        style={{
          marginTop: 12,
          marginBottom: 8,
          alignItems: "center",
          justifyContent: "space-between",
        }}
        id={id}
      >
        <ColumnContainer>
          <TextDefault size={"24px"} color={theme.colors.dark[950]}>
            {title}
          </TextDefault>
          <TextDefault color={"#5B5B5B"} bold={"400"}>
            {description}
          </TextDefault>
        </ColumnContainer>

        {isLoading ? (
          <Spinner size={16} />
        ) : (
          <DownloadButton onClick={handleDownload}>
            <FileDownloadOutlined
              sx={{
                fontSize: "28px",
                color: theme.colors.main[500],
              }}
            />
          </DownloadButton>
        )}
      </RowContainer>
    );
  };

  const exportData = [
    companyProfile.exportTradingPartners?.length > 0 && {
      key: "1",
      id: "exportTrade",
      label: Header(
        `Export Trading Partners (Top ${companyProfile.exportTradingPartners?.length})`,
        "Top Trading Partners",
        "exportTrade"
      ),
      children: (
        <TradePartnersTable
          data={companyProfile.exportTradingPartners}
          renderFlag={renderFlag}
          role={supplierOrBuyer}
        />
      ),
      style: panelStyle,
    },
    companyProfile.exportedProductKeywords?.length > 0 && {
      key: "2",
      id: "exportProducts",
      label: Header(
        "Exported Product Keywords",
        "Top Products",
        "exportProducts"
      ),
      children: (
        <ProductKeywords data={companyProfile.exportedProductKeywords} />
      ),
      style: panelStyle,
    },
    companyProfile.portsOfLading?.length > 0 && {
      key: "3",
      id: "ladingPorts",
      label: Header("Ports Of Lading", "Top Ports", "ladingPorts"),
      children: <PortsTable data={companyProfile.portsOfLading} />,
      style: panelStyle,
    },
    companyProfile.countriesExportingTo?.length > 0 && {
      key: "4",
      id: "countryExport",
      label: Header(
        "Countries Exporting To",
        "Top Destinations",
        "countryExport"
      ),
      children: (
        <CountryTable
          data={companyProfile.countriesExportingTo}
          renderFlag={renderFlag}
        />
      ),
      style: panelStyle,
    },
    companyProfile.exported6DigitHsCodes?.length > 0 && {
      key: "5",
      id: "exportedHs",
      label: Header("Exported 6 Digits Hs Code", "Top Hs Code", "exportedHs"),
      children: <HsCodesTable data={companyProfile.exported6DigitHsCodes} />,
      style: panelStyle,
    },
  ].filter((data) => typeof data !== "boolean");

  const importData = [
    companyProfile.importTradingPartners?.length > 0 && {
      key: "1",
      id: "importTrade",
      label: Header(
        `Import Trading Partners (Top ${companyProfile.importTradingPartners?.length})`,
        "Top Trading Partners",
        "importTrade"
      ),
      children: (
        <TradePartnersTable
          data={companyProfile.importTradingPartners}
          renderFlag={renderFlag}
        />
      ),
      style: panelStyle,
    },
    companyProfile.importedProductKeywords?.length > 0 && {
      key: "2",
      id: "ImportProducts",
      label: Header(
        "Imported Product Keywords",
        "Top Products",
        "ImportProducts"
      ),
      children: (
        <ProductKeywords data={companyProfile.importedProductKeywords} />
      ),
      style: panelStyle,
    },
    companyProfile.portsOfUnlading?.length > 0 && {
      key: "3",
      id: "unladingPorts",
      label: Header("Ports Of Unlading", "Top Ports", "unladingPorts"),
      children: <PortsTable data={companyProfile.portsOfUnlading} />,
      style: panelStyle,
    },
    companyProfile.countriesImportingFrom?.length > 0 && {
      key: "4",
      id: "countryImport",
      label: Header(
        "Countries Importing From",
        "Top Destinations",
        "countryImport"
      ),
      children: (
        <CountryTable
          data={companyProfile.countriesImportingFrom}
          renderFlag={renderFlag}
        />
      ),
      style: panelStyle,
    },
    companyProfile.imported6DigitHsCodes?.length > 0 && {
      key: "5",
      id: "importedHs",
      label: Header("Imported 6 Digits Hs Code", "Top HsCodes", "importedHs"),
      children: <HsCodesTable data={companyProfile.imported6DigitHsCodes} />,
      style: panelStyle,
    },
  ].filter((data) => typeof data !== "boolean");

  const selectedTable = useMemo(
    () =>
      role === "import"
        ? importData.find((table) => selectedId === table.id)?.key
        : exportData.find((table) => selectedId === table.id)?.key,
    [selectedId]
  );

  return (
    <Collapse
      items={role === "import" ? importData : exportData}
      bordered={false}
      activeKey={selectedTable}
      style={{
        background: "transparent",
      }}
      onChange={(e) => {
        const lastSelected = e[e.length - 1];

        const selectedtable =
          role === "import"
            ? importData.find((table) => lastSelected === table.key)
            : exportData.find((table) => lastSelected === table.key);

        selectedtable ? handleScroll(selectedtable?.id) : handleScroll("");
      }}
      expandIcon={({ isActive }) => (
        <RightOutlined
          rotate={isActive ? 90 : 0}
          style={{ fontSize: "20px", color: `` }}
        />
      )}
    />
  );
}

export default function CompanyProfile({
  toggleDrawer,
  animatedStep,
  moveStepAnimation,
  supplierOrBuyer,
  companySelect,
  renderFlag,
  saveCompany,
  selectedInfo,
  handleSelectInfo,
  hsCode,
  fromDate,
  toDate,
  requestType,
  userId,
  userName,
}) {
  const theme = useContext(ThemeContext);

  const [hasImportData, setHasImportData] = useState(true);
  const [hasExportData, setHasExportData] = useState(true);
  const [sanctionStep, setSanctionStep] = useState(0);
  const [selectedTable, setSelectedTable] = useState("");
  const [isLeadsLoading, setIsLeadsLoading] = useState(false);
  const [shipments, setShipments] = useState([]);
  const [companyName, setCompanyName] = useState();
  const [activeItem, setActiveItem] = useState("CompanyProfile");
  const [selectedListName, setSelectedListName] = useState("");
  const [dataEmail, setDataEmail] = useState();
  const [lists, setLists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIP, setUserIP] = useState("");
  const [selectedInfoLeads, setSelectedInfoLeads] = useState(0);
  const [links, setLinks] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countrySel, setCountrySel] = useState();
  const [searchFor, setSearchFor] = useState("companyName");
  const [leadStep, setLeadStep] = useState(0);
  const [selectedLeadUrl, setSelectedLeadUrl] = useState("");
  const [showLinksTable, setShowLinksTable] = useState(false);
  const [loadingLinks, setLoadingLinks] = useState(false);

  const targetRef = useRef();

  const handlePrintProfile = useReactToPrint({
    content: () => targetRef.current,
  });

  useEffect(() => {
    const TitlePage = Capitalize(companySelect[0].companyName);

    document.title = TitlePage;
  }, [companySelect]);

  const ExpTablesAndHashs = [
    companySelect[0].exportTradingPartners?.length > 0 && {
      id: "exportTrade",
      label: `Export Trading Partners (Top ${companySelect[0].exportTradingPartners?.length})`,
    },
    companySelect[0].exportedProductKeywords?.length > 0 && {
      id: "exportProducts",
      label: "Exported Product Keywords",
    },
    companySelect[0].portsOfLading?.length > 0 && {
      id: "ladingPorts",
      label: "Ports Of Lading",
    },
    companySelect[0].countriesExportingTo?.length > 0 && {
      id: "countryExport",
      label: "Countries Exporting To",
    },

    companySelect[0].exported6DigitHsCodes?.length > 0 && {
      id: "exportedHs",
      label: "Exported 6 Digits Hs Code",
    },
  ].filter((data) => typeof data !== "boolean");

  const ImpTablesAndHashs = [
    companySelect[0].importTradingPartners?.length > 0 && {
      id: "importTrade",
      label: `Import Trading Partners (Top ${companySelect[0].exportTradingPartners?.length})`,
    },

    companySelect[0].importedProductKeywords?.length > 0 && {
      id: "importProducts",
      label: "Imported Product Keywords",
    },
    companySelect[0].portsOfUnlading?.length > 0 && {
      id: "unladingPorts",
      label: "Ports Of Unlading",
    },
    companySelect[0].countriesImportingFrom?.length > 0 && {
      id: "countryImport",
      label: "Countries Importing From",
    },

    companySelect[0].imported6DigitHsCodes?.length > 0 && {
      id: "importedHs",
      label: "Imported 6 Digits Hs Code",
    },
  ].filter((data) => typeof data !== "boolean");

  useEffect(() => {
    if (companySelect) {
      saveCompany();

      setHasExportData(
        companySelect[0]?.portsOfLading?.length > 0 ||
          companySelect[0]?.exportedProductKeywords?.length > 0 ||
          companySelect[0]?.exportTradingPartners?.length > 0 ||
          companySelect[0]?.countriesExportingTo?.length > 0
      );

      setHasImportData(
        companySelect[0]?.portsOfUnlading?.length > 0 ||
          companySelect[0]?.importedProductKeywords?.length > 0 ||
          companySelect[0]?.importTradingPartners?.length > 0 ||
          companySelect[0]?.countriesImportingFrom?.length > 0
      );
      // fetchData();
      filterShipments();
      startUrl();
    }
  }, [companySelect]);

  useEffect(() => {
    if (companySelect.length > 0) {
      setCompanyName(companySelect[0]?.companyName);
      setCountrySel(companySelect[0]?.country);
    }
    setCompanyName(companySelect[0]?.companyName);
    setCountrySel(companySelect[0]?.country);
  }, [companySelect]);

  function filterShipments() {
    if (companySelect[0].shipments?.length === 0 && requestType === "api") {
      ShipmentsCompany(
        companySelect[0].companyName,
        companySelect[0].country,
        supplierOrBuyer
      ).then((res) => setShipments(res));
      return;
    }

    return setShipments(companySelect[0].shipments);
  }

  const getFlag = (set) => {
    let filter = country?.filter((item) => {
      return item?.value?.toLowerCase() === set?.toLowerCase();
    });

    return filter[0]?.src;
  };

  useEffect(() => {
    (async () => {
      setUserIP(await publicIpv4());
    })();
  }, []);
  function handleCompanyName(event) {
    setCompanyName(event.target.value);
  }

  const handleClick = (item) => {
    setActiveItem(item);
  };

  const getSanctions = () => {
    setSanctionStep(1);
    // requestSanctions();
  };

  const handleClickScroll = (id) => {
    setSelectedTable(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  async function fetchLists() {
    try {
      const listsData = await getAllLists(userId);
      setLists(listsData);
    } catch (error) {
      console.error("Erro ao buscar listas:", error);
    }
  }

  useEffect(() => {
    fetchLists();
  }, [userId]);

  const handleDeleteClick = async (userId, listId) => {
    try {
      const deleteSuccess = await deleteListByName(userId, listId);
      if (deleteSuccess) {
        let successMessage = "List deleted successfully!";
        message.success(successMessage);
        fetchLists();
      } else {
        let errorMessage = "Error when deleting list!";
        message.error(errorMessage);
      }
    } catch (error) {
      let errorMessage = "Error when deleting list!";
      message.error(errorMessage);
    }
  };

  const handleRename = (name) => {
    setSelectedListName(name);
    setIsModalOpen(true);
  };

  const columnsList = [
    {
      title: "List Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link
          to={`/leadsenrichment-listPage?name=${record.name}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Created on",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at) => {
        return formatDate(created_at);
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <PopOver.Root>
            <PopOver.Trigger>
              <MoreHorizIcon sx={{ cursor: "pointer" }} />
            </PopOver.Trigger>
            <PopOver.Content>
              <OptionsContainer>
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteClick(userId, record.name)}
                >
                  Delete
                </p>
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRename(record.name)}
                >
                  Rename
                </p>
              </OptionsContainer>
            </PopOver.Content>
          </PopOver.Root>
        </Space>
      ),
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const formattedDate = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}/${year}`;
    return formattedDate;
  };

  const result = {
    confidence_level: dataEmail?.confidence_level,
    linkedin_url: dataEmail?.query,
    name: "employeeName",
    title: dataEmail?.job_title,
    emails: dataEmail?.emails,
    phones: dataEmail?.phones,
  };

  const dataArray = [result];

  function handleCountrySelect(selected) {
    setCountrySel(selected.value);
  }
  const handleSearchFor = (newValue) => {
    setSearchFor(newValue);
  };

  const handleSelectInfoLeads = (event, newValue) => {
    if (newValue) {
      return setSelectedInfoLeads(newValue);
    }

    setSelectedInfoLeads((prevState) => (prevState === 0 ? 1 : 0));
  };

  function buscarLeads() {
    if (selectedInfoLeads === 0) {
      if (
        (!companyName && searchFor === "dba") ||
        companySelect[0]?.companyName === ""
      ) {
        let errorMessage = "The company name field is mandatory!";
        message.error(errorMessage);
      } else {
        setShowLinksTable(true);
        finderUrl();
      }
    } else if (selectedInfoLeads === 1) {
      if (!companyName || !firstName || !lastName) {
        let errorMessage = "Please fill in the following fields:";
        if (!companyName) errorMessage += " Company Name";
        if (!firstName || !lastName) errorMessage += " First or Last name";
        message.error(errorMessage);
        return;
      } else {
        setShowLinksTable(true);
        finderUrl();
      }
    }
  }

  async function startUrl() {
    try {
      setLoadingLinks(true);
      const response = await finderLink(
        companySelect[0]?.companyName,
        companySelect[0].country
      );
      return setLinks(response);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setTimeout(() => setLoadingLinks(false), 2000);
    }
  }

  async function finderUrl() {
    try {
      if (searchFor === "dba") {
        setLoadingLinks(true);
        const response = await finderLink(
          companyName,
          companySelect[0].country
        );
        return setLinks(response);
      }
      setLoadingLinks(true);

      const response = await finderLink(
        companySelect[0]?.companyName,
        companySelect[0].country
      );
      return setLinks(response);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setTimeout(() => setLoadingLinks(false), 2000);
    }
  }

  const handleSelectCompanyLead = (url) => {
    if (companySelect[0]?.companyId) {
      addLeadView(userId, companySelect[0]?.companyId);
    }
    setLeadStep(1);
    setSelectedLeadUrl(url);
  };

  const [viewLeads, setViewLeads] = useState();
  const [checkViewLeads, setCheckViewLeads] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (userId && companySelect) {
        const exists = await checkLeadView(userId, companySelect[0]?.companyId);
        setCheckViewLeads(exists);
        if (exists) {
          const leads = await filterLeadsCompanyIdDB(
            companySelect[0]?.companyId
          );
          setViewLeads(leads);
        }
      }
    };

    fetchData();
  }, [userId, companySelect]);

  return (
    <Grid item xs={toggleDrawer ? 10 : 11} container className={animatedStep}>
      <Grid item xs={12} style={{ marginBottom: 50 }}>
        <div
          style={{
            top: 0,
            paddingTop: 24,
            zIndex: 50,
            background: "#ffffff",
          }}
        >
          <Header
            onPrint={handlePrintProfile}
            onSave={saveCompany}
            companySelect={companySelect}
            supplierOrBuyer={supplierOrBuyer}
            moveStepAnimation={moveStepAnimation}
            renderFlag={renderFlag}
            excelData={companySelect}
          />

          <Tabs
            value={selectedInfo}
            onChange={handleSelectInfo}
            aria-label="Filter by"
            style={{
              marginTop: -40,
              width: "98%",
              borderBottom: `1px solid ${theme.colors.gray[100]}`,
            }}
          >
            <Tab label="Export Data" {...allyProps(0)} />
            <Tab label="Import Data" {...allyProps(1)} />
            <Tab label="Shipments" {...allyProps(2)} />
            <Tab label="Leads" {...allyProps(3)} />
            {/* <Tab label="Due Diligence Performance" {...allyProps(5)} /> */}
            {/* <Tab label="PDF" {...allyProps(4)} /> */}
          </Tabs>
        </div>

        <CustomTabPanel value={selectedInfo} index={0}>
          {hasExportData ? (
            <TablesContainer>
              <Tables
                companyProfile={companySelect[0]}
                renderFlag={renderFlag}
                role={"export"}
                handleScroll={setSelectedTable}
                selectedId={selectedTable}
              />

              <NavigationContainer>
                <TableNavigator>
                  {ExpTablesAndHashs.map((tab) => (
                    <Option
                      onClick={() => handleClickScroll(tab.id)}
                      key={tab.id}
                      isActive={selectedTable === tab.id}
                    >
                      <div className="navContent">
                        <p>{tab.label}</p>
                      </div>
                    </Option>
                  ))}
                </TableNavigator>
              </NavigationContainer>
            </TablesContainer>
          ) : (
            <div>
              <h1 style={{ color: theme.colors.gray[300] }}>
                The company hasn't declared any data , or its operation are
                declared under another name.
              </h1>
            </div>
          )}
        </CustomTabPanel>

        <CustomTabPanel value={selectedInfo} index={1}>
          {hasImportData ? (
            <TablesContainer>
              <Tables
                companyProfile={companySelect[0]}
                renderFlag={renderFlag}
                role={"import"}
                handleScroll={setSelectedTable}
                selectedId={selectedTable}
              />

              <NavigationContainer>
                <TableNavigator>
                  {ImpTablesAndHashs.map((tab) => (
                    <Option
                      onClick={() => handleClickScroll(tab.id)}
                      key={tab.id}
                      isActive={selectedTable === tab.id}
                    >
                      <div className="navContent">
                        <p>{tab.label}</p>
                      </div>
                    </Option>
                  ))}
                </TableNavigator>
              </NavigationContainer>
            </TablesContainer>
          ) : (
            <div>
              <h1 style={{ color: "#bbb" }}>
                The company hasn't declared any data , or its operation are
                declared under another name.
              </h1>
            </div>
          )}
        </CustomTabPanel>

        <CustomTabPanel value={selectedInfo} index={2}>
          <Shipments
            companyName={companySelect[0]?.companyName}
            shipments={shipments}
            country={companySelect[0]?.country}
          />
        </CustomTabPanel>

        <CustomTabPanel value={selectedInfo} index={3}>
          {isLeadsLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 500,
              }}
            >
              {<Spinner size={120} />}
            </div>
          ) : (
            <>
              <MyCardContent>
                <Tabs
                  value={selectedInfoLeads}
                  onChange={handleSelectInfoLeads}
                  aria-label="Filter by"
                  style={{
                    width: "98%",
                    borderBottom: "1px solid #d9d9d9",
                    marginTop: "8px",
                  }}
                >
                  <Tab
                    label="Search Company"
                    {...allyProps(0)}
                    // onClick={() => setLeadStep(0)}
                  />
                </Tabs>

                <CustomTabPanel value={selectedInfoLeads} index={0}>
                  <div className="searchFor">
                    <input
                      type="radio"
                      id="companyName"
                      name="SearchFor"
                      value={"companyName"}
                      onChange={() => handleSearchFor("companyName")}
                      checked={searchFor === "companyName"}
                    />
                    <label htmlFor="company" style={{ marginRight: 32 }}>
                      Company Name
                    </label>

                    <input
                      type="radio"
                      id="DBA"
                      name="SearchFor"
                      value={"DBA"}
                      onChange={() => handleSearchFor("dba")}
                      checked={searchFor === "dba"}
                    />
                    <label htmlFor="DBA">DBA</label>
                  </div>
                  <HeaderFilter>
                    <GroupInput
                      className="groupInputSale"
                      style={{ marginTop: 0 }}
                    >
                      <SelectDefault
                        className={"inputSale"}
                        placeholder="Select country"
                        type="text"
                        value={companySelect[0].country}
                        defaultValue={companySelect[0].country}
                        disabled
                      >
                        <option>
                          {companySelect[0].country?.charAt(0)?.toUpperCase() +
                            companySelect[0]?.country?.slice(1)}
                        </option>
                      </SelectDefault>
                      <ImgOpt
                        className="iconInputFix"
                        width="20px"
                        height="20px"
                        src={
                          companySelect[0].country
                            ? getFlag(companySelect[0].country)
                            : Ping
                        }
                      />
                    </GroupInput>

                    <input
                      disabled={searchFor === "companyName"}
                      type="text"
                      placeholder="Company Name*"
                      value={companyName}
                      onChange={handleCompanyName}
                      style={{ height: 42 }}
                    />

                    <SearchButton onClick={buscarLeads}>Search</SearchButton>
                  </HeaderFilter>
                </CustomTabPanel>
              </MyCardContent>

              <CustomTabPanel value={selectedInfoLeads} index={0}>
                <Container>
                  {loadingLinks && (
                    <div style={{ margin: "20px 0" }}>
                      <LoadingBar isLoading={loadingLinks} />
                    </div>
                  )}

                  {selectedInfoLeads === 0 &&
                    leadStep === 0 &&
                    showLinksTable &&
                    !loadingLinks && (
                      <LinksTable
                        data={links}
                        companyName={companyName}
                        userId={userId}
                        userName={userName}
                        onClick={handleSelectCompanyLead}
                        isTrade={true}
                        companyId={companySelect[0]?.companyId}
                      />
                    )}

                  {checkViewLeads && viewLeads != undefined && (
                    <ProfileCompany
                      nameCompany={companyName}
                      url={viewLeads?.domain}
                      isChildren={true}
                      companyId={companySelect[0]?.companyId}
                    />
                  )}

                  {selectedInfoLeads === 0 && leadStep === 1 && (
                    <ProfileCompany
                      nameCompany={companyName}
                      url={selectedLeadUrl}
                      isChildren={true}
                      companyId={companySelect[0]?.companyId}
                    />
                  )}
                </Container>
              </CustomTabPanel>
            </>
          )}
        </CustomTabPanel>

        <CustomTabPanel value={selectedInfo} index={4}>
          <>
            {sanctionStep === 0 ? (
              <SanctionContainer>
                <SanctionImage />

                <TextDefault bold={"400"} style={{ margin: "32px 0" }}>
                  Ensure the safety of your business by performing due diligence
                  and effectively screening business partners, <br /> potential
                  clients, and customers against 620+ global sanctions and
                  restricted party lists.
                </TextDefault>

                <ButtonBlue onClick={getSanctions}>Get Performance</ButtonBlue>
              </SanctionContainer>
            ) : (
              <>
                <CardFavoriteSanction />
                <br />
                <hr />
                <br />
                <CardSanction />
              </>
            )}
          </>
        </CustomTabPanel>

        <CustomTabPanel value={selectedInfo} index={5}>
          {Object.keys(companySelect[0]).length > 0 && (
            <Pdf
              ref={targetRef}
              type={supplierOrBuyer}
              company={companySelect}
              filters={{
                role: supplierOrBuyer,
                hsCode: hsCode,
                type: "byName",
                fromDate: fromDate,
                toDate: toDate,
              }}
              shipments={shipments}
              leadsUrl={selectedLeadUrl}
            />
          )}
        </CustomTabPanel>
      </Grid>
    </Grid>
  );
}
