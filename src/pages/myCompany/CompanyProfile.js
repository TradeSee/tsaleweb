import React, { useContext, useEffect, useState } from "react";
import LoadingPage from "../../components/LoadingPage";
import { useNavigate } from "react-router-dom";
import { authScreen } from "../../contexts/auth";
import Drawer from "../../components/Drawer";
import { Grid, Modal } from "@mui/material";
import {
  BtnCancelSolutions,
  BtnDefault,
  BtnNextSolutions,
  CardForm,
  ColumnContainer,
  ContainerBtnNext,
  ContainerErroLogin,
  ContainerTable,
  GroupInput,
  ImgDefault,
  ImgOpt,
  InputDefault,
  OptionImg,
  RowContainer,
  SelectDefault,
  TextDefault,
} from "../../assets/styles";
import IconEdit from "../../icons/edit-myicons.png";
import IconCompany from "../../icons/globe-myicons.png";
import IconTag from "../../icons/tag-myicons.png";
import IconAddress from "../../icons/address-myicons.png";
import IconPhone from "../../icons/phone-myicons.png";
import IconMail from "../../icons/mail.png";
import CompanyPic from "../../icons/bannerCompanies.png";
import IconPremium from "../../icons/plusPremium.png";
import IconCheck from "../../icons/check-myicons.png";
import IconCheck2 from "../../icons/checkPremium.png";
import IconMala from "../../icons/mala.png";
import IconName from "../../icons/broker.png";
import IconRole from "../../icons/role.png";
import getCompanyInfo from "../../hooks/getCompanyInfo";
import updateCompanyInfo from "../../hooks/updateCompanyInfo";
import Country from "../../components/Flag";
import Ping from "../../icons/ping.png";
import { ContainerModalCenter } from "../home/styles";
import TableContacts from "./components/TableContacts";
import XIcon from "../../icons/xIcon.png";
import Warning from "../../icons/cancel.png";
import PaperPlane from "../../icons/paper-plane.png";
import BuyerIcon from "../../icons/buyer.png";

import { ThemeContext } from "styled-components";

