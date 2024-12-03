import React, { useEffect, useState } from "react";
import {
  ContainerHome,
  TextDefault,
  MainSearchInput,
} from "../../../assets/styles";
import Drawer from "../../../components/Drawer";
import { Divider, Grid, List, ListItem, Typography } from "@mui/material";
import ButtonBlue from "../../../components/myButton";
import { Link, useNavigate } from "react-router-dom";
import { authScreen } from "../../../contexts/auth";
import LoadingPage from "../../../components/LoadingPage";
import { getCompanySponsorData } from "../../../hooks/sponsor";
import CompanyMapper from "../utils/mapper";
import Partner from "../components/Partner";

export default function ListSponsor() {
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [companies, setCompanies] = useState([]);

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

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const buscar = () => {
    if (searchValue !== "") {
      const props = {
        search: searchValue,
      };
      navigate(`/market-intelligence-list/${searchValue}`);
    } else {
      console.log("erro");
    }
  };

  useEffect(() => {
    async function fetchCompanySponsorData() {
      try {
        const dataUnmapped = await getCompanySponsorData();
        const mappedData = dataUnmapped.map((company) =>
          CompanyMapper(company)
        );

        setCompanies(mappedData);
      } catch (error) {
        console.error(
          "Erro ao buscar os dados da tabela CompanySponsor:",
          error
        );
      }
    }

    fetchCompanySponsorData();
  }, []);

  const loading = () => {
    return <Typography variant="body1">carregando</Typography>;
  };

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
              <TextDefault color={"#4B4B4B"} size={"32px"}>
                {" "}
                International Sponsor
              </TextDefault>
              <br />
              <TextDefault color={"#8a97aa"} size={"18px"} bold={"400"}>
                You can search by the name of the company or choosing one from
                the list.
              </TextDefault>

              <MainSearchInput
                className="mainSearch"
                name="text"
                placeholder="Find a company by name"
                type="search"
                style={{ marginRight: 5 }}
                value={searchValue}
                onChange={handleInputChange}
              />
              <ButtonBlue width="100px" onClick={buscar}>
                Search
              </ButtonBlue>
              <List>
                {companies.map((item, index) => (
                  <div key={index}>
                    <ListItem>
                      <Link
                        to={`/international-sponsor-single/${item?.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Partner data={item} />
                      </Link>
                    </ListItem>
                    {index < companies.length - 1 && (
                      <Divider style={styles.viewHrV} />
                    )}
                  </div>
                ))}
              </List>
            </Grid>
          </Grid>
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}

const styles = {
  viewHrV: {
    margin: "8px 0", // Adapte o espaçamento vertical conforme necessário
  },
};
