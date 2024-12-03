import { useContext, useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ThemeContext } from "styled-components";

import country from "../../utils/flag";

import IconSupplier from "../../../../icons/parcel.png";
import IconBuyer from "../../../../icons/investor.png";
import IconSupplierBlue from "../../../../icons/ParcelBlue.png";
import IconBuyerBlue from "../../../../icons/InvestorBlue.png";

import {
  BtnNextSolutions,
  CardSwitch,
  CardSwitchText,
  Container,
  FilterFooter,
  MainFilter,
} from "./styles";

import {
  ImgDefault,
  RowContainer,
  TextDefault,
} from "../../../../assets/styles";
import Switch from "./components/switch";

function Option({ country }) {
  return (
    <div
      className="country-option"
      style={{ display: "flex", alignItems: "center" }}
    >
      <img src={country.src} alt={country.label} width={20} height={20} />
      <strong style={{ marginLeft: 12 }}>{country.label}</strong>
    </div>
  );
}

export default function Filters({
  toggleDrawer,
  animatedStep,
  moveStepAnimation,
  step,
  handleSelectTable,
  selectedTable,
  handleCountrySelect,
  countrySel,
  companyName,
  handleCompanyName,
  hsCodeSel,
  setHsCodeSel,
  products,
  supplierOrBuyer,
  fetchCompaniesByName,
  requestCompanies,
  cardSupplierOrBuyer,
  setDefaultRange,
  handleSearchFor,
  searchFor,
  fetchShipments,
  fetchShipmentsByHs,
  setCountryTrade,
  countryTrade,
}) {
  const customSelectStyles = useMemo(
    () => ({
      valueContainer: (provided, state) => ({
        ...provided,
        maxWidth: "700px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        flexWrap: "nowrap",
      }),
      input: (provided, state) => ({
        ...provided,
        width: "50px",
      }),
    }),
    []
  );
  const correctHsCodes = products.map((hsCode) => {
    return {
      ...hsCode,
      value: `${hsCode.hsCode} - ${hsCode.hsName}`,
    };
  });

  const isButtonAbled = () => {
    if (selectedTable === "name") {
      return !!(countrySel !== "" && companyName !== "");
    }

    if (selectedTable === "hsCode") {
      return !!(supplierOrBuyer && hsCodeSel.length > 0 && countrySel !== "");
    }
  };

  // const saveRange = (event, newValue) => {
  //   setDefaultRange(newValue);
  // };

  // const saveRange = (event, newValue) => {
  //   if (value === 'custom') {
  //     console.log("aqui")
  //     setDefaultRange([customMinValue, customMaxValue]);
  //   } else {
  //     // Caso contrário, passamos apenas o novo valor
  //     setDefaultRange([0, value]);
  //   }
  // };

  const isRoleActivated = useMemo(
    () => selectedTable === "name" && searchFor === "company",
    [selectedTable, searchFor]
  );

  return (
    <Grid item xs={toggleDrawer ? 10 : 11} container className={animatedStep}>
      <Container>
        <RowContainer
          style={{
            width: 55,
            left: 80,
            marginTop: 48,
            alignItems: "center",
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

          <h1
            style={{
              color: "#4B4B4B",
            }}
          >
            Filters
          </h1>
        </RowContainer>

        <MainFilter>
          <div>
            <h2 style={{ margin: 0 }}>Select an option</h2>
            <small
              style={{
                color: "#4B4B4B",
                marginBottom: 64,
                margintop: -8,
              }}
            >
              {searchFor === "company"
                ? "*Access all avaliable information from a company"
                : "*Access the shipments from the selected country"}
            </small>
          </div>

          <div className="Filters">
            <div className="searchFor">
              <input
                type="radio"
                id="company"
                name="SearchFor"
                value={"company"}
                onChange={() => handleSearchFor("company")}
                checked={searchFor === "company"}
              />
              <label htmlFor="company" style={{ marginRight: 32 }}>
                Company
              </label>

              <input
                type="radio"
                id="Shipments"
                name="SearchFor"
                value={"Shipments"}
                onChange={() => handleSearchFor("shipments")}
                checked={searchFor === "shipments"}
              />
              <label htmlFor="Shipments">Shipments</label>
            </div>

            <h2>What are you looking for</h2>
            <div className="lookingFor">
              <Switch
                firstValue={"hsCode"}
                secondValue={"name"}
                firstTitle={"HsCode"}
                secondTitle={"Name"}
                firstDescription={"Based on hsCodes"}
                secondDescription={"Based on the name"}
                firstSelected={selectedTable === "hsCode"}
                secondSelected={selectedTable === "name"}
                handleSelect={handleSelectTable}
              />

              <Switch
                firstValue={"Supplier"}
                secondValue={"Buyer"}
                firstTitle={"Supplier"}
                secondTitle={"Buyer"}
                firstDescription={"Find suppliers"}
                secondDescription={"Find clients"}
                firstIconActivated={IconSupplierBlue}
                firstIconDeactived={IconSupplier}
                secondIconActivated={IconBuyerBlue}
                secondIconDeactived={IconBuyer}
                firstSelected={
                  !isRoleActivated && supplierOrBuyer === "Supplier"
                }
                secondSelected={!isRoleActivated && supplierOrBuyer === "Buyer"}
                handleSelect={cardSupplierOrBuyer}
                disabled={isRoleActivated}
              />
            </div>
          </div>

          <div>
            {countrySel ? <small>Country*</small> : <br />}
            <Select
              placeholder="Select the country*"
              className="basic-select"
              classNamePrefix="Select a country"
              name="Country"
              defaultValue={countrySel}
              onChange={handleCountrySelect}
              value={country.country}
              options={country}
              isSearchable
              formatOptionLabel={(country) => <Option country={country} />}
            />
          </div>

          {selectedTable === "name" && (
            <div style={{ width: "100%" }}>
              {companyName ? (
                <>
                  <small> Company Name*</small>
                  <br />
                </>
              ) : (
                <br />
              )}

              <input
                type="text"
                placeholder="Company Name*"
                value={companyName}
                onChange={handleCompanyName}
                style={{ width: "100%" }}
              />
            </div>
          )}

          {selectedTable === "hsCode" && (
            <div style={{ width: "100%" }}>
              {hsCodeSel.length > 0 ? (
                <>
                  <small>Hs Codes*</small>
                  <br />
                </>
              ) : (
                <br />
              )}
              <Select
                placeholder="Select 1 to 5 HsCodes*"
                className="basic-multi-select"
                classNamePrefix="hsCodes"
                name="Hs Codes"
                defaultValue={hsCodeSel}
                onChange={setHsCodeSel}
                options={correctHsCodes}
                styles={customSelectStyles}
                isOptionDisabled={() => hsCodeSel.length >= 5}
                isSearchable
                isMulti
                formatOptionLabel={(hsCode) => (
                  <span className="Select-Text">
                    <strong>{hsCode.hsCode}</strong> -{" "}
                    <span>{hsCode.hsName}</span>
                  </span>
                )}
              />
            </div>
          )}

          {selectedTable === "hsCode" && (
            <div style={{ width: "100%" }}>
              {countryTrade.length > 0 ? (
                <>
                  <small>Country Trade Partner</small>
                  <br />
                </>
              ) : (
                <br />
              )}
              <Select
                placeholder="Select 1 to 3 country trader partner"
                className="basic-multi-select"
                classNamePrefix="hsCodes"
                name="Country Trade Partner"
                defaultValue={countryTrade}
                onChange={setCountryTrade}
                value={country.value}
                options={country}
                styles={customSelectStyles}
                isOptionDisabled={() => countryTrade.length >= 3}
                isSearchable
                isMulti
                formatOptionLabel={(country) => <Option country={country} />}
              />
            </div>
          )}
        </MainFilter>
        <br />

        <FilterFooter>
          <BtnNextSolutions
            className={isButtonAbled() ? "btnNextBlue" : "btnNextBlueLock"}
            onClick={() => {
              if (
                searchFor === "company" &&
                selectedTable === "name" &&
                isButtonAbled()
              ) {
                moveStepAnimation("next", 4);
                return fetchCompaniesByName();
              }

              if (
                searchFor === "company" &&
                selectedTable === "hsCode" &&
                isButtonAbled()
              ) {
                requestCompanies().then(() => {
                  return moveStepAnimation("next", 4);
                });
              }

              if (searchFor === "shipments" && selectedTable === "name") {
                fetchShipments().then(() => {
                  return moveStepAnimation("next", 7);
                });
              }

              if (searchFor === "shipments" && selectedTable === "hsCode") {
                fetchShipmentsByHs().then(() => {
                  return moveStepAnimation("next", 7);
                });
              }
            }}
            disabled={!isButtonAbled()}
          >
            <TextDefault size={"18px"} color={"#fff"}>
              Search
            </TextDefault>
            <ArrowForwardIcon
              style={{ marginLeft: 20 }}
              sx={{
                fontSize: "1.2rem",
                verticalAlign: "middle",
              }}
            />
          </BtnNextSolutions>
        </FilterFooter>
      </Container>
    </Grid>
  );
}