export default function CompanyProfile() {
  const [auth, setAuth] = useState(false);
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [country, setCountry] = useState("");
  const [activity, setActivity] = useState("");
  const [site, setSite] = useState("");
  const [nameContact, setNameContact] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [roleAtCompany, setRoleAtCompany] = useState("");
  const [product, setProduct] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isLimitModalVisible, setIsLimitModalVisible] = useState(false);
  const [switchAddEdit, setSwitchAddEdit] = useState(true);
  const [keyEdit, setKeyEdit] = useState("");
  const [errorLogin, setErrorLogin] = useState("erroStep0");
  const [errorSave, setErrorSave] = useState("erroStep0");
  const [saveData, setSaveData] = useState("erroStep0");

  const theme = useContext(ThemeContext);

  const handleClick = () => {
    setErrorLogin("erroStep1");
    setTimeout(() => {
      setErrorLogin("erroStep2");
    }, 5000);
  };
  const handleClickSave = () => {
    setSaveData("erroStep1");
    setTimeout(() => {
      setSaveData("erroStep2");
    }, 5000);
  };
  const handleClickNotSave = () => {
    setSaveData("erroStep1");
    setTimeout(() => {
      setSaveData("erroStep2");
    }, 5000);
  };

  const closeModal = () => {
    setIsLimitModalVisible(false);
  };

  const navigate = useNavigate();

  const openNewTab = (path) => {
    window.open(path, "_blank");
  };

  const getFlag = (set) => {
    let filter = Country.filter((item) => {
      return item.country.toLowerCase() === set.toLowerCase();
    });

    return filter[0].src;
  };

  useEffect(() => {
    authScreen().then((res) => {
      if (res) {
        setTimeout(() => {
          setAuth(true);
        }, 1000);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    });
  });

  useEffect(() => {
    authScreen().then((res) => {
      setTimeout(() => {
        getCompanyInfo()
          .then((resp) => {
            setCompanyName(resp.coporateName || "");
            setAddress(resp.address || "");
            setIdentificationNumber(resp.idNumber || "");
            setCountry(resp.companyN || "");
            setActivity(resp.activity || "");
            setSite(resp.site || "");
            setTableData(resp.contacts ? resp.contacts : [] || "");
            setProduct(resp.product || "");
          })
          .catch((e) => {
            console.log("ERROR: ");
            console.log(e);
          });
      });
    });
  }, []);

  function SetToggle(state) {
    useTroggleDawer(state);
  }

  const updateInfo = () => {
    let Company = {
      coporateName: companyName,
      address: address,
      idNumber: identificationNumber,
      companyN: country,
      activity: activity,
      site: site,
      contacts: tableData,
      product: product,
    };

    updateCompanyInfo(Company)
      .then((resp) => {
        console.log("OK");
        console.log(resp);
        handleClickSave();
      })
      .catch((err) => {
        console.log("Error");
        console.log(err);
        handleClickNotSave();
      });
  };

  function handleChange(event) {
    const inputValue = event.replace("+", "");
    const newValue = "+" + inputValue;
    // Faça o que for necessário com o novo valor
    return newValue;
  }

  const insertTable = () => {
    if (nameContact && businessEmail && businessPhone && roleAtCompany) {
      setTableData([
        ...tableData,
        {
          nameContact,
          businessEmail,
          businessPhone,
          roleAtCompany,
          key: generateUniqueId(nameContact, businessEmail),
        },
      ]);

      setNameContact("");
      setBusinessEmail("");
      setBusinessPhone("");
      setRoleAtCompany("");
      setIsLimitModalVisible(false);

      return;
    }

    handleClick();
    console.log("Preencha tudo corretamente");
  };

  function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash;
  }

  function generateUniqueId(str1, str2) {
    const timestamp = new Date().getTime();
    const random = Math.random();
    const combinedString = str1 + str2;
    const hash = hashCode(combinedString);
    const uniqueId = `${timestamp}_${random}_${hash}`;
    return uniqueId;
  }

  const deleteRow = (key) => {
    setTableData(
      tableData.filter((item) => {
        return item.key != key;
      })
    );
  };

  const updateRow = (key) => {
    const setRow = tableData.filter((item) => {
      return item.key == key;
    });

    setNameContact(setRow[0].nameContact);
    setBusinessEmail(setRow[0].businessEmail);
    setBusinessPhone(setRow[0].businessPhone);
    setRoleAtCompany(setRow[0].roleAtCompany);
    setSwitchAddEdit(false);
    setKeyEdit(key);
    setIsLimitModalVisible(true);
  };

  const saveEdit = () => {
    if (nameContact && businessEmail && businessPhone && roleAtCompany) {
      setTableData([
        ...tableData.filter((item) => {
          return item.key != keyEdit;
        }),
        {
          nameContact,
          businessEmail,
          businessPhone,
          roleAtCompany,
          key: generateUniqueId(nameContact, businessEmail),
        },
      ]);

      setNameContact("");
      setBusinessEmail("");
      setBusinessPhone("");
      setRoleAtCompany("");

      setKeyEdit("");
      setSwitchAddEdit(true);
      setIsLimitModalVisible(false);
      return;
    }
    handleClick();
  };

  const cancelEdit = () => {
    setNameContact("");
    setBusinessEmail("");
    setBusinessPhone("");
    setRoleAtCompany("");

    setKeyEdit("");
    setSwitchAddEdit(true);
    setIsLimitModalVisible(false);
  };

  return (
    <>
      {auth ? (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={toggleDrawer ? 2 : 1}>
            <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
          </Grid>

          <ContainerErroLogin className={errorSave}>
            <div class="cardErroLogin">
              <img class="imgErroLogin" src={Warning} />
              <div class="textBoxErroLogin">
                <div class="textContentErroLogin">
                  <p class="h1ErroLogin">Oops... unable to save</p>
                  <span class="spanErroLogin"></span>
                </div>
                <p class="pErroLogin">
                  There was an unexpected error, please try again later!
                </p>
                <div></div>
              </div>
            </div>
          </ContainerErroLogin>

          <ContainerErroLogin className={saveData}>
            <div class="cardErroLogin">
              <img class="imgErroLogin" src={PaperPlane} />
              <div class="textBoxErroLogin">
                <div class="textContentErroLogin">
                  <p class="h1ErroLogin">Registration Saved</p>
                  <span class="spanErroLogin"></span>
                </div>
                <p class="pErroLogin">Your data has been saved successfully!</p>
                <div></div>
              </div>
            </div>
          </ContainerErroLogin>

          <ContainerErroLogin className={errorLogin}>
            <div class="cardErroLogin">
              <img class="imgErroLogin" src={Warning} />
              <div class="textBoxErroLogin">
                <div class="textContentErroLogin">
                  <p class="h1ErroLogin">Contact not saved</p>
                  <span class="spanErroLogin"></span>
                </div>
                <p class="pErroLogin">Complete all the fields correctly</p>
                <div></div>
              </div>
            </div>
          </ContainerErroLogin>

          <Modal
            open={isLimitModalVisible}
            onClose={() => closeModal()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <ContainerModalCenter>
              <ColumnContainer style={{ marginLeft: 30 }}>
                <ColumnContainer>
                  <TextDefault color="#4b4b4b" size="25px" bold="800">
                    Contact
                  </TextDefault>
                  <TextDefault
                    color="#8a97aa"
                    size="16px"
                    bold="400"
                    style={{ marginTop: 10 }}
                  >
                    My Company Profile
                  </TextDefault>
                </ColumnContainer>

                <CardForm>
                  <Grid container columnSpacing={4} xs={12}>
                    <Grid item xs={6}>
                      <GroupInput
                        style={{ marginBottom: 10 }}
                        className="groupInputSale"
                      >
                        <ImgOpt className="iconInputSale" src={IconName} />
                        <InputDefault
                          style={{ paddingLeft: 40 }}
                          className="inputSale"
                          placeholder="Name & Last Name*"
                          type="text"
                          value={nameContact}
                          onChange={(item) => setNameContact(item.target.value)}
                        />
                        <ImgOpt className="iconInputHide" src={IconEdit} />
                      </GroupInput>
                    </Grid>
                    <Grid item xs={6}>
                      <GroupInput
                        style={{ marginBottom: 10 }}
                        className="groupInputSale"
                      >
                        <ImgOpt className="iconInputSale" src={IconPhone} />
                        <InputDefault
                          style={{ paddingLeft: 40 }}
                          className="inputSale"
                          placeholder="Business Contact*"
                          type="text"
                          value={businessPhone}
                          onChange={(item) =>
                            setBusinessPhone(handleChange(item.target.value))
                          }
                        />
                        <ImgOpt className="iconInputHide" src={IconEdit} />
                      </GroupInput>
                    </Grid>
                    <Grid item xs={6}>
                      <GroupInput
                        style={{ marginBottom: 10 }}
                        className="groupInputSale"
                      >
                        <ImgOpt className="iconInputSale" src={IconMail} />
                        <InputDefault
                          style={{ paddingLeft: 40 }}
                          className="inputSale"
                          placeholder="Business Email*"
                          type="text"
                          value={businessEmail}
                          onChange={(item) =>
                            setBusinessEmail(item.target.value)
                          }
                        />
                        <ImgOpt className="iconInputHide" src={IconEdit} />
                      </GroupInput>
                    </Grid>
                    <Grid item xs={6}>
                      <GroupInput
                        style={{ marginBottom: 10 }}
                        className="groupInputSale"
                      >
                        <ImgOpt className="iconInputSale" src={IconMala} />
                        <InputDefault
                          style={{ paddingLeft: 40 }}
                          className="inputSale"
                          placeholder="Role At The Company*"
                          type="text"
                          value={roleAtCompany}
                          onChange={(item) =>
                            setRoleAtCompany(item.target.value)
                          }
                        />
                        <ImgOpt className="iconInputHide" src={IconEdit} />
                      </GroupInput>
                    </Grid>
                  </Grid>
                </CardForm>
                {switchAddEdit ? (
                  <BtnDefault
                    color="#224fad"
                    width="91.8%"
                    height="40px"
                    borderR="8px"
                    hoverColor="#3667cc"
                    onClick={() => insertTable()}
                    style={{ marginTop: 20 }}
                  >
                    <TextDefault
                      color="#ffff"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ImgDefault
                        src={IconPremium}
                        width="20px"
                        height="20px"
                        style={{ marginRight: 10 }}
                      />
                      Add Contact
                    </TextDefault>
                  </BtnDefault>
                ) : (
                  <RowContainer style={{ width: "91.8%" }}>
                    <BtnDefault
                      color="#224fad"
                      width="91.8%"
                      height="40px"
                      borderR="8px"
                      hoverColor="#3667cc"
                      onClick={() => saveEdit()}
                      style={{ marginTop: 20 }}
                    >
                      <TextDefault
                        color="#ffff"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ImgDefault
                          src={IconCheck2}
                          width="20px"
                          height="20px"
                          style={{ marginRight: 10 }}
                        />
                        Save
                      </TextDefault>
                    </BtnDefault>
                    <BtnDefault
                      color="#E93939"
                      width="45%"
                      height="40px"
                      borderR="8px"
                      hoverColor="#cd3333"
                      onClick={() => cancelEdit()}
                      style={{ marginTop: 20, marginLeft: 10 }}
                    >
                      <TextDefault
                        color="#ffff"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ImgDefault
                          src={XIcon}
                          width="13px"
                          height="13px"
                          style={{ marginRight: 10 }}
                        />
                        Cancel
                      </TextDefault>
                    </BtnDefault>
                  </RowContainer>
                )}
              </ColumnContainer>
            </ContainerModalCenter>
          </Modal>

          <Grid
            item
            xs={toggleDrawer ? 5 : 6}
            style={{ alignItems: "center", display: "flex" }}
          >
            <ColumnContainer>
              <ColumnContainer>
                <TextDefault color="#4b4b4b" size="25px" bold="800">
                  Update your company info
                </TextDefault>
                <TextDefault
                  color="#8a97aa"
                  size="16px"
                  bold="400"
                  style={{ marginTop: 10 }}
                >
                  My Company Profile
                </TextDefault>
              </ColumnContainer>

              <CardForm>
                <Grid container columnSpacing={4} xs={12}>
                  <Grid item xs={8}>
                    <GroupInput
                      style={{ marginBottom: 10 }}
                      className="groupInputSale"
                    >
                      <ImgOpt className="iconInputSale" src={IconMala} />
                      <InputDefault
                        style={{ paddingLeft: 40 }}
                        className="inputSale"
                        placeholder="Company Name"
                        type="text"
                        value={companyName}
                        onChange={(item) => setCompanyName(item.target.value)}
                      />
                      <ImgOpt className="iconInputHide" src={IconEdit} />
                    </GroupInput>
                  </Grid>
                  <Grid item xs={4}>
                    <GroupInput
                      style={{ marginBottom: 10 }}
                      className="groupInputSale"
                    >
                      <ImgOpt className="iconInputSale" src={IconTag} />
                      <InputDefault
                        style={{ paddingLeft: 40 }}
                        className="inputSale"
                        placeholder="Identification Number"
                        type="text"
                        value={identificationNumber}
                        onChange={(item) =>
                          setIdentificationNumber(item.target.value)
                        }
                      />
                      <ImgOpt className="iconInputHide" src={IconEdit} />
                    </GroupInput>
                  </Grid>
                  <Grid item xs={8}>
                    <GroupInput
                      style={{ marginBottom: 10 }}
                      className="groupInputSale"
                    >
                      <ImgOpt className="iconInputSale" src={IconAddress} />
                      <InputDefault
                        style={{ paddingLeft: 40 }}
                        className="inputSale"
                        placeholder="Address"
                        type="text"
                        value={address}
                        onChange={(item) => setAddress(item.target.value)}
                      />
                      <ImgOpt className="iconInputHide" src={IconEdit} />
                    </GroupInput>
                  </Grid>
                  <Grid item xs={4}>
                    <GroupInput className="groupInputSale">
                      <SelectDefault
                        className={`selectSale inputSale`}
                        placeholder="Country"
                        type="text"
                        defaultValue={country}
                        value={country}
                        onChange={(item) => setCountry(item.target.value)}
                        style={{ height: 45 }}
                      >
                        <option value="" disabled selected>
                          Country
                        </option>
                        {Country.map((obj) => (
                          <OptionImg value={obj.country} img={obj.src}>
                            {obj.country}
                          </OptionImg>
                        ))}
                      </SelectDefault>
                      <ImgOpt
                        className="iconInputHide"
                        src={country ? getFlag(country) : Ping}
                      />
                    </GroupInput>
                  </Grid>
                  <Grid item xs={6}>
                    <GroupInput
                      style={{ marginBottom: 10 }}
                      className="groupInputSale"
                    >
                      <ImgOpt className="iconInputSale" src={IconCompany} />
                      <InputDefault
                        style={{ paddingLeft: 40 }}
                        className="inputSale"
                        placeholder="Site"
                        type="text"
                        value={site}
                        onChange={(item) => setSite(item.target.value)}
                      />
                      <ImgOpt className="iconInputHide" src={IconEdit} />
                    </GroupInput>
                  </Grid>
                  <Grid item xs={6}>
                    <GroupInput className="groupInputSale">
                      <SelectDefault
                        className={`selectSale inputSale`}
                        placeholder="Role at T-Sale Metals"
                        type="text"
                        defaultValue={activity}
                        value={activity}
                        onChange={(item) => setActivity(item.target.value)}
                        style={{ height: 45 }}
                      >
                        <option value="" disabled selected>
                          Role at T-Sale Metals
                        </option>
                        <option value="Import">Import</option>
                        <option value="Export">Export</option>
                        <option value="Import & Export">Import & Export</option>
                      </SelectDefault>
                      <ImgOpt className="iconInputHide" src={IconEdit} />
                    </GroupInput>
                  </Grid>

                  <Grid item xs={12}>
                    <GroupInput
                      style={{ marginBottom: 10 }}
                      className="groupInputSale"
                    >
                      <ImgOpt className="iconInputSale" src={BuyerIcon} />
                      <InputDefault
                        style={{ paddingLeft: 40 }}
                        className="inputSale"
                        placeholder="Products Interested"
                        type="text"
                        value={product}
                        onChange={(item) => setProduct(item.target.value)}
                      />
                      <ImgOpt className="iconInputHide" src={IconEdit} />
                    </GroupInput>
                  </Grid>
                </Grid>
              </CardForm>

              <ContainerTable>
                <TableContacts
                  data={tableData}
                  clearRow={deleteRow}
                  editRow={updateRow}
                />
              </ContainerTable>
            </ColumnContainer>
          </Grid>

          <Grid item xs={5}>
            <ColumnContainer
              style={{
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.colors.main[500],
              }}
            >
              <ImgDefault src={CompanyPic} width="90%" height="50%" />
              <BtnDefault
                color="#224fad"
                hoverColor="#3667cc"
                onClick={() => setIsLimitModalVisible(true)}
              >
                <TextDefault
                  color="#ffff"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ImgDefault
                    src={IconPremium}
                    width="20px"
                    height="20px"
                    style={{ marginRight: 10 }}
                  />
                  Add New Contact
                </TextDefault>
              </BtnDefault>
            </ColumnContainer>
          </Grid>

          <RowContainer style={{ position: "fixed", bottom: 0, right: 0 }}>
            <BtnNextSolutions onClick={() => updateInfo()}>
              <ImgDefault src={IconCheck} width="20px" height="20px" />
              <TextDefault
                size={"18px"}
                color={theme.colors.main[500]}
                style={{ marginLeft: 10 }}
              >
                Save
              </TextDefault>
            </BtnNextSolutions>

            <BtnCancelSolutions
              onClick={() => window.close()}
              color={"#E93939"}
              style={{ marginLeft: -30 }}
            >
              <ImgDefault src={XIcon} width="13px" height="13px" />
            </BtnCancelSolutions>
          </RowContainer>
        </Grid>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
