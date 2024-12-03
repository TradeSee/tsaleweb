import { useEffect, useState } from "react";
import { Grid, Modal } from "@mui/material";

import {
  Container,
  Content,
  PersonalData,
  Data,
  SectionContainer,
  FormGroups,
  ActionsContainer,
  HeaderFormProfile,
  BtnOptProfile,
} from "./styles";

import Drawer from "../../components/Drawer";
import LoadingPage from "../../components/LoadingPage";

import useProfile from "./useProfile";
import { FloatInput, FloatSelect } from "./components/FloatInput";
import { BtnDefault, CardForm, ColumnContainer, ContainerTable, GroupInput, ImgDefault, ImgOpt, InputDefault, OptionImg, RowContainer, SelectDefault, TextDefault } from "../../assets/styles";
import ProfileIcon from "../../icons/Iconprofile.png"
import PadlockIcon from "../../icons/padlockIcon.png"
import MCPIcon from "../../icons/MCPIcon.png"
import AddContactIcon from "../../icons/plusPremium.png"
import BannerPng from "../../icons/sanctionImg.png"

import NameInput from "../../icons/nameIconFigma.png"
import PhoneInput from "../../icons/phone-myicons.png"
import EmailInput from "../../icons/mailIcon.png"
import RoleInput from "../../icons/mala.png"
import LocationInput from "../../icons/address-myicons.png"
import PadlockInput from "../../icons/padlockIconFigma.png"
import KeyInput from "../../icons/keyIconFigma.png"
import TagInput from "../../icons/tag-myicons.png"
import GobleInput from "../../icons/globe-myicons.png"
import StockInput from "../../icons/stock.png"
import TableContacts from "./components/TableContacts";
import { ContainerModalCenter } from "../home/styles";
import IconCheck2 from "../../icons/checkPremium.png";
import XIcon from "../../icons/xIcon.png";
import Country from "../../components/Flag";
import Ping from "../../icons/ping.png";
import { RmDuplicate, attHsCode } from "../../hooks/rmDuplicata";

