import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import { authScreen } from "../../contexts/auth";

import Country from "../../components/Flag";

import HsCodeList, { AllHsCodeList } from "../../hooks/HsCodeList";
import filterCompaniesDB from "../../hooks/filterComapniesDB";
import {
  deleteCredit,
  handleLimitCredits,
  historyCredits,
  viewCredit,
} from "../../hooks/credits";
import getUserInfo from "../../hooks/getUsers";

import ProfileCompany from "../../service/ProfileCompany";
import filterCompaniesMore from "../../service/moreCompanies";
import GlobalCompany from "../../service/GlobalCompany";
import { addFavoriteCompanie } from "../../service/FavoriteCompanies";
import axios from "axios";
import { saveAnalytics } from "../../hooks/analytics";
import { saveControlRequests } from "../../hooks/controlRequets";
import { publicIp, publicIpv4, publicIpv6 } from "public-ip";
import CompanyMapperInfo from "../home/utils/mapper";
import {
  getCompanieFavorite,
  removeCompanieFavorite,
} from "../../hooks/findNewPartner";
import SearchCompany from "../../service/searchCompany";
import { getFunctionStatus } from "../../hooks/controlFuncions";
import ShipmentsCompany from "../../service/Shipments";
import ShipmentsCompanyHS from "../../service/shipmentsByHs";

