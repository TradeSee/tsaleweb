import React, { useEffect, useMemo, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import {
  ColumnContainer,
  ContainerHome,
  TextDefault,
  IconServices,
  RowContainer,
  MainSearchInput,
  CardHsCode,
  ImgIconProduct,
  TagBlue,
  ContainerBtnNextSolutions,
  BtnNextSolutions,
  BackIconProduct,
  ImgOpt,
  SelectDefault,
  ContainerErroLogin,
} from "../../assets/styles";
import Drawer from "../../components/Drawer";
import ButtonBlue from "../../components/myButton";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PortIcon from "../../icons/port.png";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import { authScreen } from "../../contexts/auth";
import HsCodeList from "../../hooks/HsCodeList";
import IconHs from "../../icons/buyer.png";
import ModalCode from "./assets/ModalCode";
import WeightIcon from "../../icons/boxWeight.png";
import PriceIcon from "../../icons/moeda2.png";
import WidthIcon from "../../icons/boxWidth.png";
import HeightIcon from "../../icons/boxHeight.png";
import LengthIcon from "../../icons/boxLength.png";
import PorcentIcon from "../../icons/discount.png";
import AwardIcon from "../../icons/medal.png";
import TaxIcon from "../../icons/tax.png";
import IncotermIcon from "../../icons/abstract-shape.png";
import Cost1Icon from "../../icons/delivery.png";
import Cost2Icon from "../../icons/boat.png";
import Cost3Icon from "../../icons/stock.png";
import Cost5Icon from "../../icons/broker.png";
import Cost6Icon from "../../icons/service.png";
import { NumericFormat } from "react-number-format";
import Country from "../../components/Flag";
import Ping from "../../icons/ping.png";
import SwitchPrincing from "../../components/switchPrincing";
import Capitalize from "../../utils/capitalize";
import ContainerIcon from "../../icons/container-02.webp";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { getMetalPrice } from "../../hooks/metalPrice";

import FormatNumber from "../../utils/formatNumber";
import { Divider, Tour } from "antd";
import PHscode from "./imgs/fHscode.png";
import PForms from "./imgs/forms.png";
import PResult from "./imgs/result.png";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import Warning from "../../icons/cancel.png";
import SimuDemo from "./assets/SimuDemo.png";

import saveSimulation from "../../service/SaveSimulation";

import {
  GroupInput,
  Container,
  Content,
  CostCard,
  HsCodes,
  InfoCard,
  InputsContainer,
  ButtonNextBlue,
  CostsContainer,
} from "./styles";
import getUserInfo, { getCompanyUser } from "../../hooks/getUsers";
import { useReactToPrint } from "react-to-print";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import { List, TravelExplore } from "@mui/icons-material";
import { Pdf } from "./components/Pdf";
import ModalList from "./components/Modal";
import { InitialIcon } from "../../components/InitialIcons";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ paddingTop: 24 }}
    >
      {children}
    </div>
  );
}

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Simulation() {
  const { state } = useLocation();
  const fnpState = state;

  useEffect(() => {
    if (state) {
      if (state.transactionType === "Supplier") {
        setCountryFrom(Capitalize(state.country));
      } else {
        setCountryTo(Capitalize(state.country));
      }
    }
  }, [state]);

  const [auth, setAuth] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const [step, setStep] = useState(0);
  const [animatedStep, setAnimatedStep] = useState("staticStep");
  const [hsCodeSeach, setHsCodeSeach] = useState("");
  const [products, setProducts] = useState([]);
  const [hsCodeSel, setHsCodeSel] = useState([]);
  const [cardHsSel, setCardHsSel] = useState(false);
  const [modal, setModal] = useState(false);
  const [isInfoCardActive, setIsInfoCardActive] = useState(false);
  const [description, setDescription] = useState([]);
  const [companyData, setCompanyData] = useState();
  const [metalPrice, setMetalPrice] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMetalPrice, setSelectedMetalPrice] = useState(0);
  const [selectedInfo, setSelectedInfo] = useState(0);

  //inputs form
  //Set the Shipment
  const [shipUnit, setShipUnit] = useState("m");
  const [shipWeight, setShipWeight] = useState("");
  const [shipPrice, setShipPrice] = useState("");
  const [shipWidth, setShipWidth] = useState("");
  const [shipHeight, setShipHeight] = useState("");
  const [shipLength, setShipLength] = useState("");

  //Net Price
  const [netLme, setNetLme] = useState("");
  const [netExchange, setNetExchange] = useState("");
  const [netAward, setNetAward] = useState("");

  //Taxes
  const [taxesNational, setTaxesNational] = useState("");
  const [taxesInternational, setTaxesInternational] = useState("");

  //Cost Calculation
  const [costIncoterm, setCostIncoterm] = useState("");
  const [costOrigin, setCostOrigin] = useState("");
  const [costMaritime, setCostMaritime] = useState("");
  const [costPort, setCostPort] = useState("");
  const [costTrasp, setCostTrasp] = useState("");
  const [costBroker, setCostBroker] = useState("");
  const [costImport, setCostImport] = useState("");

  //location
  const [countryFrom, setCountryFrom] = useState("");
  const [countryTo, setCountryTo] = useState("");

  //Containers
  const [containers, setContainers] = useState("");
  const [allSpec, setAllSpec] = useState("");
  const pdfRef = useRef(null);

  const [errorLogin, setErrorLogin] = useState("erroStep0");

  const navigate = useNavigate();

  const searchHsCode = useMemo(() => {
    const typeHsCode = isNaN(hsCodeSeach);

    if (state) {
      const filteredHsCodes = products.filter((hs) =>
        state.hsCodes.includes(hs.hsCode)
      );

      if (typeHsCode) {
        return filteredHsCodes.filter((item) =>
          item.hsName.toLowerCase().includes(hsCodeSeach.toLowerCase())
        );
      }

      return filteredHsCodes.filter((item) =>
        item.hsCode.includes(hsCodeSeach)
      );
    }

    if (typeHsCode) {
      return products.filter((item) =>
        item.hsName.toLowerCase().includes(hsCodeSeach.toLowerCase())
      );
    }

    return products.filter((item) => item.hsCode.includes(hsCodeSeach));
  }, [products, hsCodeSeach, fnpState]);

  useEffect(() => {
    authScreen().then((res) => {
      if (res) {
        setTimeout(() => {
          setAuth(true);
        }, 1000);
        requestHsList();
      } else {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    });
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth) {
      const fetchData = async () => {
        try {
          const userData = await getUserInfo();
          setUserInfo(userData);
        } catch (error) {
          console.error("Erro ao buscar informações do usuário:", error);
        }
      };

      fetchData().finally(() => {
        setLoading(false);
      });
    }
  }, [auth]);

  useEffect(() => {
    getMetalPrice().then((res) => {
      setMetalPrice(Object.values(res));
    });
  }, []);

  const requestHsList = () => {
    if (products.length === 0) {
      HsCodeList()
        .then((data) => {
          setProducts(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getFlag = (country) => {
    let filter = Country.filter((item) => {
      return item.country.toLowerCase() === country.toLowerCase();
    });
    return filter[0].src;
  };

  const selectHsCode = (key, hsCode, hsName) => {
    const selectedHsCodes = [...hsCodeSel];
    const isAlreadySelectedIndex = selectedHsCodes.findIndex(
      (obj) => obj.key === key
    );

    if (selectedHsCodes.length <= 4 && isAlreadySelectedIndex === -1) {
      setHsCodeSel([...selectedHsCodes, { key, hsCode, hsName }]);
    } else if (isAlreadySelectedIndex !== -1) {
      const updatedHsCodes = selectedHsCodes.filter((obj) => obj.key !== key);
      setHsCodeSel(updatedHsCodes);
    } else {
      const updatedHsCodes = selectedHsCodes.slice(
        0,
        selectedHsCodes.length - 1
      );
      setHsCodeSel([...updatedHsCodes, { key, hsCode, hsName }]);
    }
  };

  const validSeletHsCode = (key) => {
    const indexObject = hsCodeSel.findIndex((obj) => obj.key === key);

    if (indexObject !== -1) {
      return true;
    } else {
      return false;
    }
  };

  function SetToggle(state) {
    useTroggleDawer(state);
  }

  const moveStepAnimation = (animation, step) => {
    //animation next = Direita para Esquerda
    //animation back = Esqueda pra direita
    //step = condicional da tela de exibição
    scrollTop();

    if (animation == "next") {
      setAnimatedStep("nextStepAnimated");
      setStep(step);
      setTimeout(() => {
        setAnimatedStep("staticStep");
      }, 1000);
    } else {
      setAnimatedStep("backStepAnimated");
      setStep(step);
      setTimeout(() => {
        setAnimatedStep("staticStep");
      }, 1000);
    }
  };

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const clearHs = () => {
    setHsCodeSel([]);
    setModal(false);
  };

  const nextModal = () => {
    setModal(false);
    moveStepAnimation("next", 2);
  };

  function calcularContainers(peso, largura, altura, comprimento, unidade) {
    const weight = peso
      .map((w) => parseFloat(w.replace(" Ton.", "")))
      .reduce((acc, actual) => acc + actual, 0);
    const width = largura
      .map((w) => parseFloat(w.replace(` ${shipUnit}`, "")))
      .reduce((acc, actual) => acc + actual, 0);
    const height = altura
      .map((a) => parseFloat(a.replace(` ${shipUnit}`, "")))
      .reduce((acc, actual) => acc + actual, 0);
    const compri = comprimento
      .map((c) => parseFloat(c.replace(` ${shipUnit}`, "")))
      .reduce((acc, actual) => acc + actual, 0);

    // Convertendo as medidas para metros, se necessário
    //if (unidade === 'ft') {
    //  largura = largura * 0.3048;
    //  altura = altura * 0.3048;
    //  comprimento = comprimento * 0.3048;
    //}

    // Calculando o volume da carga em metros cúbicos
    const volume = width * height * compri;

    const volumeMax20 = unidade === "m" ? 33 : 1164.47;
    const volumeMax40 = unidade === "m" ? 67.6 : 2387.9;

    // Definindo a quantidade e o tipo de containers necessários
    var containers20 = 0;
    var containers40 = 0;

    // Verificando se é possível utilizar um container de 20 pés para complementar um de 40 pés
    if (weight <= 28 && volume <= volumeMax20) {
      containers20 = 1;
    } else if (weight <= 30 && volume <= volumeMax40) {
      containers40 = 1;
    } else {
      // Calculando o número de containers necessários
      const containersTotal = Math.ceil(
        Math.max(weight / 30, volume / volumeMax40)
      );
      // Verificando se é necessário um container de 20 pés adicional
      if (
        containersTotal > 1 &&
        containersTotal * 30 - weight <= 28 &&
        containersTotal * volumeMax40 - volume <= volumeMax20
      ) {
        containers20 = 1;
        containers40 = containersTotal - 1;
      } else {
        containers40 = containersTotal;
      }
    }

    setContainers({
      containers20,
      containers40,
      volume: `${volume} ${unidade}³`,
    });
    resultSimulation();
  }

  const resultSimulation = () => {
    let totalTx = TaxesSum(taxesNational, taxesInternational);

    let totalNetPrice = shipPrice.map((ship, index) =>
      calcNetPrice(ship, netLme[index], netAward[index], netExchange[index])
    );
    let numberTx = parseFloat(totalTx.replace(" %", ""));
    let numberNetPrice = totalNetPrice.map((net) =>
      parseFloat(net.replace("US$ ", "").replace(",", ""))
    );

    let totalTxPrice = numberNetPrice.map((num) =>
      (num * (numberTx / 100)).toFixed(2)
    );
    let CostSum =
      convertNumberMask(costOrigin) +
      convertNumberMask(costMaritime) +
      convertNumberMask(costPort) +
      convertNumberMask(costTrasp) +
      convertNumberMask(costBroker) +
      convertNumberMask(costImport);
    let priceForTon = numberNetPrice.map(
      (net) => net + parseFloat(totalTxPrice)
    );
    let totalOperation = priceForTon.map(
      (price, index) =>
        price * parseFloat(shipWeight[index].replace(" Ton.")) + CostSum
    );

    let result = {
      hsCodeSel,
      shipUnit,
      shipWeight,
      shipPrice,
      shipWidth,
      shipHeight,
      shipLength,
      netLme,
      netExchange,
      netAward,
      totalNetPrice,
      taxesNational,
      taxesInternational,
      totalTx,
      totalTxPrice,
      costIncoterm,
      costOrigin,
      costMaritime,
      costPort,
      costTrasp,
      costBroker,
      costImport,
      countryFrom,
      countryTo,
      CostSum,
      priceForTon,
      totalOperation,
      description,
      containers,
    };
    setAllSpec(result);
  };

  function getUnidade(unidade) {
    setShipUnit(unidade);
  }

  function TaxesSum(tx1, tx2) {
    tx1 = parseFloat(tx1.replace(" %", ""));
    tx2 = parseFloat(tx2.replace(" %", ""));

    return tx1 + tx2 + " %";
  }

  function calcNetPrice(price, lme, awd, ex) {
    price = parseFloat(price.replace("US$ ", "").replace(",", ""));
    lme = parseFloat(lme.replace(" %", ""));
    awd = parseFloat(awd.replace("US$ ", ""));
    ex = parseFloat(ex.replace(" %", ""));

    let totalCalc = (price * (lme / 100) + awd) * (1 + ex / 100);

    return "US$ " + FormatNumber(totalCalc);
  }

  function convertNumberMask(number) {
    number = number.replace("US$ ", "").replace(",", "");
    return parseFloat(number);
  }

  function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
  }

  function getCurrentDateTime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = addLeadingZero(date.getMonth() + 1);
    let day = addLeadingZero(date.getDate());
    let hours = addLeadingZero(date.getHours());
    let minutes = addLeadingZero(date.getMinutes());
    let seconds = addLeadingZero(date.getSeconds());
    let offset = date.getTimezoneOffset();
    let offsetHours = addLeadingZero(Math.abs(Math.floor(offset / 60)));
    let offsetMinutes = addLeadingZero(Math.abs(offset % 60));
    let offsetSign = offset < 0 ? "+" : "-";

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`;
  }

  function handleSaveSimulation() {
    let totalTx = TaxesSum(taxesNational, taxesInternational);
    let totalNetPrice = calcNetPrice(shipPrice, netLme, netAward, netExchange);
    let numberTx = parseFloat(totalTx.replace(" %", ""));
    let numberNetPrice = parseFloat(
      totalNetPrice.replace("US$ ", "").replace(",", "")
    );
    let totalTxPrice = (numberNetPrice * (numberTx / 100)).toFixed(2);
    let CostSum =
      convertNumberMask(costOrigin) +
      convertNumberMask(costMaritime) +
      convertNumberMask(costPort) +
      convertNumberMask(costTrasp) +
      convertNumberMask(costBroker) +
      convertNumberMask(costImport);

    const budget = {
      shipPrice,
      netLme,
      netExchange,
      netAward,
      taxesNational,
      taxesInternational,
      costIncoterm,
      costOrigin,
      costMaritime,
      costPort,
      costTrasp,
      costBroker,
      costImport,
      numberTx,
      totalNetPrice,
      totalTxPrice,
      CostSum,
    };

    saveSimulation(
      { ...allSpec, date: getCurrentDateTime() },
      countryFrom,
      countryTo,
      budget,
      userInfo?.uid
    );
  }

  function handleMetalPrices() {
    const keywords = hsCodeSel[0].hsName
      .toLowerCase()
      .split(" ")
      .filter(
        (name) =>
          name !== "and" &&
          name !== "in" &&
          name !== "or" &&
          name !== "other" &&
          name !== "on"
      );

    const filteredMetals = metalPrice.filter((register) => {
      const metal = register?.MetalName?.toLowerCase();

      return keywords.some((keyword) => metal.includes(keyword));
    });

    return filteredMetals;
  }

  function handleSelectMetal(value) {
    setSelectedMetalPrice(value);
    setIsModalVisible(false);
  }

  const handleSelectInfo = (event, newValue) => {
    if (newValue) {
      return setSelectedInfo(newValue);
    }

    setSelectedInfo((prevState) => (prevState === 0 ? 1 : 0));
  };

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const [open, setOpen] = useState(false);
  const steps = [
    {
      title: "Select HsCode",
      description: "",
      cover: <img alt="tour.png" src={PHscode} />,
      target: () => ref1.current,
    },
    {
      title: "Fill in your load information for simulation.",
      description: "",
      target: () => ref2.current,
      cover: <img alt="tour.png" src={PForms} />,
    },
    {
      title: "Finally, this is the results page with all the calculations",
      description: "",
      cover: <img alt="tour.png" src={PResult} />,
      target: () => ref3.current,
    },
  ];

  const handleClick = () => {
    setErrorLogin("erroStep1");
    setTimeout(() => {
      setErrorLogin("erroStep2");
    }, 5000);
  };

  const validForm = () => {
    if (
      shipWeight &&
      shipPrice &&
      shipWidth &&
      shipHeight &&
      shipLength &&
      netLme &&
      netExchange &&
      netAward &&
      taxesNational &&
      taxesInternational &&
      costIncoterm &&
      costOrigin &&
      costMaritime &&
      costPort &&
      costTrasp &&
      costBroker &&
      costImport &&
      countryFrom &&
      countryTo
    ) {
      moveStepAnimation("next", 3);
      calcularContainers(
        shipWeight,
        shipWidth,
        shipHeight,
        shipLength,
        shipUnit
      );
    } else {
      handleClick();
    }
  };

  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
  });

  const actions = [
    {
      icon: <SaveIcon />,
      name: "Save Simulation",
      functionality: handleSaveSimulation,
    },
    {
      icon: <TravelExplore />,
      name: "Trade Data",
      functionality: () => navigate("/trade-data"),
    },
    {
      icon: <PrintIcon />,
      name: "Print",
      functionality: handlePrint,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserInfo();
        return userData;
      } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error);
      }
    };

    fetchData().then((res) =>
      getCompanyUser(res.uid).then((res) => setCompanyData(res))
    );
  }, []);

  // Description
  const handleChangeDescription = (index, valor) => {
    const novosValores = [...description];
    novosValores[index] = valor;
    setDescription(novosValores);
  };

  // Prices
  const handleChangeShipWeight = (index, valor) => {
    const novosValores = [...shipWeight];
    novosValores[index] = valor;
    setShipWeight(novosValores);
  };

  const handleChangeShipWidth = (index, valor) => {
    const novosValores = [...shipWidth];
    novosValores[index] = valor;
    setShipWidth(novosValores);
  };

  const handleChangeShipPrice = (index, valor) => {
    const novosValores = [...shipWidth];
    novosValores[index] = valor;
    setShipPrice(novosValores);
  };

  const handleChangeShipHeight = (index, valor) => {
    const novosValores = [...shipHeight];
    novosValores[index] = valor;
    setShipHeight(novosValores);
  };

  const handleChangeShipLength = (index, valor) => {
    const novosValores = [...shipLength];
    novosValores[index] = valor;
    setShipLength(novosValores);
  };

  // Net Price
  const handleChangeLme = (index, valor) => {
    const novosValores = [...shipWeight];
    novosValores[index] = valor;
    setNetLme(novosValores);
  };

  const handleChangeExchange = (index, valor) => {
    const novosValores = [...shipWeight];
    novosValores[index] = valor;
    setNetExchange(novosValores);
  };

  const handleChangeNetAward = (index, valor) => {
    const novosValores = [...shipWeight];
    novosValores[index] = valor;
    setNetAward(novosValores);
  };

  return (
    <>
      {auth ? (
        <ContainerHome>
          <Grid
            container
            style={{
              height: "100%",
            }}
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={toggleDrawer ? 2 : 1}>
              <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
            </Grid>
            {step === 0 ? (
              <Grid
                item
                xs={toggleDrawer ? 10 : 11}
                container
                alignItems="center"
                className={animatedStep}
              >
                <Grid item xs={4}>
                  <ColumnContainer style={{ marginLeft: 50 }}>
                    <TextDefault color={"#4b4b4b"} size={"32px"}>
                      The Simulation
                    </TextDefault>
                    <TextDefault
                      color={"#8a97aa"}
                      size={"18px"}
                      bold={"400"}
                      style={{ marginTop: 20, width: "75%" }}
                    >
                      Tool will help your company to carry out metals
                      commercialization Worldwide
                    </TextDefault>
                    <ButtonBlue
                      width="250px"
                      marginTop="50px"
                      onClick={() => moveStepAnimation("next", 1)}
                    >
                      Get started{" "}
                      <ArrowForwardIcon
                        sx={{ fontSize: "1.2rem", verticalAlign: "middle" }}
                      />
                    </ButtonBlue>
                    {/* <>
                      <ButtonBlue
                        width="250px"
                        marginTop="12px"
                        onClick={() => setOpen(true)}
                      >
                        Begin Tour{" "}
                        <ConnectingAirportsIcon
                          sx={{ fontSize: "1.4rem", verticalAlign: "middle" }}
                        />
                      </ButtonBlue>

                      <Divider />

                      <Tour
                        open={open}
                        onClose={() => setOpen(false)}
                        steps={steps}
                      />
                    </> */}
                  </ColumnContainer>
                </Grid>
                <Grid item xs={4}>
                  <InitialIcon>
                    <img src={SimuDemo} alt="Simulator" />
                  </InitialIcon>
                </Grid>
              </Grid>
            ) : step === 1 ? (
              <>
                <Grid
                  item
                  xs={toggleDrawer ? 10 : 11}
                  container
                  className={animatedStep}
                >
                  <Grid item xs={12}>
                    <ButtonNextBlue
                      disabled={hsCodeSel.length === 0}
                      onClick={nextModal}
                    >
                      Next
                    </ButtonNextBlue>

                    <ColumnContainer style={{ marginLeft: 20, marginTop: 50 }}>
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
                          onClick={() => moveStepAnimation("back", step - 1)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50px"
                            height="50px"
                            viewBox="0 0 24 24"
                            class="stroke-blue-300"
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

                      <TextDefault color={"#4b4b4b"} size={"32px"}>
                        HS Code
                      </TextDefault>
                      <TextDefault
                        color={"#8a97aa"}
                        size={"18px"}
                        bold={"400"}
                        style={{ marginTop: 10, width: "75%" }}
                      >
                        Choose an Harmonized System Code, to proceed with the
                        next simulation step.
                      </TextDefault>

                      <MainSearchInput
                        onChange={(item) => setHsCodeSeach(item.target.value)}
                        value={hsCodeSeach}
                        className="mainSearch"
                        name="text"
                        placeholder="Search..."
                        type="search"
                        style={{
                          marginTop: 20,
                          marginBottom: 60,
                          width: "95.5%",
                        }}
                      />

                      <HsCodes>
                        {searchHsCode.map((objeto) => (
                          <CardHsCode
                            className="cardCountry"
                            key={objeto.key}
                            onClick={() =>
                              selectHsCode(
                                objeto.key,
                                objeto.hsCode,
                                objeto.hsName
                              )
                            }
                            style={{
                              backgroundColor: validSeletHsCode(objeto.key)
                                ? "#e9edf8"
                                : "",
                            }}
                          >
                            <BackIconProduct>
                              <ImgIconProduct src={IconHs} />
                            </BackIconProduct>
                            <ColumnContainer>
                              <RowContainer
                                style={{
                                  alignItems: "center",
                                  display: "flex",
                                }}
                              >
                                <TextDefault
                                  size={"12px"}
                                  style={{ marginLeft: 10 }}
                                >
                                  HS CODE
                                </TextDefault>
                                <TagBlue style={{ marginLeft: 10 }}>
                                  <TextDefault size={"12px"} color={"#fff"}>
                                    {objeto.hsCode}
                                  </TextDefault>
                                </TagBlue>
                              </RowContainer>
                              <TextDefault
                                className="lineLM3"
                                size={"10px"}
                                bold={"200"}
                                color={"#8a97aa"}
                                style={{
                                  marginLeft: 10,
                                  marginTop: 7,
                                  width: 200,
                                }}
                              >
                                {objeto.hsName}
                              </TextDefault>
                            </ColumnContainer>
                          </CardHsCode>
                        ))}
                      </HsCodes>
                    </ColumnContainer>
                  </Grid>
                  <ModalCode
                    open={modal}
                    hs={hsCodeSel}
                    close={clearHs}
                    next={nextModal}
                    descValue={description}
                    handleDescription={setDescription}
                  />
                </Grid>
                <div style={{ height: 100, width: "100%" }} />
              </>
            ) : step === 2 ? (
              <>
                <ModalList
                  visible={isModalVisible}
                  data={handleMetalPrices}
                  handleSelectMetal={handleSelectMetal}
                  onCancel={() => setIsModalVisible(false)}
                />

                <ContainerErroLogin className={errorLogin}>
                  <div className="cardErroLogin">
                    <img className="imgErroLogin" src={Warning} alt="Error" />
                    <div className="textBoxErroLogin">
                      <div className="textContentErroLogin">
                        <p className="h1ErroLogin">Attention!</p>
                        <span className="spanErroLogin"></span>
                      </div>
                      <p className="pErroLogin">
                        Fill in all the fields to proceed.
                      </p>
                      <div></div>
                    </div>
                  </div>
                </ContainerErroLogin>
                <Grid
                  item
                  xs={toggleDrawer ? 10 : 11}
                  container
                  className={animatedStep}
                >
                  <Grid item xs={12}>
                    <ColumnContainer style={{ marginLeft: 20, marginTop: 50 }}>
                      <RowContainer
                        style={{
                          width: 55,
                          position: "fixed",
                          left: "5%",
                          top: 40,
                        }}
                      >
                        <button
                          class="cursor-pointer duration-200 hover:scale-125 active:scale-100"
                          title="Go Back"
                          style={{
                            backgroundColor: "transparent",
                            borderWidth: 0,
                            width: "100%",
                            justifyContent: "flex-start",
                            display: "flex",
                          }}
                          onClick={() => moveStepAnimation("back", step - 1)}
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

                      <TextDefault color={"#4b4b4b"} size={"32px"}>
                        Forms
                      </TextDefault>

                      <Tabs
                        value={selectedInfo}
                        onChange={handleSelectInfo}
                        aria-label="Filter by"
                        style={{
                          marginTop: 24,
                          width: "98%",
                          borderBottom: "1px solid #d9d9d9",
                        }}
                      >
                        {hsCodeSel.map((hs, index) => (
                          <Tab label={`${hs.hsCode}`} {...allyProps(index)} />
                        ))}
                        <Tab label={"Total"} {...allyProps(hsCodeSel.length)} />
                      </Tabs>

                      {hsCodeSel.map((hs, index) => (
                        <CustomTabPanel
                          value={selectedInfo}
                          index={index}
                          key={hs.hsCode}
                        >
                          <TextDefault
                            style={{ marginTop: 50 }}
                            size={"20px"}
                            color={"#4b4b4b"}
                          >
                            Set the Description
                          </TextDefault>
                          <br />
                          <TextDefault
                            color={"#8a97aa"}
                            size={"13px"}
                            bold={"400"}
                            style={{ marginTop: 10, width: "75%" }}
                          >
                            The product description that will show on notes
                          </TextDefault>
                          <br />
                          <input
                            placeholder="Product Description"
                            value={description[index]}
                            className="inputSale"
                            maxLength={20}
                            style={{
                              maxWidth: 400,
                              marginBottom: 32,
                              marginTop: 12,
                            }}
                            onChange={(e) =>
                              handleChangeDescription(index, e.target.value)
                            }
                          />

                          <br />
                          <TextDefault
                            style={{ marginTop: 50 }}
                            size={"20px"}
                            color={"#4b4b4b"}
                          >
                            Set the Shipment
                          </TextDefault>

                          <br />
                          <TextDefault
                            color={"#8a97aa"}
                            size={"13px"}
                            bold={"400"}
                            style={{ marginTop: 10, width: "75%" }}
                          >
                            Fill in all the information of your load to proceed.
                          </TextDefault>

                          <InputsContainer style={{ marginBottom: 24 }}>
                            <GroupInput>
                              <SwitchPrincing
                                text1={"ft"}
                                text2={"m"}
                                onOptionChange={getUnidade}
                              />
                            </GroupInput>
                            <GroupInput className="groupInputSale">
                              <NumericFormat
                                className={`${
                                  errorLogin === "erroStep1" &&
                                  (shipWeight[index] === "" ||
                                    shipWeight === "")
                                    ? "inputSale-error"
                                    : "inputSale"
                                }`}
                                placeholder="Weight (Tons./Total)"
                                type="text"
                                value={shipWeight[index]}
                                onChange={(item) =>
                                  handleChangeShipWeight(
                                    index,
                                    item.target.value
                                  )
                                }
                                thousandSeparator={true}
                                decimalSeparator={"."}
                                decimalScale={2}
                                fixedDecimalScale={true}
                                suffix=" Ton."
                              />
                              <ImgOpt
                                className="iconInputHide"
                                src={WeightIcon}
                              />
                            </GroupInput>
                            <GroupInput
                              style={{
                                position: "relative",
                              }}
                              className="groupInputSale"
                            >
                              <NumericFormat
                                className={`${
                                  errorLogin === "erroStep1" &&
                                  (shipPrice[index] === "" || shipPrice === "")
                                    ? "inputSale-error"
                                    : "inputSale"
                                }`}
                                placeholder="Price per Ton. (USD)"
                                type="text"
                                value={
                                  parseFloat(selectedMetalPrice) ||
                                  shipPrice[index]
                                }
                                onChange={(item) =>
                                  handleChangeShipPrice(
                                    index,
                                    item.target.value
                                  )
                                }
                                thousandSeparator={true}
                                decimalSeparator={"."}
                                decimalScale={2}
                                prefix="US$ "
                                fixedDecimalScale={true}
                              />
                              <ImgOpt
                                className="iconInputHide"
                                src={PriceIcon}
                              />

                              <button
                                className="buttonExplore"
                                onClick={() => setIsModalVisible(true)}
                              >
                                <svg
                                  className="svgIcon"
                                  viewBox="0 0 512 512"
                                  height="1em"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm50.7-186.9L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"></path>
                                </svg>
                                Explore prices
                              </button>
                            </GroupInput>

                            <GroupInput className="groupInputSale">
                              <NumericFormat
                                className={`${
                                  errorLogin === "erroStep1" &&
                                  (shipWidth[index] === "" || shipWidth === "")
                                    ? "inputSale-error"
                                    : "inputSale"
                                }`}
                                placeholder={`Width (${shipUnit}/Total)`}
                                type="text"
                                value={shipWidth[index]}
                                onChange={(item) =>
                                  handleChangeShipWidth(
                                    index,
                                    item.target.value
                                  )
                                }
                                thousandSeparator={true}
                                decimalSeparator={"."}
                                decimalScale={2}
                                suffix={` ${shipUnit}`}
                                fixedDecimalScale={true}
                              />
                              <ImgOpt
                                className="iconInputHide"
                                src={WidthIcon}
                              />
                            </GroupInput>
                            <GroupInput className="groupInputSale">
                              <NumericFormat
                                className={`${
                                  errorLogin === "erroStep1" &&
                                  (shipHeight[index] === "" ||
                                    shipHeight === "")
                                    ? "inputSale-error"
                                    : "inputSale"
                                }`}
                                placeholder={`Height (${shipUnit}/Total)`}
                                type="text"
                                value={shipHeight[index]}
                                onChange={(item) =>
                                  handleChangeShipHeight(
                                    index,
                                    item.target.value
                                  )
                                }
                                thousandSeparator={true}
                                decimalSeparator={"."}
                                decimalScale={2}
                                suffix={` ${shipUnit}`}
                                fixedDecimalScale={true}
                              />
                              <ImgOpt
                                className="iconInputHide"
                                src={HeightIcon}
                              />
                            </GroupInput>
                            <GroupInput className="groupInputSale">
                              <NumericFormat
                                className={`${
                                  errorLogin === "erroStep1" &&
                                  (shipLength[index] === "" ||
                                    shipLength === "")
                                    ? "inputSale-error"
                                    : "inputSale"
                                }`}
                                placeholder={`Length (${shipUnit}/Total)`}
                                type="text"
                                value={shipLength[index]}
                                onChange={(item) =>
                                  handleChangeShipLength(
                                    index,
                                    item.target.value
                                  )
                                }
                                thousandSeparator={true}
                                decimalSeparator={"."}
                                decimalScale={2}
                                suffix={` ${shipUnit}`}
                                fixedDecimalScale={true}
                              />
                              <ImgOpt
                                className="iconInputHide"
                                src={LengthIcon}
                              />
                            </GroupInput>
                          </InputsContainer>

                          <TextDefault
                            style={{ marginTop: 50 }}
                            size={"20px"}
                            color={"#4b4b4b"}
                          >
                            Net Price
                          </TextDefault>
                          <br />
                          <TextDefault
                            color={"#8a97aa"}
                            size={"13px"}
                            bold={"400"}
                            style={{ marginTop: 10, width: "75%" }}
                          >
                            Price of a product or service after all deductions,
                            discounts, and allowances have been applied.
                          </TextDefault>

                          <InputsContainer>
                            <GroupInput className="groupInputSale">
                              <NumericFormat
                                className={`${
                                  errorLogin === "erroStep1" &&
                                  (netLme[index] === "" || netLme === "")
                                    ? "inputSale-error"
                                    : "inputSale"
                                }`}
                                placeholder="LME percentage (%)"
                                type="text"
                                value={netLme[index]}
                                onChange={(item) =>
                                  handleChangeLme(index, item.target.value)
                                }
                                thousandSeparator={true}
                                decimalSeparator={"."}
                                decimalScale={2}
                                suffix=" %"
                                fixedDecimalScale={true}
                                maxLength={8}
                              />
                              <ImgOpt
                                className="iconInputHide"
                                src={PorcentIcon}
                              />
                            </GroupInput>
                            <GroupInput className="groupInputSale">
                              <NumericFormat
                                className={`${
                                  errorLogin === "erroStep1" &&
                                  (netExchange[index] === "" ||
                                    netExchange === "")
                                    ? "inputSale-error"
                                    : "inputSale"
                                }`}
                                placeholder="Exchange Rate Variation (%)"
                                type="text"
                                value={netExchange[index]}
                                onChange={(item) =>
                                  handleChangeExchange(index, item.target.value)
                                }
                                thousandSeparator={true}
                                decimalSeparator={"."}
                                decimalScale={2}
                                suffix=" %"
                                fixedDecimalScale={true}
                                maxLength={8}
                              />
                              <ImgOpt
                                className="iconInputHide"
                                src={PorcentIcon}
                              />
                            </GroupInput>
                            <GroupInput className="groupInputSale">
                              <NumericFormat
                                className={`${
                                  errorLogin === "erroStep1" &&
                                  (netAward[index] === "" || netAward === "")
                                    ? "inputSale-error"
                                    : "inputSale"
                                }`}
                                placeholder="Award (USD)"
                                type="text"
                                value={netAward[index]}
                                onChange={(item) =>
                                  handleChangeNetAward(index, item.target.value)
                                }
                                thousandSeparator={true}
                                decimalSeparator={"."}
                                decimalScale={2}
                                prefix="US$ "
                                fixedDecimalScale={true}
                              />
                              <ImgOpt
                                className="iconInputHide"
                                src={AwardIcon}
                              />
                            </GroupInput>
                          </InputsContainer>
                        </CustomTabPanel>
                      ))}

                      <CustomTabPanel
                        value={selectedInfo}
                        index={hsCodeSel.length}
                        key={"Total"}
                      >
                        <TextDefault
                          style={{ marginTop: 50 }}
                          size={"20px"}
                          color={"#4b4b4b"}
                        >
                          Taxes
                        </TextDefault>
                        <br />
                        <TextDefault
                          color={"#8a97aa"}
                          size={"13px"}
                          bold={"400"}
                          style={{ marginTop: 10, width: "75%" }}
                        >
                          Taxes applied to metal exports and imports.
                        </TextDefault>

                        <InputsContainer style={{ marginBottom: 24 }}>
                          <GroupInput className="groupInputSale">
                            <NumericFormat
                              className={`${
                                errorLogin === "erroStep1" &&
                                taxesNational === ""
                                  ? "inputSale-error"
                                  : "inputSale"
                              }`}
                              placeholder="National Taxes (%)"
                              type="text"
                              value={taxesNational}
                              onChange={(item) =>
                                setTaxesNational(item.target.value)
                              }
                              thousandSeparator={true}
                              decimalSeparator={"."}
                              decimalScale={2}
                              suffix=" %"
                              fixedDecimalScale={true}
                              maxLength={8}
                            />
                            <ImgOpt className="iconInputHide" src={TaxIcon} />
                          </GroupInput>
                          <GroupInput className="groupInputSale">
                            <NumericFormat
                              className={`${
                                errorLogin === "erroStep1" &&
                                taxesInternational === ""
                                  ? "inputSale-error"
                                  : "inputSale"
                              }`}
                              placeholder="International Taxes (%)"
                              type="text"
                              value={taxesInternational}
                              onChange={(item) =>
                                setTaxesInternational(item.target.value)
                              }
                              thousandSeparator={true}
                              decimalSeparator={"."}
                              decimalScale={2}
                              suffix=" %"
                              fixedDecimalScale={true}
                              maxLength={8}
                            />
                            <ImgOpt className="iconInputHide" src={TaxIcon} />
                          </GroupInput>
                        </InputsContainer>

                        <TextDefault
                          style={{ marginTop: 50 }}
                          size={"20px"}
                          color={"#4b4b4b"}
                        >
                          Cost Calculation
                        </TextDefault>
                        <br />
                        <TextDefault
                          color={"#8a97aa"}
                          size={"13px"}
                          bold={"400"}
                          style={{ marginTop: 10, width: "75%" }}
                        >
                          The cost calculation process involves a set of
                          procedures aimed at computing the total expenses
                          incurred during the shipment of metals.
                        </TextDefault>

                        <InputsContainer style={{ marginBottom: 24 }}>
                          <GroupInput className="groupInputSale">
                            <SelectDefault
                              className={`${
                                costIncoterm === "" &&
                                errorLogin === "erroStep1"
                                  ? "inputSale-error"
                                  : "inputSale"
                              } selectSale`}
                              type="text"
                              style={{ color: "#94a3b8" }}
                              value={costIncoterm}
                              onChange={(item) =>
                                setCostIncoterm(item.target.value)
                              }
                            >
                              <option value="" disabled selected>
                                Inconterm...
                              </option>
                              <option value={"EXW - Ex Works"}>
                                EXW - Ex Works
                              </option>
                              <option value={"FCA - Free Carrier"}>
                                FCA - Free Carrier
                              </option>
                              <option value={"FAS - Free Alongside Ship"}>
                                FAS - Free Alongside Ship
                              </option>
                              <option value={"FOB - Free on Board"}>
                                FOB - Free on Board
                              </option>
                              <option value={"CFR - Cost and Freight"}>
                                CFR - Cost and Freight
                              </option>
                              <option
                                value={"CIF - Cost, Insurance and Freight"}
                              >
                                CIF - Cost, Insurance and Freight
                              </option>
                              <option value={"CPT - Carriage Paid To"}>
                                CPT - Carriage Paid To
                              </option>
                              <option
                                value={"CIP - Carriage and Insurance Paid To"}
                              >
                                CIP - Carriage and Insurance Paid To
                              </option>
                              <option
                                value={"DPU - Delivered at Place Unloaded"}
                              >
                                DPU - Delivered at Place Unloaded
                              </option>
                              <option value={"DAP - Delivered At Place"}>
                                DAP - Delivered At Place
                              </option>
                              <option value={"DDP - Delivered Duty Paid"}>
                                DDP - Delivered Duty Paid
                              </option>
                            </SelectDefault>
                            <ImgOpt
                              className="iconInputHide"
                              src={IncotermIcon}
                            />
                          </GroupInput>
                          <GroupInput className="groupInputSale">
                            <NumericFormat
                              className={`${
                                errorLogin === "erroStep1" && costOrigin === ""
                                  ? "inputSale-error"
                                  : "inputSale"
                              }`}
                              placeholder="Origin Freight > Port (USD)"
                              type="text"
                              value={costOrigin}
                              onChange={(item) =>
                                setCostOrigin(item.target.value)
                              }
                              thousandSeparator={true}
                              decimalSeparator={"."}
                              decimalScale={2}
                              prefix="US$ "
                              fixedDecimalScale={true}
                            />
                            <ImgOpt className="iconInputHide" src={Cost1Icon} />
                          </GroupInput>
                          <GroupInput className="groupInputSale">
                            <NumericFormat
                              className={`${
                                errorLogin === "erroStep1" &&
                                costMaritime === ""
                                  ? "inputSale-error"
                                  : "inputSale"
                              }`}
                              placeholder="Maritime Freight (USD)"
                              type="text"
                              value={costMaritime}
                              onChange={(item) =>
                                setCostMaritime(item.target.value)
                              }
                              thousandSeparator={true}
                              decimalSeparator={"."}
                              decimalScale={2}
                              prefix="US$ "
                              fixedDecimalScale={true}
                            />
                            <ImgOpt className="iconInputHide" src={Cost2Icon} />
                          </GroupInput>
                          <GroupInput className="groupInputSale">
                            <NumericFormat
                              className={`${
                                errorLogin === "erroStep1" && costPort === ""
                                  ? "inputSale-error"
                                  : "inputSale"
                              }`}
                              placeholder="Port Storage (USD)"
                              type="text"
                              value={costPort}
                              onChange={(item) =>
                                setCostPort(item.target.value)
                              }
                              thousandSeparator={true}
                              decimalSeparator={"."}
                              decimalScale={2}
                              prefix="US$ "
                              fixedDecimalScale={true}
                            />
                            <ImgOpt className="iconInputHide" src={Cost3Icon} />
                          </GroupInput>
                          <GroupInput className="groupInputSale">
                            <NumericFormat
                              className={`${
                                errorLogin === "erroStep1" && costTrasp === ""
                                  ? "inputSale-error"
                                  : "inputSale"
                              }`}
                              placeholder="Transp. > Destination (USD)"
                              type="text"
                              value={costTrasp}
                              onChange={(item) =>
                                setCostTrasp(item.target.value)
                              }
                              thousandSeparator={true}
                              decimalSeparator={"."}
                              decimalScale={2}
                              prefix="US$ "
                              fixedDecimalScale={true}
                            />
                            <ImgOpt className="iconInputHide" src={Cost1Icon} />
                          </GroupInput>
                          <GroupInput className="groupInputSale">
                            <NumericFormat
                              className={`${
                                errorLogin === "erroStep1" && costBroker === ""
                                  ? "inputSale-error"
                                  : "inputSale"
                              }`}
                              placeholder="Broker (USD)"
                              type="text"
                              value={costBroker}
                              onChange={(item) =>
                                setCostBroker(item.target.value)
                              }
                              thousandSeparator={true}
                              decimalSeparator={"."}
                              decimalScale={2}
                              prefix="US$ "
                              fixedDecimalScale={true}
                            />
                            <ImgOpt className="iconInputHide" src={Cost5Icon} />
                          </GroupInput>
                          <GroupInput className="groupInputSale">
                            <NumericFormat
                              className={`${
                                errorLogin === "erroStep1" && costImport === ""
                                  ? "inputSale-error"
                                  : "inputSale"
                              }`}
                              placeholder="Import Services (USD)"
                              type="text"
                              value={costImport}
                              onChange={(item) =>
                                setCostImport(item.target.value)
                              }
                              thousandSeparator={true}
                              decimalSeparator={"."}
                              decimalScale={2}
                              prefix="US$ "
                              fixedDecimalScale={true}
                            />
                            <ImgOpt className="iconInputHide" src={Cost6Icon} />
                          </GroupInput>
                        </InputsContainer>

                        <TextDefault
                          style={{ marginTop: 50 }}
                          size={"20px"}
                          color={"#4b4b4b"}
                        >
                          Location
                        </TextDefault>
                        <br />
                        <TextDefault
                          color={"#8a97aa"}
                          size={"13px"}
                          bold={"400"}
                          style={{ marginTop: 10, width: "75%" }}
                        >
                          Define the countries of origin and destination to
                          proceed with the simulation.
                        </TextDefault>

                        <InputsContainer>
                          <GroupInput className="groupInputSale">
                            <SelectDefault
                              className={`${
                                countryFrom === "" && errorLogin === "erroStep1"
                                  ? "inputSale-error"
                                  : "inputSale"
                              } selectSale`}
                              placeholder="From"
                              type="text"
                              defaultValue={countryFrom}
                              value={countryFrom}
                              onChange={(item) =>
                                setCountryFrom(item.target.value)
                              }
                            >
                              <option value="" disabled selected>
                                From
                              </option>
                              {Country.map((obj) => (
                                <option value={obj.country}>
                                  {obj.country}
                                </option>
                              ))}
                            </SelectDefault>
                            <ImgOpt
                              className="iconInputHide"
                              src={countryFrom ? getFlag(countryFrom) : Ping}
                            />
                          </GroupInput>
                          <GroupInput className="groupInputSale">
                            <SelectDefault
                              className={`${
                                countryTo === "" && errorLogin === "erroStep1"
                                  ? "inputSale-error"
                                  : "inputSale"
                              } selectSale`}
                              placeholder="Destination/To"
                              type="text"
                              value={countryTo}
                              defaultValue={countryTo}
                              onChange={(item) =>
                                setCountryTo(item.target.value)
                              }
                            >
                              <option value="" disabled selected>
                                Destination/To
                              </option>
                              {Country.map((obj) => (
                                <option value={obj.country}>
                                  {obj.country}
                                </option>
                              ))}
                            </SelectDefault>
                            <ImgOpt
                              className="iconInputHide"
                              src={countryTo ? getFlag(countryTo) : Ping}
                            />
                          </GroupInput>
                        </InputsContainer>
                      </CustomTabPanel>
                    </ColumnContainer>
                  </Grid>
                </Grid>
                <ContainerBtnNextSolutions>
                  <BtnNextSolutions
                    className={"btnNextBlue"}
                    onClick={() => validForm()}
                  >
                    <TextDefault size={"18px"} color={"#fff"}>
                      Next
                    </TextDefault>
                    <ArrowForwardIcon
                      style={{ marginLeft: 20 }}
                      sx={{ fontSize: "1.2rem", verticalAlign: "middle" }}
                    />
                  </BtnNextSolutions>
                </ContainerBtnNextSolutions>
                <div style={{ height: 100, width: "100%" }} />
              </>
            ) : step === 3 ? (
              <Grid
                item
                xs={toggleDrawer ? 10 : 11}
                container
                className={animatedStep}
              >
                <Grid item xs={12}>
                  <ColumnContainer style={{ marginLeft: 20, marginTop: 50 }}>
                    <RowContainer
                      style={{
                        width: 55,
                        position: "fixed",
                        left: "5%",
                        top: 40,
                      }}
                    >
                      <button
                        class="cursor-pointer duration-200 hover:scale-125 active:scale-100"
                        title="Go Back"
                        style={{
                          backgroundColor: "transparent",
                          borderWidth: 0,
                          width: "100%",
                          justifyContent: "flex-start",
                          display: "flex",
                        }}
                        onClick={() => moveStepAnimation("back", step - 1)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="50px"
                          height="50px"
                          viewBox="0 0 24 24"
                          class="stroke-blue-300"
                        >
                          <path
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            stroke-width="1.5"
                            d="M11 6L5 12M5 12L11 18M5 12H19"
                          ></path>
                        </svg>
                      </button>
                    </RowContainer>

                    <TextDefault color={"#4b4b4b"} size={"32px"}>
                      Simulation Dashboard
                    </TextDefault>
                    <TextDefault
                      color={"#8a97aa"}
                      size={"13px"}
                      bold={"400"}
                      style={{ marginTop: 10, width: "75%" }}
                    >
                      The screen will display a simulation dashboard, showing
                      graphs and information about the results obtained from the
                      previously filled form responses. Essential information
                      will be included, such as the total value of the
                      simulation, interest rates, and other relevant data.
                    </TextDefault>
                    {companyData && (
                      <Pdf
                        ref={pdfRef}
                        info={allSpec}
                        company={state?.companySelected}
                      />
                    )}

                    <Tabs
                      value={selectedInfo}
                      onChange={handleSelectInfo}
                      aria-label="Filter by"
                      style={{
                        marginTop: 24,
                        width: "98%",
                        borderBottom: "1px solid #d9d9d9",
                      }}
                    >
                      {hsCodeSel.map((hs, index) => (
                        <Tab label={`${hs.hsCode}`} {...allyProps(index)} />
                      ))}
                      <Tab label={"Total"} {...allyProps(hsCodeSel.length)} />
                    </Tabs>

                    {hsCodeSel.map((hs, index) => (
                      <CustomTabPanel
                        value={selectedInfo}
                        index={index}
                        key={hs.hsCode}
                      >
                        <Container>
                          <InfoCard>
                            <h2>General Info</h2>

                            <Content style={{ borderLeft: 0 }}>
                              <div className="Container">
                                <div>
                                  <p>
                                    <span>Country of export</span>
                                    <div>
                                      <span>{allSpec.countryFrom}</span>
                                      <img
                                        src={getFlag(allSpec.countryFrom)}
                                        alt={allSpec.countryFrom}
                                      />
                                    </div>
                                  </p>

                                  <p>
                                    <span>Country of import</span>
                                    <div>
                                      <span>{allSpec.countryTo}</span>
                                      <img
                                        src={getFlag(allSpec.countryTo)}
                                        alt={allSpec.countryTo}
                                      />
                                    </div>
                                  </p>

                                  <p>
                                    <span>Hs Code</span>
                                    {allSpec.hsCodeSel[index].hsCode}
                                  </p>

                                  <p>
                                    <span>Hs Code</span>
                                    {allSpec.hsCodeSel[index].hsCode}
                                  </p>
                                </div>

                                <hr className="midBar" />

                                <div>
                                  <p>
                                    <span>Description</span>{" "}
                                    {Capitalize(description[index])}
                                  </p>

                                  <p>
                                    <span>Total Operation </span>US${" "}
                                    {FormatNumber(
                                      allSpec.totalOperation[index]
                                    )}
                                  </p>

                                  <p>
                                    <span>Shipment Volume </span>
                                    {allSpec.containers.volume}
                                  </p>
                                  <p>
                                    <span>Price/Ton </span>
                                    US${" "}
                                    {
                                      allSpec.shipPrice[index].match(
                                        /\d+(\.\d+)?/
                                      )[0]
                                    }
                                  </p>
                                </div>
                              </div>
                            </Content>
                          </InfoCard>

                          <InfoCard>
                            <h2>Costs</h2>
                            <Content>
                              <div className="Container">
                                <div>
                                  <p>
                                    <span>Incoterm</span>
                                    {allSpec.costIncoterm}
                                  </p>
                                  <p>
                                    <span>Total Taxes</span>
                                    {TaxesSum(
                                      allSpec.taxesNational,
                                      allSpec.taxesInternational
                                    )}
                                  </p>
                                  <p>
                                    <span>Cost Calculation</span> US$
                                    {FormatNumber(allSpec.CostSum)}
                                  </p>
                                  <p>
                                    <span>Net Price</span>
                                    {allSpec.totalNetPrice[index]}
                                  </p>
                                </div>

                                <hr className="midBar" />

                                <div>
                                  <p>
                                    <span>LME Percentage</span>{" "}
                                    {
                                      allSpec.netLme[index].match(
                                        /\d+(\.\d+)?/
                                      )[0]
                                    }{" "}
                                    %
                                  </p>
                                  <p>
                                    <span>Exchange Rate Variation</span>
                                    {
                                      allSpec.netExchange[index].match(
                                        /\d+(\.\d+)?/
                                      )[0]
                                    }{" "}
                                    %
                                  </p>
                                  <p>
                                    <span>Award</span> US${" "}
                                    {
                                      allSpec.netAward[index].match(
                                        /\d+(\.\d+)?/
                                      )[0]
                                    }
                                  </p>
                                </div>
                              </div>
                            </Content>
                          </InfoCard>

                          <InfoCard>
                            <h2>Taxes</h2>
                            <Content>
                              <div className="Container">
                                <div>
                                  <p style={{ border: "none" }}>
                                    <span>National</span>
                                    {allSpec.taxesNational}
                                  </p>
                                </div>

                                <hr
                                  className="midBar"
                                  style={{ height: "80%" }}
                                />
                                <div>
                                  <p style={{ border: "none" }}>
                                    <span>International</span>
                                    {allSpec.taxesInternational}
                                  </p>
                                </div>
                              </div>
                            </Content>
                          </InfoCard>

                          <CostsContainer>
                            <h2>Cost Calculation</h2>
                            <Content>
                              <div className="Container">
                                <div>
                                  <p>
                                    <span>Origin Freight</span>
                                    {allSpec.costOrigin}
                                  </p>
                                  <p>
                                    <span>Maritime Freight</span>
                                    {allSpec.costMaritime}
                                  </p>
                                  <p>
                                    <span>Broker</span>
                                    {allSpec.costBroker}
                                  </p>
                                  <p>
                                    <span>Import Services</span>
                                    {allSpec.costImport}
                                  </p>

                                  <p>
                                    <span>Port Storage</span>
                                    {allSpec.costPort}
                                  </p>

                                  <p>
                                    <span>Transp. Destination</span>
                                    {allSpec.costTrasp}
                                  </p>
                                </div>

                                <hr className="midBar" />

                                <div>
                                  <p>
                                    <span>Subtotal</span> US${" "}
                                    {parseFloat(allSpec.totalOperation).toFixed(
                                      2
                                    )}
                                  </p>
                                  <p>
                                    <span>Discount</span> US$ 0.00
                                  </p>
                                  <p>
                                    <span>Taxes</span>
                                    {TaxesSum(
                                      allSpec.taxesNational,
                                      allSpec.taxesInternational
                                    )}
                                  </p>
                                  <p
                                    style={{
                                      borderTop: "1px solid #d1d1d1",
                                      paddingTop: 24,
                                      alignSelf: "flex-end",
                                      justifySelf: "flex-end",
                                    }}
                                  >
                                    <h1>Total</h1>
                                    <h1>
                                      US${" "}
                                      {parseFloat(
                                        allSpec.totalOperation
                                      ).toFixed(2)}
                                    </h1>
                                  </p>
                                </div>
                              </div>
                            </Content>
                          </CostsContainer>
                        </Container>
                      </CustomTabPanel>
                    ))}

                    <CustomTabPanel
                      value={selectedInfo}
                      index={hsCodeSel.length}
                      key={"Total"}
                    >
                      <Container>
                        <InfoCard>
                          <h2>General Info</h2>

                          <Content style={{ borderLeft: 0 }}>
                            <div className="Container">
                              <div>
                                <p>
                                  <span>Country of export</span>
                                  <div>
                                    <span>{allSpec.countryFrom}</span>
                                    <img
                                      src={getFlag(allSpec.countryFrom)}
                                      alt={allSpec.countryFrom}
                                    />
                                  </div>
                                </p>

                                <p>
                                  <span>Country of import</span>
                                  <div>
                                    <span>{allSpec.countryTo}</span>
                                    <img
                                      src={getFlag(allSpec.countryTo)}
                                      alt={allSpec.countryTo}
                                    />
                                  </div>
                                </p>

                                <p>
                                  <span>Hs Code</span>
                                  {allSpec.hsCodeSel.map((hs, index) =>
                                    hsCodeSel.length - 1 === index
                                      ? `${hs.hsCode}`
                                      : `${hs.hsCode}, `
                                  )}
                                </p>

                                <p>
                                  <span>Hs Code</span>
                                  {allSpec.hsCodeSel.map((hs, index) =>
                                    hsCodeSel.length - 1 === index
                                      ? `${hs.hsCode}`
                                      : `${hs.hsCode}, `
                                  )}
                                </p>
                              </div>

                              <hr className="midBar" />

                              <div>
                                <p>
                                  <span>Description</span>{" "}
                                  {description.map((desc, index) =>
                                    description.length - 1 === index
                                      ? `${desc}`
                                      : `${desc}, `
                                  )}
                                </p>

                                <p>
                                  <span>Total Operation </span>US${" "}
                                  {FormatNumber(
                                    allSpec.totalOperation.reduce(
                                      (acc, current) => acc + current,
                                      0
                                    )
                                  )}
                                </p>

                                <p>
                                  <span>Shipment Volume </span>
                                  {allSpec.containers.volume}
                                </p>
                                <p>
                                  <span>Price/Ton </span>
                                  US${" "}
                                  {allSpec.shipPrice.reduce(
                                    (acc, current) =>
                                      acc +
                                      parseFloat(
                                        current.match(/\d+(\.\d+)?/)[0]
                                      ),
                                    0
                                  )}
                                </p>
                              </div>
                            </div>
                          </Content>
                        </InfoCard>

                        <InfoCard>
                          <h2>Costs</h2>
                          <Content>
                            <div className="Container">
                              <div>
                                <p>
                                  <span>Incoterm</span>
                                  {allSpec.costIncoterm}
                                </p>
                                <p>
                                  <span>Total Taxes</span>
                                  {TaxesSum(
                                    allSpec.taxesNational,
                                    allSpec.taxesInternational
                                  )}
                                </p>
                                <p>
                                  <span>Cost Calculation</span> US$
                                  {FormatNumber(allSpec.CostSum)}
                                </p>
                                <p>
                                  <span>Net Price</span>
                                  US${" "}
                                  {allSpec.totalNetPrice.reduce(
                                    (acc, current) =>
                                      acc +
                                      parseFloat(
                                        current.match(/\d+(\.\d+)?/)[0]
                                      ),
                                    0
                                  )}
                                </p>
                              </div>

                              <hr className="midBar" />

                              <div>
                                <p>
                                  <span>LME Percentage</span>{" "}
                                  {allSpec.netLme.reduce(
                                    (acc, current) =>
                                      acc +
                                      parseFloat(
                                        current.match(/\d+(\.\d+)?/)[0]
                                      ),
                                    0
                                  )}{" "}
                                  %
                                </p>
                                <p>
                                  <span>Exchange Rate Variation</span>
                                  {allSpec.netExchange.reduce(
                                    (acc, current) =>
                                      acc +
                                      parseFloat(
                                        current.match(/\d+(\.\d+)?/)[0]
                                      ),
                                    0
                                  )}{" "}
                                  %
                                </p>
                                <p>
                                  <span>Award</span> US${" "}
                                  {allSpec.netAward.reduce(
                                    (acc, current) =>
                                      acc +
                                      parseFloat(
                                        current.match(/\d+(\.\d+)?/)[0]
                                      ),
                                    0
                                  )}
                                </p>
                              </div>
                            </div>
                          </Content>
                        </InfoCard>

                        <InfoCard>
                          <h2>Taxes</h2>
                          <Content>
                            <div className="Container">
                              <div>
                                <p style={{ border: "none" }}>
                                  <span>National</span>
                                  {allSpec.taxesNational}
                                </p>
                              </div>

                              <hr
                                className="midBar"
                                style={{ height: "80%" }}
                              />
                              <div>
                                <p style={{ border: "none" }}>
                                  <span>International</span>
                                  {allSpec.taxesInternational}
                                </p>
                              </div>
                            </div>
                          </Content>
                        </InfoCard>

                        <CostsContainer>
                          <h2>Cost Calculation</h2>
                          <Content>
                            <div className="Container">
                              <div>
                                <p>
                                  <span>Origin Freight</span>
                                  {allSpec.costOrigin}
                                </p>
                                <p>
                                  <span>Maritime Freight</span>
                                  {allSpec.costMaritime}
                                </p>
                                <p>
                                  <span>Broker</span>
                                  {allSpec.costBroker}
                                </p>
                                <p>
                                  <span>Import Services</span>
                                  {allSpec.costImport}
                                </p>

                                <p>
                                  <span>Port Storage</span>
                                  {allSpec.costPort}
                                </p>

                                <p>
                                  <span>Transp. Destination</span>
                                  {allSpec.costTrasp}
                                </p>
                              </div>

                              <hr className="midBar" />

                              <div>
                                <p>
                                  <span>Subtotal</span> US${" "}
                                  {parseFloat(allSpec.totalOperation).toFixed(
                                    2
                                  )}
                                </p>
                                <p>
                                  <span>Discount</span> US$ 0.00
                                </p>
                                <p>
                                  <span>Taxes</span>
                                  {TaxesSum(
                                    allSpec.taxesNational,
                                    allSpec.taxesInternational
                                  )}
                                </p>
                                <p
                                  style={{
                                    borderTop: "1px solid #d1d1d1",
                                    paddingTop: 24,
                                    alignSelf: "flex-end",
                                    justifySelf: "flex-end",
                                  }}
                                >
                                  <h1>Total</h1>
                                  <h1>
                                    US${" "}
                                    {parseFloat(allSpec.totalOperation).toFixed(
                                      2
                                    )}
                                  </h1>
                                </p>
                              </div>
                            </div>
                          </Content>
                        </CostsContainer>
                      </Container>
                    </CustomTabPanel>
                  </ColumnContainer>
                </Grid>
              </Grid>
            ) : (
              ""
            )}
          </Grid>

          {step === 3 && (
            <SpeedDial
              ariaLabel="Actions"
              sx={{ position: "fixed", bottom: 24, right: 24 }}
              icon={<SpeedDialIcon />}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                  onClick={action.functionality}
                />
              ))}
            </SpeedDial>
          )}
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