export default function Profile() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [nameContact, setNameContact] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [roleAtCompany, setRoleAtCompany] = useState("");
  const [switchAddEdit, setSwitchAddEdit] = useState(true);
  const [keyEdit, setKeyEdit] = useState(false);
  const [isLimitModalVisible, setIsLimitModalVisible] = useState(false);
  const [errorLogin, setErrorLogin] = useState("erroStep0");
  const [errorSave, setErrorSave] = useState("erroStep0");
  const [saveData, setSaveData] = useState("erroStep0");
  const [step, setStep] = useState(0)

  const closeModal = () => {
    setIsLimitModalVisible(false);
  };

  const {
    isLoading,
    errors,

    name,
    lastName,
    email,
    phone,
    role,

    actualPassword,
    newPassword,
    confirmNewPassword,

    city,
    country,
    line1,
    line2,
    postalCode,
    state,

    personalInfoChanged,
    handleChangeName,
    handleChangeLastName,
    handleChangePhone,
    handleChangeEmail,
    handleChangeRole,
    handleCancelPersonal,
    handleConfirmPersonal,

    isChangingPassword,
    handleActualPassword,
    handleNewPassword,
    handleConfirmPassword,
    handleCancelChangePassword,
    handleChangePassword,

    AddressChanged,
    handleChangeCity,
    handleChangeCountry,
    handleChangeLine1,
    handleChangeLine2,
    handleChangePostalCode,
    handleChangeState,
    handleCancelAddress,
    handleChangeAddress,

    companyName,
    idNumber,
    addressCompany,
    site,
    roleCompany,
    productsInterested,
    companyCountry,
    tableData,

    handleChangeCompanyCountry,
    handleChangeAddressCompany,
    handleChangeSite,
    handleChangeRoleCompany,
    handleChangeProductsInterested,
    handleChangeIdNumber,
    handleChangeCompanyName,
    handleChangeTable,

    updateInfo
  } = useProfile();

  useEffect(() => {
    const TitlePage = "Profile";

    document.title = TitlePage;
  }, []);

  function SetToggle(state) {
    setIsDrawerOpen(state);
  }

  function getErrorMessageByFieldName(fieldName) {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  const deleteRow = (key) => {
    handleChangeTable(
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

  function handleChange(event) {
    const inputValue = event.replace("+", "");
    const newValue = "+" + inputValue;
    // Faça o que for necessário com o novo valor
    return newValue;
  }

  const insertTable = () => {
    if (nameContact && businessEmail && businessPhone && roleAtCompany) {
      handleChangeTable([
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

  function generateUniqueId(str1, str2) {
    const timestamp = new Date().getTime();
    const random = Math.random();
    const combinedString = str1 + str2;
    const hash = hashCode(combinedString);
    const uniqueId = `${timestamp}_${random}_${hash}`;
    return uniqueId;
  }

  function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash;
  }

  const saveEdit = () => {
    if (nameContact && businessEmail && businessPhone && roleAtCompany) {
      handleChangeTable([
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

  const getFlag = (set) => {

    console.log("Valid")
    console.log(set)
    console.log("--------")
    console.log(Country)

    let filter = Country.filter((item) => {
      return item.country.toLowerCase() === set.toLowerCase();
    });

    return filter[0].src;
  };

  const saveFormProfile = () => {
    if(step == 0) {
      //personalInfoChanged Valida alterações no formulário do My Profile
      handleConfirmPersonal();
      return;
    }

    if(step == 1) {
      //isChangingPassword
      handleChangePassword()
      updateInfo()
    }
  }

  const cancelFormProfile = () => {
    if(step == 0) {
      //personalInfoChanged Valida alterações no formulário do My Profile
      handleCancelPersonal()
    }

    if(step == 1) {
      //isChangingPassword
      handleCancelChangePassword()
      console.log(new Date)
    }
  }

  return (
    <Container>
      {isLoading && <LoadingPage />}

      {!isLoading && (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={isDrawerOpen ? 2 : 1}>
            <Drawer handleToggle={SetToggle} initState={isDrawerOpen} />
          </Grid>

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
                        <ImgOpt className="iconInputSale" src={RoleInput} />
                        <InputDefault
                          style={{ paddingLeft: 40 }}
                          className="inputSale"
                          placeholder="Name & Last Name*"
                          type="text"
                          value={nameContact}
                          onChange={(item) => setNameContact(item.target.value)}
                        />
                        <ImgOpt className="iconInputHide" src={RoleInput} />
                      </GroupInput>
                    </Grid>
                    <Grid item xs={6}>
                      <GroupInput
                        style={{ marginBottom: 10 }}
                        className="groupInputSale"
                      >
                        <ImgOpt className="iconInputSale" src={RoleInput} />
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
                        <ImgOpt className="iconInputHide" src={RoleInput} />
                      </GroupInput>
                    </Grid>
                    <Grid item xs={6}>
                      <GroupInput
                        style={{ marginBottom: 10 }}
                        className="groupInputSale"
                      >
                        <ImgOpt className="iconInputSale" src={RoleInput} />
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
                        <ImgOpt className="iconInputHide" src={RoleInput} />
                      </GroupInput>
                    </Grid>
                    <Grid item xs={6}>
                      <GroupInput
                        style={{ marginBottom: 10 }}
                        className="groupInputSale"
                      >
                        <ImgOpt className="iconInputSale" src={RoleInput} />
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
                        <ImgOpt className="iconInputHide" src={RoleInput} />
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
                        src={AddContactIcon}
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

          <HeaderFormProfile>
            <ColumnContainer>
              <TextDefault size="30px" color="#FFF" bold="800">Hello, {name}</TextDefault>

              <RowContainer style={{marginTop: 30}}>
                {step != 0 ? (
                  <BtnOptProfile onClick={() => setStep(0)}>
                    <ImgDefault src={ProfileIcon} width="15px" height="15px"/>
                    <TextDefault size="13px" color="#fff" style={{marginLeft: 8}}>My Profile</TextDefault>
                  </BtnOptProfile>
                ) : ""}
                {step != 1 ? (
                  <BtnOptProfile onClick={() => setStep(1)}>
                    <ImgDefault src={PadlockIcon} width="13px" height="15px"/>
                    <TextDefault size="13px" color="#fff" style={{marginLeft: 8}}>Security Password</TextDefault>
                  </BtnOptProfile>
                ) : ""}
                {step != 2 ? (
                  <BtnOptProfile onClick={() => setStep(2)}>
                    <ImgDefault src={MCPIcon} width="15px" height="15px"/>
                    <TextDefault size="13px" color="#fff" style={{marginLeft: 8}}>My Company Profile</TextDefault>
                  </BtnOptProfile>
                ) : ""}
                {step == 2 ? (
                  <BtnOptProfile onClick={() => setIsLimitModalVisible(true)}>
                    <ImgDefault src={AddContactIcon} width="15px" height="15px"/>
                    <TextDefault size="13px" color="#fff" style={{marginLeft: 8}}>Add New Contact</TextDefault>
                  </BtnOptProfile>
                ) : ""}
              </RowContainer>
            </ColumnContainer>

          </HeaderFormProfile>

          <ImgDefault src={BannerPng} width="190px" height="190px" style={{position: 'absolute', right: 100, top: 10}}/>

          <Grid item xs={isDrawerOpen ? 10 : 11} container alignItems="center">
            <Content>

              <SectionContainer>

                {step == 0 ? (
                  <FormGroups>
                    <PersonalData>
                      <header>
                        <TextDefault size="25px" color="#4b4b4b" bold="800">Personal Data</TextDefault>
                      </header>

                      <Data>
                        <FloatInput
                          value={name}
                          onChange={handleChangeName}
                          label={"First Name*"}
                          error={getErrorMessageByFieldName("name")}
                          img={NameInput}
                        />

                        <FloatInput
                          value={lastName}
                          onChange={handleChangeLastName}
                          label={"Last Name*"}
                          error={getErrorMessageByFieldName("lastName")}
                          img={NameInput}
                        />

                        <FloatInput
                          value={phone}
                          onChange={handleChangePhone}
                          label={"Phone*"}
                          error={getErrorMessageByFieldName("phone")}
                          img={PhoneInput}
                        />

                        <FloatInput
                          readOnly
                          value={email}
                          onChange={handleChangeEmail}
                          label={"E-mail*"}
                          error={getErrorMessageByFieldName("email")}
                          img={EmailInput}
                        />

                        <FloatSelect
                          value={role}
                          onChange={handleChangeRole}
                          label={"Role*"}
                          defaultValue={role}
                          img={RoleInput}

                        >
                          <option value="" disabled selected>
                            Role at T-Sale Metals
                          </option>
                          <option value="Import">Import</option>
                          <option value="Export">Export</option>
                          <option value="Import & Export">Import & Export</option>
                        </FloatSelect>
                                              
                      </Data>
                    </PersonalData>

                    <PersonalData>
                      <header>
                        <TextDefault size="25px" color="#4b4b4b" bold="800">Address</TextDefault>
                      </header>

                      <Data>
                        <FloatInput
                          value={city}
                          onChange={handleChangeCity}
                          label={"City*"}
                          error={getErrorMessageByFieldName("city")}
                          img={LocationInput}
                        />

                        <FloatInput
                          value={country}
                          onChange={handleChangeCountry}
                          label={"Country*"}
                          error={getErrorMessageByFieldName("country")}
                          img={LocationInput}
                        />

                        <FloatInput
                          value={line1}
                          onChange={handleChangeLine1}
                          label={"Line 1*"}
                          error={getErrorMessageByFieldName("line1")}
                          img={LocationInput}
                        />

                        <FloatInput
                          value={line2}
                          onChange={handleChangeLine2}
                          label={"Line 2*"}
                          error={getErrorMessageByFieldName("line2")}
                          img={LocationInput}
                        />

                        <FloatInput
                          value={postalCode}
                          onChange={handleChangePostalCode}
                          label={"Postal Code*"}
                          error={getErrorMessageByFieldName("postalCode")}
                          img={LocationInput}
                        />

                        <FloatInput
                          value={state}
                          onChange={handleChangeState}
                          label={"State*"}
                          error={getErrorMessageByFieldName("state")}
                          img={LocationInput}
                        />

                        {AddressChanged && (
                          <ActionsContainer>
                            <button
                              className="save"
                              type="button"
                              onClick={handleChangeAddress}
                            >
                              Save
                            </button>
                            <button
                              className="cancel"
                              type="button"
                              onClick={handleCancelAddress}
                            >
                              Cancel
                            </button>
                          </ActionsContainer>
                        )}
                      </Data>
                    </PersonalData>                 
                  </FormGroups>
                ) : step == 1 ? (
                  <FormGroups>
                    <PersonalData>
                      <header>
                        <TextDefault size="25px" color="#4b4b4b" bold="800">Change Password</TextDefault>
                      </header>

                      <Data>
                        <FloatInput
                          type="password"
                          onChange={handleActualPassword}
                          value={actualPassword}
                          label={"Actual password*"}
                          notRequired
                          img={PadlockInput}                        
                        />
                        <FloatInput
                          type="password"
                          onChange={handleNewPassword}
                          value={newPassword}
                          label={"New password*"}
                          notRequired
                          img={KeyInput}
                        />

                        <FloatInput
                          type="password"
                          onChange={handleConfirmPassword}
                          value={confirmNewPassword}
                          label={"Confirm the new password*"}
                          notRequired
                          img={KeyInput}
                        />
                        
                      </Data>
                    </PersonalData>
                  </FormGroups>
                ) : (
                  <FormGroups>
                    <PersonalData>
                        <header>
                          <TextDefault size="25px" color="#4b4b4b" bold="800">Update your company info</TextDefault>
                        </header>

                        <Data>
                          <FloatInput
                            value={companyName}
                            onChange={handleChangeCompanyName}
                            label={"Company Name*"}
                            error={getErrorMessageByFieldName("companyName")}
                            img={RoleInput}
                          />

                          <FloatInput
                            value={idNumber}
                            onChange={handleChangeIdNumber}
                            label={"Identification Number*"}
                            error={getErrorMessageByFieldName("idNumber")}
                            img={TagInput}
                          />

                          <FloatInput
                            value={addressCompany}
                            onChange={handleChangeAddressCompany}
                            label={"Address*"}
                            error={getErrorMessageByFieldName("addressCompany")}
                            img={LocationInput}
                          />

                          <GroupInput className="groupInputSale" style={{ marginBottom: 10 }}>
                            <TextDefault color="#8a97aa" size="13px" bold="400" style={{position: "absolute", top: -30, left: 5}}>Country*</TextDefault>
                            <SelectDefault
                              className={`selectSale inputSale`}
                              placeholder="Country"
                              type="text"
                              defaultValue={companyCountry}
                              value={companyCountry}
                              onChange={handleChangeCompanyCountry}
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
                              src={companyCountry ? getFlag(companyCountry) : Ping}
                            />
                          </GroupInput>

                          <FloatInput
                            readOnly
                            value={site}
                            onChange={handleChangeSite}
                            label={"Site*"}
                            error={getErrorMessageByFieldName("site")}
                            img={GobleInput}
                          />                          
                          <FloatSelect
                          value={roleCompany}
                          onChange={handleChangeRoleCompany}
                          label={"Role*"}
                          defaultValue={roleCompany}
                          img={RoleInput}

                          >
                            <option value="" disabled selected>
                              Role at T-Sale Metals
                            </option>
                            <option value="Import">Import</option>
                            <option value="Export">Export</option>
                            <option value="Import & Export">Import & Export</option>
                          </FloatSelect>                                                  
                        </Data>
                        <br/>
                        <FloatInput
                          readOnly
                          value={productsInterested}
                          onChange={handleChangeProductsInterested}
                          label={"Products Interested*"}
                          error={getErrorMessageByFieldName("productsInterested")}
                          img={StockInput}
                        />


                        <ContainerTable>
                          <TableContacts
                            data={tableData}
                            clearRow={deleteRow}
                            editRow={updateRow}
                          />
                        </ContainerTable>

                    </PersonalData>                    
                  </FormGroups>
                )} 

                <RowContainer style={{position: 'absolute', bottom: 40, right: 90}}>
                  <BtnDefault borderR="8px" onClick={saveFormProfile}>
                    <TextDefault size="18px" color="#fff" bold="800" >Save</TextDefault>
                  </BtnDefault>

                  {(personalInfoChanged && step == 0) || (isChangingPassword && step == 1) ? (
                    <BtnDefault style={{marginLeft: 10}} color="#E93939" borderR="8px" onClick={cancelFormProfile}>
                      <TextDefault size="18px" color="#fff" bold="800" >Cancel</TextDefault>
                    </BtnDefault>
                  ) : ""}
                </RowContainer>

              </SectionContainer>
            </Content>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
