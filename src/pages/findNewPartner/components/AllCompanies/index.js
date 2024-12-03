/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from "@mui/material";

import {
  ColumnContainer,
  RowContainer,
  TextDefault,
} from "../../../../assets/styles";
import Spinner from "../Spinner";
import { Empty } from "../../styles";
import ExportBtn from "../../assets/ExportBtn";
import AllCompaniesTable from "../../assets/DataGrid";
import MagnifierQuestion from "../../assets/magnifier-question.svg";
import GeneralData from "../GeneralData";
import { Footer } from "./styles";
import Loader from "../../../../components/Loader";
import { Pdf } from "./components/Pdf";
import ExtraExport from "./extra/pdfExport";
import * as XLSX from "xlsx";
import { useContext, useMemo, useState } from "react";
import { ThemeContext } from "styled-components";

export default function AllCompanies({
  toggleDrawer,
  animatedStep,
  moveStepAnimation,
  step,
  selectedTable,
  setHsCodeSel,
  supplierOrBuyer,
  isRequestFinished,
  setCountrySel,
  countrySel,
  handlePrint,
  companies,
  requestMore,
  pdfRef,
  general,
  generalData,
  dataCompany,
  isMoreLoading,
  handleSearchAgain,
  selectedDataType,
  setSelectedDataType,
  toDate,
  fromDate,
  deleteCompany,
  hsCodes,
}) {
  const theme = useContext(ThemeContext);
  const [searchCompany, setSearchCompany] = useState("");

  const formattedData = companies.map((company) => ({
    CompanyName:
      company?.companyName.charAt(0).toUpperCase() +
      company?.companyName.slice(1),
    Country:
      company?.country.charAt(0).toUpperCase() + company?.country.slice(1),
  }));

  const hasDifCountrycompanies =
    companies.filter(
      (company) => company?.country?.toLowerCase() !== countrySel?.toLowerCase()
    ).length > 0;

  const sheetName = "Data Records";

  const handleExcel = () => {
    const ws = XLSX.utils.json_to_sheet(formattedData);
    companies.map(
      (company, i) =>
        (ws[`A${i + 2}`].l = {
          Target: `https://app.tsalemetals.com/trade-data?companyName=${company.companyName}&companyId=${company.id}&country=${company.country}&role=Supplier&isFavorited=New`,
          Tooltip: `Open ${company.companyName} Profile`,
        })
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, sheetName + ".xlsx");
  };

  const filteredCompanies = useMemo(() =>
    companies.filter((company) =>
      company?.companyName
        ?.toLowerCase()
        ?.includes(searchCompany?.toLowerCase())
    )
  );

  return (
    <>
      <Loader isLoading={!isRequestFinished} />
      <Grid item xs={toggleDrawer ? 10 : 11} container className={animatedStep}>
        <Grid item xs={12}>
          <ColumnContainer
            style={{ marginLeft: 20, marginTop: 50, marginRight: 60 }}
          >
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
                  setCountrySel("");
                  setHsCodeSel([]);
                  selectedDataType === "New"
                    ? moveStepAnimation("back", 1)
                    : moveStepAnimation("back", 0);
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
            <TextDefault color={theme.colors.gray[700]} size={"32px"}>
              Result
            </TextDefault>
            <TextDefault
              color={theme.colors.gray[500]}
              size={"18px"}
              bold={"400"}
              style={{ marginTop: 10, width: "75%" }}
            >
              Companies that meets the selected criteria
            </TextDefault>

            <ExtraExport action={handlePrint} excel={handleExcel} />
            {isRequestFinished && companies?.length > 0 && (
              <>
                {selectedTable === "hsCode" && (
                  <Pdf
                    ref={pdfRef}
                    companies={companies}
                    general={general}
                    maxCompanies={generalData?.totalCompanies}
                    dataType={selectedDataType}
                    filterBy={selectedTable}
                    role={supplierOrBuyer}
                    toDate={toDate}
                    fromDate={fromDate}
                    hsCodes={hsCodes}
                  />
                )}

                <div>
                  {selectedTable === "hsCode" &&
                    GeneralData &&
                    selectedDataType !== "Favorited" && (
                      <div style={{ height: 480 }}>
                        <GeneralData
                          companies={companies}
                          general={general}
                          maxCompanies={generalData?.totalCompanies}
                        />
                      </div>
                    )}

                  <div style={{ marginTop: 48 }}>
                    {selectedDataType !== "Favorited" &&
                      hasDifCountrycompanies && (
                        <div
                          style={{
                            backgroundColor: theme.colors.gray[50],
                            padding: "16px 12px",
                            borderRadius: 4,
                            marginBottom: 12,
                            width: "98%",
                          }}
                        >
                          <small>
                            Some companies are headquartered in other countries
                            but also operate in the selected country, so you may
                            find companies from different countries than the
                            selected one.
                          </small>
                        </div>
                      )}

                    {selectedDataType === "Favorited" && (
                      <>
                        <small>Search for a company</small>
                        <input
                          onChange={(e) => setSearchCompany(e.target.value)}
                          value={searchCompany}
                          placeholder="Search for a company"
                          style={{
                            border: "1px solid #aaa",
                            width: "98%",
                            height: 24,
                            borderRadius: 4,
                            fontSize: 16,
                            padding: "16px 4px",
                            outline: "none",
                            marginBottom: 24,
                          }}
                        />
                      </>
                    )}

                    <AllCompaniesTable
                      data={filteredCompanies}
                      role={supplierOrBuyer}
                      clickRow={dataCompany}
                      dataType={selectedDataType}
                      filterBy={selectedTable}
                      selectedCountry={countrySel}
                      deleteCompany={deleteCompany}
                    />
                  </div>
                </div>

                <Footer>
                  <small>
                    {selectedDataType === "New" &&
                      `Showing ${companies.length} of
                ${
                  generalData?.totalCompanies >= companies.length
                    ? generalData?.totalCompanies
                    : companies.length
                } results.`}

                    {selectedDataType === "Favorited" &&
                      `Showing ${companies.length} favorited companies.`}

                    {selectedTable !== "hsCode" && ``}
                  </small>

                  {selectedTable === "hsCode" && (
                    <button
                      onClick={
                        selectedDataType === "New"
                          ? () => requestMore(10)
                          : () => {
                              moveStepAnimation("next", 1);
                              setSelectedDataType("New");
                            }
                      }
                      disabled={isMoreLoading}
                      className={isMoreLoading ? "btnNextBlueLock" : ""}
                    >
                      {isMoreLoading ? (
                        <Spinner size={16} spinnerColor={theme.colors.text} />
                      ) : (
                        <>
                          {selectedDataType === "New"
                            ? "Load more"
                            : "Get new companies"}
                        </>
                      )}
                    </button>
                  )}
                </Footer>
              </>
            )}

            {isRequestFinished &&
              companies?.length === 0 &&
              selectedTable === "hsCode" && (
                <Empty>
                  <img src={MagnifierQuestion} alt="Magnifier Question" />
                  <h2>
                    We did not found any company with the selected criterias, so
                    this search will not consume credits, please try again.
                  </h2>

                  <button onClick={handleSearchAgain}>Search Again</button>
                </Empty>
              )}

            {isRequestFinished &&
              companies?.length === 0 &&
              selectedTable === "name" && (
                <Empty>
                  <img src={MagnifierQuestion} alt="Magnifier Question" />
                  <h2>
                    Your search has the results below, if the company you're
                    looking for isn't show below, please check if the company
                    operates under another name.
                  </h2>

                  <button onClick={handleSearchAgain}>Search Again</button>
                </Empty>
              )}
          </ColumnContainer>
        </Grid>
      </Grid>
    </>
  );
}