export default function useFNP() {
  const [searchParams] = useSearchParams();

  const [auth, setAuth] = useState(false);
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const [step, setStep] = useState(0);
  const [animatedStep, setAnimatedStep] = useState("staticStep");
  const [countrySel, setCountrySel] = useState(searchParams.get("country"));
  const [hsCodeSel, setHsCodeSel] = useState([]);
  const [products, setProducts] = useState([]);
  const [supplierOrBuyer, setSupplierOrBuyer] = useState(
    searchParams.get("role") || "Supplier"
  );
  const [defaultRange, setDefaultRange] = useState([0, 10000000]);
  const [companies, setCompanies] = useState([]);
  const [maxCompaniesFilter, setMaxCompaniesFilter] = useState("");
  const [hsCodeSeach, setHsCodeSeach] = useState("");
  const [companySelect, setCompanySelect] = useState(false);
  const [selectedTable, setSelectedTable] = useState("hsCode");
  const [selectedInfo, setSelectedInfo] = useState(0);
  const [isRequestFinished, setIsRequestFinished] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [companyName, setCompanyName] = useState(
    searchParams.get("companyName") || ""
  );
  const [allCompaniesDb, setAllCompaniesDb] = useState([]);
  const [companyId] = useState(searchParams.get("companyId"));
  const [general, setGeneral] = useState();
  const [generalData, setGeneralData] = useState();
  const [userIP, setUserIP] = useState("");
  const [fromDate, setFromDate] = useState(
    new Date().setFullYear(new Date().getFullYear() - 1)
  );
  const [toDate, setToDate] = useState(Date.now());
  const [switchValue, setSwitchValue] = useState("api");
  const [searchFor, setSearchFor] = useState("company");
  const [shipments, setShipments] = useState([]);
  const [isShipmentsLoading, setIsShipmentsLoading] = useState(true);
  const [countryTrade, setCountryTrade] = useState([]);
  const [allHsCodes, setAllHsCodes] = useState([]);

  useEffect(() => {
    (async () => {
      async function fetchFunctionStatus() {
        try {
          const snapshot = await getFunctionStatus();

          if (window.location.hostname !== "localhost") {
            setSwitchValue(snapshot.val().ativo);
          } else {
            setSwitchValue(snapshot.val().test);
          }
        } catch (error) {
          console.error("Erro ao buscar status da função:", error);
        }
      }
      fetchFunctionStatus();
      setUserIP(await publicIpv4());
    })();
  }, []);

  const navigate = useNavigate();
  let range = [0, null];

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const pdfRef = useRef(null);
  const pdfProfileRef = useRef(null);

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

  const [userCredit, setUserCredit] = useState(null);
  const custCredit = 10;

  useEffect(() => {
    if (userInfo) {
      const fetchCredits = async () => {
        try {
          const userCredits = await viewCredit(userInfo?.uid);
          setUserCredit(userCredits);
        } catch (error) {
          console.error("Erro ao buscar os créditos do usuário:", error);
        }
      };

      fetchCredits();
    }
  }, [userInfo]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMoreVisible, setModalMoreVisible] = useState(false);

  const fetchFavoritedCompanies = async () => {
    setLoading(true);
    try {
      const dataUnmapped = await getCompanieFavorite(userInfo.uid);
      const mappedData = CompanyMapperInfo(dataUnmapped);

      setCompanies(mappedData);
      moveStepAnimation("next", 4);
      setIsRequestFinished(true);
    } catch (error) {
      console.error("Erro ao buscar informações do usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFavoritedCompany = async (id) => {
    try {
      await removeCompanieFavorite(userInfo.uid, id);

      setCompanies((prevState) =>
        prevState.filter((company) => company.id !== id)
      );
    } catch (err) {
      console.error("Error on delete:", err);
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setStep(1);
    setModalVisible(false);
  };

  const handleOpenModalMore = () => {
    setModalMoreVisible(true);
  };

  const handleCloseModalMore = () => {
    setModalMoreVisible(false);
  };

  const handleConfirmAction = () => {
    navigate(`/credits`);
  };

  const searchHsCode = useMemo(() => {
    const typeHsCode = isNaN(hsCodeSeach);

    if (typeHsCode) {
      return products.filter((item) =>
        item.hsName.toLowerCase().includes(hsCodeSeach.toLowerCase())
      );
    }

    return products.filter((item) => item.hsCode.includes(hsCodeSeach));
  }, [products, hsCodeSeach]);

  useEffect(() => {
    authScreen().then((res) => {
      if (res) {
        setTimeout(() => {
          setAuth(true);
        }, 1000);
        requestAllHsCodes();
        requestHsList();
      } else {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    });
  }, []);

  const requestHsList = () => {
    if (products.length === 0) {
      HsCodeList()
        .then((data) => {
          const sortedProduts = data.map((prod) => ({
            ...prod,
            hsCode: Number(prod.hsCode.replace(/\./g, "")),
          }));

          const fixedProducts = sortedProduts
            .map((prod) => ({
              ...prod,
              hsCode: prod.hsCode.toString(),
            }))
            .sort((a, b) => a.hsCode.slice(0, 2) - b.hsCode.slice(0, 2));

          setProducts(fixedProducts);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const requestAllHsCodes = useCallback(() => {
    if (allHsCodes.length === 0) {
      AllHsCodeList()
        .then((data) => {
          const sortedProduts = data
            .map((prod) => ({
              ...prod,
              hsCode: Number(prod.hsCode.replace(/\./g, "")),
            }))
            .sort((a, b) => a.hsCode - b.hsCode);

          const fixedProducts = sortedProduts.map((prod) => ({
            ...prod,
            hsCode: prod.hsCode.toString(),
          }));

          setAllHsCodes(fixedProducts);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [allHsCodes]);

  function SetToggle(state) {
    useTroggleDawer(state);
  }

  const moveStepAnimation = (animation, step) => {
    //animation next = Direita para Esquerda
    //animation back = Esqueda pra direita
    //step = condicional da tela de exibição
    scrollTop();

    if (animation === "next") {
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

  const formattedDate = new Date().toISOString();

  const infoC = {
    text: `Credits used with research on Trade Data`,
    type: "decrease",
    date: formattedDate,
    credits: 5,
  };

  async function fetchCompaniesByName() {
    setCompanies([]);
    setIsRequestFinished(false);

    const infoRequest = {
      action: "Requested",
      date: formattedDate,
      api: "CompanyName API",
      keywords: `${countrySel} - ${companyName}`,
      user: userInfo?.userData?.name,
    };

    try {
      await SearchCompany(companyName)
        .then((res) => {
          setCompanies(res.data.companies);
        })
        .catch(async (err) => {
          console.log("Error to fetch:", err);
          saveControlRequests(infoRequest);

          await axios
            .post(
              "https://apit-api/v1/company-matcher",
              JSON.stringify({
                companyName: companyName,
                country: countrySel,
                user: userInfo?.userData?.name,
                userId: userInfo?.uid,
              }),
              {
                headers: {
                  Authorization: "Bearer " + "TOKENTAPI.key",
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
              }
            )
            .then((res) => {
              saveControlRequests(infoRequest);
              setCompanies(res.data.companies);
            })
            .catch((err) => console.log("Error company by name:", err));
        })
        .finally(() => setIsRequestFinished(true));
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setIsRequestFinished(true);
    }
  }

  async function fetchCompaniesByNameDB() {
    setCompanies([]);
    setIsRequestFinished(false);

    try {
      await SearchCompany(companyId)
        .then((res) => {
          setCompanies(res);
        })
        .catch((e) => {
          console.log("Error to call DB:", e);
        })
        .finally(() => setIsRequestFinished(true));
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setIsRequestFinished(true);
    }
  }

  const requestCompanies = async () => {
    const userCredits = await viewCredit(userInfo?.uid);

    if (userCredits < custCredit) {
      handleOpenModal();
    } else {
      if (await handleLimitCredits(userInfo?.uid)) {
        window.alert("Sorry you reached your limits of credits");
        return "Limit reached";
      }
      setIsRequestFinished(false);
      const hs = arrayHS();
      const countryTrader = countryTradeArray();
      console.log({ countryTrader });

      let companiesDB = [];
      const rangeInit = defaultRange[0];
      const rangeEnd = defaultRange[1];
      const infoA = {
        action: `Search`,
        date: formattedDate,
        page: "Find new partner",
        keywords: `${countrySel} - ${hs} - ${supplierOrBuyer}`,
        name: userInfo?.userData?.name,
      };

      if (countryTrader.length === 0) {
        await filterCompaniesDB(
          countrySel.toLocaleLowerCase(),
          hs,
          10,
          rangeInit,
          rangeEnd,
          supplierOrBuyer
        ).then(async (res) => {
          //Verifica se houve resultado no banco de dados e armazena na variavel
          if (res.length > 0) {
            res.forEach((item) => {
              companiesDB.push(item.companyId);
            });
          }
          //Verifica se o número de empresa encontrado no banco de dados é suficiente para solicitação
          if (res.length >= 10) {
            deleteCredit(userInfo?.uid, 10);
            historyCredits(infoC, userInfo?.uid);
            saveAnalytics(userInfo?.uid, infoA);
            setCompanies(res);
            setIsRequestFinished(true);
            moveStepAnimation("next", 4);
            return res;
          } else {
            const resultCompanies = 10 - res.length;

            GlobalCompany(
              [countrySel.toLocaleLowerCase()],
              hs,
              10,
              rangeInit,
              rangeEnd,
              supplierOrBuyer,
              userInfo?.userData?.name,
              userInfo?.uid,
              userIP,
              fromDate,
              toDate,
              countryTrader
            )
              .then((response) => {
                if (res.length > 0) {
                  //Verifica se a reposta do banco de dados é maior que zero para solicitação parcial
                  const newResponse = responseMesclar(
                    response.companies,
                    resultCompanies,
                    countrySel.toLocaleLowerCase()
                  );

                  setGeneralData(response);
                  const finalValue = res.length + newResponse.length;
                  deleteCredit(userInfo?.uid, finalValue);
                  saveAnalytics(userInfo?.uid, infoA);
                  historyCredits(
                    {
                      text: `Credits used with research on Trade Data`,
                      type: "decrease",
                      date: formattedDate,
                      credits: finalValue,
                    },
                    userInfo?.uid
                  );

                  setCompanies([...res, ...newResponse]);
                  setGeneral(response);
                  setIsRequestFinished(true);
                  setMaxCompaniesFilter(response.totalCompanies);
                  moveStepAnimation("next", 4);
                  return response;
                } else {
                  //Realiza consulta completa da API
                  setGeneral(response);
                  setGeneralData(response);
                  setCompanies(response.companies);
                  setMaxCompaniesFilter(response.totalCompanies);
                  deleteCredit(userInfo?.uid, response.companies.length);
                  saveAnalytics(userInfo?.uid, infoA);
                  historyCredits(
                    {
                      text: `Credits used with research on Trade Data`,
                      type: "decrease",
                      date: formattedDate,
                      credits: response.companies.length,
                    },
                    userInfo?.uid
                  );
                  setIsRequestFinished(true);
                  setMaxCompaniesFilter(response.totalCompanies);
                  moveStepAnimation("next", 4);

                  return response;
                }
              })
              .catch((err) => {
                console.error("Erro na requisição: " + err);
                if (err === "empty") {
                  console.log("Resposta Vazia");
                }
              })
              .finally(() => setIsRequestFinished(true));
          }
        });
      } else {
        GlobalCompany(
          [countrySel.toLocaleLowerCase()],
          hs,
          10,
          rangeInit,
          rangeEnd,
          supplierOrBuyer,
          userInfo?.userData?.name,
          userInfo?.uid,
          userIP,
          fromDate,
          toDate,
          countryTrader
        )
          .then((response) => {
            //Realiza consulta completa da API
            setGeneral(response);
            setGeneralData(response);
            setCompanies(response.companies);
            setMaxCompaniesFilter(response.totalCompanies);
            deleteCredit(userInfo?.uid, response.companies.length);
            saveAnalytics(userInfo?.uid, infoA);
            historyCredits(
              {
                text: `Credits used with research on Trade Data`,
                type: "decrease",
                date: formattedDate,
                credits: response.companies.length,
              },
              userInfo?.uid
            );
            setIsRequestFinished(true);
            setMaxCompaniesFilter(response.totalCompanies);
            moveStepAnimation("next", 4);

            return response;
          })
          .catch((err) => {
            console.error("Erro na requisição: " + err);
            if (err === "empty") {
              console.log("Resposta Vazia");
            }
          })
          .finally(() => setIsRequestFinished(true));
      }
    }
  };

  const RequestCompaniesDb = async () => {
    const userCredits = await viewCredit(userInfo?.uid);

    if (userCredits < custCredit) {
      handleOpenModal();
    } else {
      if (await handleLimitCredits(userInfo?.uid)) {
        window.alert("Sorry you reached your limits of credits");
        return "Limit reached";
      }
      setIsRequestFinished(false);
      const hs = arrayHS();
      let companiesDB = [];
      const rangeInit = defaultRange[0];
      const rangeEnd = defaultRange[1];
      const infoA = {
        action: `Search`,
        date: formattedDate,
        page: "Find new partner",
        keywords: `${countrySel} - ${hs} - ${supplierOrBuyer}`,
        name: userInfo?.userData?.name,
      };
      await filterCompaniesDB(
        countrySel.toLocaleLowerCase(),
        hs,
        50,
        rangeInit,
        rangeEnd === "" ? 1000000000000 : rangeEnd,
        supplierOrBuyer
      ).then(async (res) => {
        //Verifica se houve resultado no banco de dados e armazena na variavel

        if (res.length > 0) {
          res.forEach((item) => {
            companiesDB.push(item.companyId);
          });
        }

        const filteredCompanies = Array.isArray(res)
          ? res.filter((_, index) => index <= 9)
          : [];
        deleteCredit(userInfo?.uid, 10);
        historyCredits(infoC, userInfo?.uid);
        saveAnalytics(userInfo?.uid, infoA);
        setAllCompaniesDb(res);
        setCompanies(filteredCompanies);
        setIsRequestFinished(true);
        moveStepAnimation("next", 4);
      });
    }
  };

  const fetchCompanies = async () => {
    const hs = arrayHS();
    const rangeInit = defaultRange[0];
    const rangeEnd = defaultRange[1];
    const countryTrader = countryTradeArray();

    GlobalCompany(
      [countrySel.toLocaleLowerCase()],
      hs,
      5,
      rangeInit,
      rangeEnd,
      supplierOrBuyer,
      userInfo?.userData?.name,
      userInfo?.uid,
      userIP,
      fromDate,
      toDate,
      countryTrader
    ).then((res) => setGeneralData(res));
  };

  const fetchShipments = async () => {
    setIsShipmentsLoading(true);

    ShipmentsCompany(companyName, countrySel, supplierOrBuyer)
      .then((res) => setShipments(res?.shipment))
      .finally(() => setIsShipmentsLoading(false));
  };

  const fetchShipmentsByHs = async () => {
    const hs = arrayHS();
    setIsShipmentsLoading(true);
    const countryTrader = countryTradeArray();

    ShipmentsCompanyHS(hs, countrySel, supplierOrBuyer, countryTrader)
      .then((res) => setShipments(res?.shipment))
      .finally(() => setIsShipmentsLoading(false));
  };

  async function requestMore(moreCompanie, cust) {
    setIsMoreLoading(true);
    const userCredits = await viewCredit(userInfo?.uid);
    setUserCredit(userCredits);

    if (userCredits < 10) {
      handleOpenModalMore();
      setIsMoreLoading(false);
    }
    const rangeInit = configRange(range[0]);
    const rangeEnd = configRange(range[1]);

    const hs = arrayHS();
    const countryTrader = countryTradeArray();
    let listComapniesNow = [];
    let companiesDB = [];

    if (companies) {
      companies.forEach((obj) => {
        listComapniesNow.push(obj.companyId);
      });
    }
    const infoA = {
      action: `More`,
      date: formattedDate,
      page: "Find new partner",
      keywords: `${countrySel} - ${hs} - ${supplierOrBuyer} - ${moreCompanie}`,
      name: userInfo?.userData?.name,
    };
    deleteCredit(userInfo?.uid, 10);
    historyCredits(
      {
        text: `Credits used with more companies on Trade Data`,
        type: "decrease",
        date: formattedDate,
        credits: 10,
      },
      userInfo?.uid
    );
    await filterCompaniesMore(
      hs,
      countrySel.toLocaleLowerCase(),
      moreCompanie,
      rangeInit,
      rangeEnd,
      listComapniesNow,
      supplierOrBuyer
    )
      .then(async (res) => {
        if (res.length > 0) {
          res.forEach((item) => {
            companiesDB.push(item.companyId);
          });
        }
        if (res.length >= moreCompanie) {
          setCompanies([...companies, ...res]);
          const finalValue = companies.length + res.length;
          deleteCredit(finalValue);
          saveAnalytics(userInfo?.uid, infoA);
          historyCredits(
            {
              text: `Credits used with research on Trade Data`,
              type: "decrease",
              date: formattedDate,
              credits: finalValue,
            },
            userInfo.uid
          );
        } else {
          const resultCompanies = moreCompanie - res.length;
          let newExclude = [];

          companiesDB.length > 0
            ? (newExclude = [...listComapniesNow, ...companiesDB])
            : (newExclude = listComapniesNow);

          GlobalCompany(
            [countrySel.toLocaleLowerCase()],
            hs,
            resultCompanies,
            rangeInit,
            rangeEnd,
            supplierOrBuyer,
            userInfo?.userData?.name,
            userInfo?.uid,
            userIP,
            fromDate,
            toDate,
            countryTrader,
            newExclude
          )
            .then((response) => {
              if (res.length > 0) {
                setGeneralData(response);
                const newResponse = responseMesclar(
                  response.companies,
                  resultCompanies,
                  countrySel.toLocaleLowerCase()
                );
                setCompanies([...companies, ...res, ...newResponse]);
                const finalValue =
                  companies.length + res.length + newResponse.length;
                deleteCredit(finalValue);
                historyCredits(
                  {
                    text: `Credits used with research on Trade Data`,
                    type: "decrease",
                    date: formattedDate,
                    credits: finalValue,
                  },
                  userInfo.uid
                );
              } else {
                setCompanies([...companies, ...response.companies]);
                deleteCredit(response.companies.length);
                historyCredits(
                  {
                    text: `Credits used with research on Trade Data`,
                    type: "decrease",
                    date: formattedDate,
                    credits: response.companies.length,
                  },
                  userInfo.uid
                );
              }
            })
            .catch((err) => {
              console.error("Erro na requisição: " + err);
              if (err === "empty") {
                console.log("All companies already showed");
              }
            });
        }
      })
      .catch((err) => {
        console.error("Error na consulta do BD => " + err);
      });

    setTimeout(() => {
      setIsMoreLoading(false);
    }, 1000);
  }

  async function RequestMoreDb(qty) {
    const userCredits = await viewCredit(userInfo?.uid);

    if (userCredits < custCredit) {
      handleOpenModal();
    } else {
      if (await handleLimitCredits(userInfo?.uid)) {
        window.alert("Sorry you reached your limits of credits");
        return "Limit reached";
      }
      setIsRequestFinished(false);
      const hs = arrayHS();
      const infoA = {
        action: `Search`,
        date: formattedDate,
        page: "Find new partner",
        keywords: `${countrySel} - ${hs} - ${supplierOrBuyer}`,
        name: userInfo?.userData?.name,
      };

      deleteCredit(userInfo?.uid, 10);
      historyCredits(infoC, userInfo?.uid);
      saveAnalytics(userInfo?.uid, infoA);
      setCompanies((prevState) =>
        allCompaniesDb.filter((_, index) => index <= prevState.length + qty - 1)
      );
      setIsRequestFinished(true);
      moveStepAnimation("next", 4);
    }
  }

  const configRange = (setRange) => {
    if (setRange === 0) {
      return setRange;
    } else if (setRange === 10000) {
      return null;
    } else {
      return setRange * 1000;
    }
  };

  const arrayHS = () => {
    let array = [];
    hsCodeSel.forEach((item) => {
      array.push(item.hsCode);
    });
    return array;
  };

  const countryTradeArray = () => {
    let array = [];
    countryTrade.forEach((item) => {
      array.push(item.value);
    });
    return array;
  };

  function responseMesclar(array, limite, country) {
    let filtrados = array.filter((obj) => obj.country === country);
    // Limitar o número de objetos no array filtrado
    filtrados = filtrados.slice(0, limite);
    return filtrados;
  }

  const validSeletHsCode = (key) => {
    const indexObject = hsCodeSel.findIndex((obj) => obj.key === key);

    if (indexObject !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const cardSupplierOrBuyer = (item) => {
    setSupplierOrBuyer(item);
  };

  const listHsCodeCompany = (array) => {
    let string;
    array.forEach((obj) => {
      if (string) {
        string = string + `, ${obj}`;
      } else {
        string = obj;
      }
    });

    return string;
  };

  const handleSearchAgain = () => {
    setHsCodeSel([]);
    setCountrySel("");

    setStep(1);
  };

  function scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const dataCompany = async (id, info) => {
    const userCredits = await viewCredit(userInfo?.uid);

    if (userCredits < 5) {
      handleOpenModalMore();
    } else {
      let getData = info.filter((obj) => {
        if (obj?.companyId) {
          return obj.companyId === id;
        }
        return obj.id === id;
      });

      if (await handleLimitCredits(userInfo?.uid)) {
        return window.alert("Sorry you reached your limits of credits");
      }
      deleteCredit(userInfo?.uid, 5);
      historyCredits(
        {
          text: `Credits used with profile on Trade Data`,
          type: "decrease",
          date: formattedDate,
          credits: 5,
        },
        userInfo?.uid
      );
      setStep(5);
      if (temShipments(getData)) {
        setCompanySelect(getData);

        setStep(6);
      } else {
        setCompanySelect(getData);
        await SearchCompany(companyId)
          .then((resp) => {
            setStep(6);
            let array = Object.assign({}, getData[0], resp.profile, {
              shipments: resp.shipment,
            });

            setCompanySelect([array]);
          })
          .catch(async () => {
            ProfileCompany(
              getData[0]?.companyId ? getData[0]?.companyId : getData[0]?.id,
              getData[0]?.companyName,
              getData[0]?.country,
              `${userInfo.userData?.name} ${userInfo.userData?.lastName}`,
              userInfo.uid,
              userIP
            )
              .then((resp) => {
                setStep(6);
                let array = Object.assign({}, getData[0], resp.profile, {
                  shipments: resp.shipment,
                });
                setCompanySelect([array]);
              })
              .catch((err) => {
                console.log(
                  "Erro na requisição profile id: " + getData[0].companyId
                );
                console.log(err);
              });
          });
      }
    }
  };

  const dataCompanyById = async (id, isFavorited) => {
    const userCredits = await viewCredit(userInfo?.uid);

    if (userCredits < 5) {
      handleOpenModalMore();
    } else {
      if (await handleLimitCredits(userInfo?.uid)) {
        return window.alert("Sorry you reached your limits of credits");
      }
      const consumeCredits = isFavorited ? 0 : 5;
      deleteCredit(userInfo?.uid, consumeCredits);
      historyCredits(
        {
          text: "Credits used with profiles on Trade Data",
          type: "decrease",
          date: formattedDate,
          credits: 5,
        },
        userInfo?.uid
      );
      setStep(5);

      setCompanySelect({ companyId: id, companyName, country: countrySel });

      await SearchCompany(companyId).then((resp) => {
        if (
          resp?.exportTradingPartners?.length > 0 ||
          resp?.importTradingPartners?.length > 0
        ) {
          setStep(6);
          let array = {
            companyId: id,
            companyName,
            country: countrySel,
            ...resp,
            shipments: resp.shipments,
          };

          return setCompanySelect([array]);
        }

        ProfileCompany(
          id,
          companyName,
          countrySel,
          `${userInfo.userData?.name} ${userInfo.userData?.lastName}`,
          userInfo.uid,
          userIP
        )
          .then((resp) => {
            setStep(6);
            let array = {
              companyId: id,
              companyName,
              country: countrySel,
              ...resp.profile,
              shipments: resp.shipment,
            };
            setCompanySelect([array]);
          })
          .catch((err) => {
            console.log("Erro na requisição profile id: " + id);
            console.log(err);
          });
      });
    }
  };

  const dataCompanyDb = async (id, info, isFavorited) => {
    const userCredits = await viewCredit(userInfo?.uid);

    if (userCredits < 5) {
      handleOpenModalMore();
    } else {
      let getData = info.filter((obj) => {
        if (obj?.companyId) {
          return obj.companyId === id;
        }
        return obj.id === id;
      });

      if (await handleLimitCredits(userInfo?.uid)) {
        return window.alert("Sorry you reached your limits of credits");
      }

      const consumeCredits = isFavorited ? 0 : 5;
      deleteCredit(userInfo?.uid, consumeCredits);
      historyCredits(
        {
          text: `Credits used with profiles on Trade Data`,
          type: "decrease",
          date: formattedDate,
          credits: 5,
        },
        userInfo?.uid
      );
      setStep(5);

      setCompanySelect(getData);
      await SearchCompany(companyId)
        .then((resp) => {
          setStep(6);
          let array = {
            ...getData[0],
            ...resp,
            shipments: resp?.shipments,
          };

          return setCompanySelect([array]);
        })
        .catch((e) => {
          console.log("Error to request commpanies", e);
        });
    }
  };

  const renderFlag = (countryName) => {
    const filterCountry = Country.filter(
      (obj) => obj.country.toLocaleLowerCase() === countryName
    );
    if (filterCountry.length === 0) {
      const flagDefault = Country.filter(
        (obj) => obj.country.toLocaleLowerCase() === "flag"
      );
      return flagDefault[0].src;
    } else {
      return filterCountry[0].src;
    }
  };

  function temShipments(array) {
    return array.some((objeto) => objeto.hasOwnProperty("shipments"));
  }

  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
  });
  const handlePrintProfile = useReactToPrint({
    content: () => pdfProfileRef.current,
  });

  const saveCompany = () => {
    addFavoriteCompanie(
      companySelect[0].companyId,
      companySelect[0].companyName,
      true,
      companySelect[0].country,
      userInfo.uid
    );
  };

  const handleSelectTable = (newValue) => {
    setSelectedTable(newValue);
  };

  const handleSearchFor = (newValue) => {
    setSearchFor(newValue);
  };

  const handleSelectInfo = (event, newValue) => {
    if (newValue) {
      return setSelectedInfo(newValue);
    }

    setSelectedInfo((prevState) => (prevState === 0 ? 1 : 0));
  };

  function handleCountrySelect(selected) {
    setCountrySel(selected.value);
  }

  function handleCompanyName(event) {
    setCompanyName(event.target.value);
  }

  function reduceShipmentsArray(array) {
    const reduced = array.reduce(
      (acc, actual) => acc + actual.shipmentValue,
      0
    );

    return reduced;
  }

  return {
    auth,
    isRequestFinished,
    toggleDrawer,
    SetToggle,
    step,
    setStep,
    animatedStep,
    selectedTable,
    handleSelectTable,
    countrySel,
    moveStepAnimation,
    searchHsCode,
    hsCodeSel,
    setHsCodeSel,
    userInfo,
    validSeletHsCode,
    supplierOrBuyer,
    cardSupplierOrBuyer,
    defaultRange,
    requestCompanies,
    deleteFavoritedCompany,
    fetchFavoritedCompanies,
    pdfProfileRef,
    companySelect,
    renderFlag,
    handlePrintProfile,
    saveCompany,
    modalVisible,
    handleCloseModal,
    handleConfirmAction,
    listHsCodeCompany,
    handleCountrySelect,
    handlePrint,
    companies,
    requestMore,
    pdfRef,
    dataCompany,
    handleSearchAgain,
    products,
    setCountrySel,
    companyName,
    setDefaultRange,
    handleCompanyName,
    fetchCompaniesByName,
    reduceShipmentsArray,
    isMoreLoading,
    general,
    selectedInfo,
    handleSelectInfo,
    maxCompaniesFilter,
    setCompanyName,
    fetchCompanies,
    generalData,
    userIP,
    setFromDate,
    fromDate,
    setToDate,
    toDate,
    modalMoreVisible,
    handleCloseModalMore,
    RequestCompaniesDb,
    dataCompanyDb,
    fetchCompaniesByNameDB,
    switchValue,
    RequestMoreDb,
    dataCompanyById,
    handleSearchFor,
    searchFor,
    fetchShipments,
    shipments,
    fetchShipmentsByHs,
    isShipmentsLoading,
    setShipments,
    setCountryTrade,
    countryTrade,
    allHsCodes,
  };
}
