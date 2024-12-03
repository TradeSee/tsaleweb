/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";

import Drawer from "../../components/Drawer";
import LoadingPage from "../../components/LoadingPage";
import AllModal from "../../components/AllModal";
import Filters from "./components/Filters";
import AllCompanies from "./components/AllCompanies";
import CompanyProfile from "./components/CompanyProfile";

import { ContainerHome } from "../../assets/styles";
import "./styles.css";

import useFNP from "./useFNP";
import HomeScreen from "./components/HomeScreen";
import { useSearchParams } from "react-router-dom";
import getUserInfo from "../../hooks/getUsers";
import Shipments from "./components/Shipments";

export default function FindNewPartner() {
  const {
    auth,
    isRequestFinished,
    toggleDrawer,
    SetToggle,
    step,
    animatedStep,
    selectedTable,
    handleSelectTable,
    moveStepAnimation,
    hsCodeSel,
    setHsCodeSel,
    supplierOrBuyer,
    cardSupplierOrBuyer,
    defaultRange,
    requestCompanies,
    companySelect,
    renderFlag,
    handlePrint,
    saveCompany,
    modalVisible,
    handleCloseModal,
    handleConfirmAction,
    handleCountrySelect,
    companies,
    requestMore,
    isMoreLoading,
    pdfRef,
    dataCompany,
    handleSearchAgain,
    products,
    companyName,
    handleCompanyName,
    fetchCompaniesByName,
    countrySel,
    general,
    setDefaultRange,
    selectedInfo,
    handleSelectInfo,
    setCountrySel,
    fetchCompanies,
    generalData,
    setFromDate,
    fromDate,
    setToDate,
    toDate,
    modalMoreVisible,
    handleCloseModalMore,
    fetchFavoritedCompanies,
    RequestCompaniesDb,
    dataCompanyDb,
    fetchCompaniesByNameDB,
    switchValue,
    RequestMoreDb,
    dataCompanyById,
    deleteFavoritedCompany,
    userInfo,
    handleSearchFor,
    searchFor,
    fetchShipments,
    shipments,
    fetchShipmentsByHs,
    isShipmentsLoading,
    setShipments,
    setCountryTrade,
    countryTrade,
  } = useFNP();

  const [searchParams] = useSearchParams();
  const [selectedDataType, setSelectedDataType] = useState("New");
  const [isLimitModalVisible, setIsLimitModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [redirectCompanyName] = useState(searchParams.get("companyName"));
  const [redirectCompanyId] = useState(searchParams.get("companyId"));
  const [redirectCountry] = useState(searchParams.get("country"));
  const [isFavorited] = useState(searchParams.get("isFavorited"));
  const [dataRecords] = useState(searchParams.get("dataRecords"));

  // useEffect(() => {
  //   async function handleRedirect() {
  //     if (switchValue === "api") {
  //       await fetchCompaniesByName();
  //     } else {
  //       fetchCompaniesByNameDB();
  //     }
  //   }

  //   if (auth && redirectCompanyId && redirectCompanyName && redirectCountry) {
  //     if (companies.length === 0) {
  //       handleRedirect();
  //       return;
  //     }
  //   }
  // }, [auth, redirectCompanyId, redirectCompanyName, redirectCountry, auth]);

  useEffect(() => {
    if (
      auth &&
      redirectCompanyId &&
      redirectCompanyName &&
      redirectCountry &&
      userInfo
    ) {
      if (!companySelect) {
        if (switchValue === "api" && isFavorited !== "Favorited") {
          dataCompanyById(redirectCompanyId, isFavorited === "Favorited");
        } else {
          dataCompanyDb(
            redirectCompanyId,
            companies,
            isFavorited === "Favorited"
          );
        }
      }
    }
  }, [
    auth,
    userInfo,
    redirectCompanyId,
    redirectCompanyName,
    redirectCountry,
    companySelect,
    isFavorited,
    switchValue,
    companies,
  ]);

  useEffect(() => {
    if (auth && dataRecords && userInfo) {
      setSelectedDataType("Favorited");
      moveStepAnimation("next", 4);
      fetchFavoritedCompanies();
    }
  }, [auth, userInfo]);

  useEffect(() => {
    const isRedirect =
      redirectCompanyId && redirectCompanyName && redirectCountry;

    if (!isRedirect ? auth : auth && companySelect) {
      setIsLoading(false);
    }
  }, [
    auth,
    redirectCompanyId,
    redirectCompanyName,
    redirectCountry,
    companySelect,
  ]);

  return (
    <>
      {!isLoading ? (
        <ContainerHome>
          <Grid
            container
            rowSpacing={1}
            style={{
              height: "100%",
            }}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={toggleDrawer ? 2 : 1}>
              <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
            </Grid>

            {step === 0 && (
              <HomeScreen
                toggleDrawer={toggleDrawer}
                animatedStep={animatedStep}
                moveStepAnimation={moveStepAnimation}
                setSelectedDataType={setSelectedDataType}
                fetchFavoritedCompanies={fetchFavoritedCompanies}
              />
            )}

            {step === 1 && (
              <Filters
                toggleDrawer={toggleDrawer}
                animatedStep={animatedStep}
                moveStepAnimation={moveStepAnimation}
                step={step}
                handleSelectTable={handleSelectTable}
                selectedTable={selectedTable}
                handleCountrySelect={handleCountrySelect}
                countrySel={countrySel}
                companyName={companyName}
                handleCompanyName={handleCompanyName}
                hsCodeSel={hsCodeSel}
                setHsCodeSel={setHsCodeSel}
                products={products}
                supplierOrBuyer={supplierOrBuyer}
                fetchCompaniesByName={
                  switchValue === "api"
                    ? fetchCompaniesByName
                    : fetchCompaniesByNameDB
                }
                fetchCompanies={fetchCompanies}
                requestCompanies={
                  switchValue === "api" ? requestCompanies : RequestCompaniesDb
                }
                cardSupplierOrBuyer={cardSupplierOrBuyer}
                setFromDate={setFromDate}
                fromDate={fromDate}
                setToDate={setToDate}
                toDate={toDate}
                setDefaultRange={setDefaultRange}
                switchValue={switchValue}
                handleSearchFor={handleSearchFor}
                searchFor={searchFor}
                fetchShipments={fetchShipments}
                fetchShipmentsByHs={fetchShipmentsByHs}
                setCountryTrade={setCountryTrade}
                countryTrade={countryTrade}
              />
            )}

            {step === 4 && (
              <AllCompanies
                toggleDrawer={toggleDrawer}
                animatedStep={animatedStep}
                moveStepAnimation={moveStepAnimation}
                step={step}
                selectedTable={selectedTable}
                setHsCodeSel={setHsCodeSel}
                hsCodes={hsCodeSel}
                supplierOrBuyer={supplierOrBuyer}
                isRequestFinished={isRequestFinished}
                setCountrySel={setCountrySel}
                countrySel={countrySel}
                handlePrint={handlePrint}
                companies={companies}
                requestMore={
                  switchValue === "api" ? requestMore : RequestMoreDb
                }
                fetch={fetchCompanies}
                pdfRef={pdfRef}
                general={general}
                generalData={generalData}
                dataCompany={dataCompany}
                isMoreLoading={isMoreLoading}
                handleSearchAgain={handleSearchAgain}
                selectedDataType={selectedDataType}
                setSelectedDataType={setSelectedDataType}
                switchValue={switchValue}
                toDate={toDate}
                fromDate={fromDate}
                deleteCompany={deleteFavoritedCompany}
                shipments={shipments}
              />
            )}

            {step === 5 && <LoadingPage />}

            {step === 6 && (
              <>
                <CompanyProfile
                  toggleDrawer={toggleDrawer}
                  animatedStep={animatedStep}
                  moveStepAnimation={moveStepAnimation}
                  supplierOrBuyer={supplierOrBuyer}
                  companySelect={companySelect}
                  renderFlag={renderFlag}
                  saveCompany={saveCompany}
                  selectedInfo={selectedInfo}
                  handleSelectInfo={handleSelectInfo}
                  hsCode={hsCodeSel}
                  companies={companies}
                  fromDate={fromDate}
                  toDate={toDate}
                  requestType={switchValue}
                  userId={userInfo.uid}
                  userName={userInfo.userData?.name}
                />
              </>
            )}

            {step === 7 && (
              <>
                <Shipments
                  role={supplierOrBuyer}
                  shipments={shipments}
                  animatedStep={animatedStep}
                  moveStepAnimation={moveStepAnimation}
                  toggleDrawer={toggleDrawer}
                  isLoading={isShipmentsLoading}
                  updateShipments={setShipments}
                />
              </>
            )}

            <AllModal
              type={"warning"}
              visible={modalVisible}
              onCancel={handleCloseModal}
              message="You need to add more credits to continue the search"
              title="No Balance"
              onConfirm={handleConfirmAction}
            />
            <AllModal
              type={"warning"}
              visible={modalMoreVisible}
              onCancel={handleCloseModalMore}
              message="You need to add more credits to continue the request"
              title="No Balance"
              onConfirm={handleConfirmAction}
            />
            <AllModal
              type={"warning"}
              visible={isLimitModalVisible}
              onCancel={() => setIsLimitModalVisible(false)}
              onConfirm={() => setIsLimitModalVisible(false)}
              message="You have reached your daily limit of 1000 credits"
              title="Limit Reached"
            />
          </Grid>
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
