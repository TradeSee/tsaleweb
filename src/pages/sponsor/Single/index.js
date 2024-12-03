import React, { useEffect, useState } from "react";
import { ContainerHome, TextDefault } from "../../../assets/styles";
import Drawer from "../../../components/Drawer";
import { Chip, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { authScreen } from "../../../contexts/auth";
import LoadingPage from "../../../components/LoadingPage";
import HsIcon from "../../../icons/boxC-v2.png";
import { getCompanySponsorDataById } from "../../../hooks/sponsor";
import CompanyDetails from "../components/CardProfile";
import Product from "../components/Product";

export default function SingleSponsor({}) {
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const { id } = useParams();
  const [companies, setCompanies] = useState([]);
  const [companyObject, setCompanyObject] = useState([]);

  function SetToggle(state) {
    useTroggleDawer(state);
    console.log(state);
  }

  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    authScreen().then((res) => {
      if (res) {
        setTimeout(() => {
          setAuth(true);
        }, 2000);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    });
  });

  useEffect(() => {
    async function fetchCompanySponsorData() {
      try {
        // const data = Mock;
        const dataUnmapped = await getCompanySponsorDataById(id);
        setCompanies(dataUnmapped);
        setCompanyObject(dataUnmapped[0]);
      } catch (error) {
        console.error(
          "Erro ao buscar os dados da tabela CompanySponsor:",
          error
        );
      }
    }

    fetchCompanySponsorData();
  }, []);

  const country = [
    {
      src: require("../../../flag/united-states.png"),
      country: "united States",
    },
    { src: require("../../../flag/canada.png"), country: "canada" },
    { src: require("../../../flag/brazil.png"), country: "brazil" },
    { src: require("../../../flag/china.png"), country: "china" },
    { src: require("../../../flag/germany.png"), country: "germany" },
    { src: require("../../../flag/japan.png"), country: "japan" },
    {
      src: require("../../../flag/united-kingdom.png"),
      country: "united kingdom",
    },
    { src: require("../../../flag/france.png"), country: "france" },
    { src: require("../../../flag/netherlands.png"), country: "netherlands" },
    { src: require("../../../flag/belgium.png"), country: "belgium" },
    { src: require("../../../flag/india.png"), country: "india" },
    { src: require("../../../flag/vietnam.png"), country: "vietnam" },
    { src: require("../../../flag/turkey.png"), country: "turkey" },
  ];
  const [png, setPng] = useState(null);

  useEffect(() => {
    country.forEach((item) => {
      if (companyObject.companyN == item.country) {
        setPng(item.src);
        return;
      }
    });
  }, []);
  
  return (
    <>
      {auth ? (
        <ContainerHome>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={toggleDrawer ? 2 : 1}>
              <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
            </Grid>
            <Grid sx={{ marginLeft: "75px", marginTop: "20px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  style={{ width: "64px", height: "64px", marginRight: "10px" }}
                  src={png}
                  alt="Company Logo"
                />
                <TextDefault color={"#4b4b4b"} size={"32px"}>
                  {companies[0]?.fantasy} -{" "}
                  <Chip
                    label={companyObject.activity}
                    color="primary"
                    size="small"
                  />
                </TextDefault>
              </div>

              <CompanyDetails data={companyObject} />

              <Grid container spacing={2}>
                {companies.map((company) =>
                  Object.entries(company.myProducts).map(([hsCode, hsData]) => (
                    <Grid item xs={4} marginLeft={6} key={hsCode}>
                      <Product
                        title={hsData.hsName}
                        value={hsCode}
                        src={HsIcon}
                      />
                    </Grid>
                  ))
                )}
              </Grid>
            </Grid>
          </Grid>
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
