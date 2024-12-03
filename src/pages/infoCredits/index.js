import React, { useEffect, useState } from "react";
import { ContainerHome, IconServices, TextDefault } from "../../assets/styles";
import Drawer from "../../components/Drawer";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import { authScreen } from "../../contexts/auth";
import { Space, Table, Tag } from "antd";
import CoinBalance from "../../icons/coinBalance.png";

const columns = [
  {
    title: "Solution",
    dataIndex: "solution",
    key: "solution",
    render: (text) => <a>{text}</a>,
    width: 200,
  },
  {
    title: "Credits",
    dataIndex: "credits",
    key: "credits",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: 250,
  },
];
const data = [
  {
    key: "1",
    solution: "Find New Partner",
    credits: 5,
    action: "Search",
  },
  {
    key: "2",
    solution: "Find New Partner",
    credits: 1,
    action: "More Info",
  },
  {
    key: "3",
    solution: "Find New Partner",
    credits: 1,
    action: "Favorite Partner",
  },
  {
    key: "4",
    solution: "Metal Price",
    credits: 5,
    action: "Search",
  },
  {
    key: "5",
    solution: "Metal Price",
    credits: 1,
    action: "Favorite Metal Price",
  },
  {
    key: "6",
    solution: "LME",
    credits: 0,
    action: "Search",
  },
  {
    key: "7",
    solution: "Sustainability",
    credits: 0,
    action: "View Result",
  },
  {
    key: "8",
    solution: "Simulator",
    credits: 0,
    action: "Simulation",
  },
  {
    key: "9",
    solution: "Simulator",
    credits: 0,
    action: "Save simulation",
  },
  {
    key: "12",
    solution: "My Products",
    credits: 0,
    action: "Add/Edit/Delete",
  },
  {
    key: "13",
    solution: "My Company",
    credits: 0,
    action: "Register",
  },
  {
    key: "14",
    solution: "Highlights",
    credits: 0,
    action: "-",
  },
];

export default function InfoCredits() {
  const [auth, setAuth] = useState(false);
  const [toggleDrawer, useTroggleDawer] = useState(false);
  const navigate = useNavigate();

  function SetToggle(state) {
    useTroggleDawer(state);
    console.log(state);
  }

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
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "75px",
                marginTop: "30px",
              }}
            >
              <TextDefault color={"#4b4b4b"} size={"32px"}>
                Info Credits
              </TextDefault>
              <br />
              <TextDefault color={"#4b4b4b"} size={"12px"}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been...
              </TextDefault>
              <div
                style={{
                  display: "flex",
                  height: "99dvh",
                }}
              >
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={{
                    pageSize: 13,
                    responsive: true,
                    hideOnSinglePage: true,
                  }}
                />
                <IconServices iconUrl={CoinBalance} />
              </div>
            </Grid>
          </Grid>
        </ContainerHome>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
