import React, { useEffect, useLayoutEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

import {
  ArrowOpt,
  BalanceDrawer,
  CircleLogo,
  CircleLogoClose,
  ColumnContainer,
  CompleteMenu,
  ContainerScrollX,
  DrawerModern,
  DrawerModernClose,
  HrDrawer,
  IconOpt,
  ImgOpt,
  LineDrawer,
  LogoDrawer,
  MenuDrawer,
  OptionsDrawer,
  RowContainer,
  TextDefault,
  TextSubMenu,
  TxtBalance,
  TxtOpt,
  WalletDrawer,
} from "../assets/styles";

import MenuIcon from "../icons/menu.png";
import MyIntelIcon from "../icons/folder.png";
import SanctionsIcon from "../icons/global.png";
import CompanyIcon from "../icons/business-and-trade.png";
import HomeIcon from "../icons/homeIcon.png";
import ReportIcon from "../icons/relatorio.png";
import SettingsIcon from "../icons/setting.png";
import LogoutIcon from "../icons/logout-red.png";
import BillingIcon from "../icons/credit-card.png";
import { authScreen, logout } from "../contexts/auth";
import getUserInfo from "../hooks/getUsers";
import {
  addCredit,
  deleteCredit,
  registerAdd,
  registerPlan,
  viewAddMonthly,
  viewCredit,
  viewPlanMonthly,
} from "../hooks/credits";
import iconLogo from "../icons/T-SaleMetals-03.png";
import ResponsiveMapping from "./ResponsiveMapping";
import useAnimatedUnmount from "../hooks/useAnimatedUnmount";
import WebIcon from "../icons/webIcon.png";
import UserIcon from "../icons/userIcon.png";
import AllModal from "./AllModal";
import Consumption from "./Consumption";

const { size } = ResponsiveMapping();

export default function Drawer({ handleToggle, initState, isFixed }) {
  const [stateDrawer, useStateDrawer] = useState(initState);
  const [blurValues, setBlurValues] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isUsage, setIsUsage] = useState(0);

  //Menu
  const [menuTI, setMenuTI] = useState(false);
  const [menuCS, setMenuCS] = useState(false);
  const [menuMC, setMenuMC] = useState(false);
  const [menuS, setMenuS] = useState(false);

  const navigate = useNavigate();
  function ModIsStateDrawer() {
    useStateDrawer(!stateDrawer);
    handleToggle(!stateDrawer);
  }

  const openNewTab = (path) => {
    window.open(path, "_blank");
  };

  const exit = () => {
    navigate("/");
    logout();
  };

  async function blurAndUpdate() {
    setBlurValues((prevState) => !prevState);
    const userCredits = await viewCredit(userInfo?.uid);
    setCredits(userCredits);
  }

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    authScreen().then((res) => {
      if (res) {
        setTimeout(() => {
          setAuth(true);
        }, 2000);
      }
    });
  });

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
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

  const [credits, setCredits] = useState(null);

  useEffect(() => {
    if (userInfo) {
      const fetchCredits = async () => {
        try {
          const userCredits = await viewCredit(userInfo?.uid);
          const userPlan = await viewPlanMonthly(userInfo?.uid);
          const userAdd = await viewAddMonthly(userInfo?.uid);

          console.log("Saldo");
          console.log(userCredits);
          console.log("Plano");
          console.log(userPlan);

          if (userPlan + userCredits >= userCredits) {
            let percent = (userCredits / (userPlan + userAdd)) * 100;
            let usagePercent = 100 - percent;
            setIsUsage(parseInt(usagePercent));
          } else {
            if (userCredits > 650) {
              await deleteCredit(userInfo?.uid, userCredits);
              await addCredit(userInfo?.uid, 620);

              //migração de sistema de consumo
              await registerPlan(userInfo?.uid, 600);
              await registerAdd(userInfo?.uid, 20);
            } else {
              //migração de sistema de consumo
              await registerPlan(userInfo?.uid, 100);
              await registerAdd(userInfo?.uid, 0);
            }
          }

          setCredits(userCredits);
        } catch (error) {
          console.error("Erro ao buscar os créditos do usuário:", error);
        }
      };

      fetchCredits();
    }
  }, [userInfo]);

  const { shouldRender, animatedElementRef } = useAnimatedUnmount(stateDrawer);

  const roleUser = userInfo?.userData?.role;
  return (
    <>
      <AllModal
        visible={isLogoutModalVisible}
        title={"Already Leaving?"}
        message={"You are logging out, are you sure?"}
        type={"logout"}
        onConfirm={exit}
        onCancel={() => setIsLogoutModalVisible(false)}
      />

      {shouldRender ? (
        <DrawerModern
          style={{ width: size === "sm" ? 220 : 250 }}
          isLeaving={!stateDrawer}
          ref={animatedElementRef}
        >
          <header>
            <CircleLogo disabled={isFixed} onClick={ModIsStateDrawer}>
              <LogoDrawer src={iconLogo} />
            </CircleLogo>

            <RowContainer>
              <TextDefault color={"#fff"} size={"24px"}>
                T-Sale Metals
              </TextDefault>
              <TextDefault color={"#fff"} size={"11px"} bold={"400"}>
                ®
              </TextDefault>
            </RowContainer>
          </header>

          <MenuDrawer>
            <OptionsDrawer
              noBeet={true}
              className="optDrewar"
              onClick={() => navigate("/home")}
            >
              <IconOpt>
                <ImgOpt src={HomeIcon} />
              </IconOpt>
              <TxtOpt>Home</TxtOpt>
            </OptionsDrawer>

            <OptionsDrawer
              className={"optDrewar"}
              onClick={() => openNewTab("/trade-data")}
            >
              <IconOpt>
                <ImgOpt src={MenuIcon} />
              </IconOpt>
              <TxtOpt>Trade Data</TxtOpt>
            </OptionsDrawer>

            <OptionsDrawer
              className={"optDrewar"}
              onClick={() => openNewTab("/market-intelligence")}
            >
              <IconOpt>
                <ImgOpt src={WebIcon} />
              </IconOpt>
              <TxtOpt>Market Intelligence</TxtOpt>
            </OptionsDrawer>

            <OptionsDrawer
              className={"optDrewar"}
              onClick={() => openNewTab("/leadsenrichment")}
            >
              <IconOpt>
                <ImgOpt src={UserIcon} />
              </IconOpt>
              <TxtOpt>Leads Enrichment</TxtOpt>
            </OptionsDrawer>

            {/*<OptionsDrawer
              className="optDrewar"
              onClick={() => openNewTab("/reports")}
            >
              <IconOpt>
                <ImgOpt src={ReportIcon} />
              </IconOpt>
              <TxtOpt>Reports</TxtOpt>
              <ArrowOpt />
            </OptionsDrawer>*/}

            <OptionsDrawer
              className={menuS ? "optDrewarOpen" : "optDrewar"}
              onClick={() => setMenuS(!menuS)}
            >
              <IconOpt>
                <ImgOpt src={SettingsIcon} />
              </IconOpt>
              <TxtOpt>Settings</TxtOpt>
              <ArrowOpt iconSt={menuS} />
            </OptionsDrawer>
            {menuS ? (
              <CompleteMenu>
                <TextSubMenu onClick={() => navigate("/profile")}>
                  Profile
                </TextSubMenu>
                <TextSubMenu onClick={() => navigate("/billing")}>
                  Billing
                </TextSubMenu>
                <TextSubMenu onClick={() => navigate("/credits")}>
                  Subscription & Credits
                </TextSubMenu>
                {roleUser === "admin" ? (
                  <>
                    <TextSubMenu onClick={() => openNewTab("/marketing")}>
                      Marketing
                    </TextSubMenu>
                    <TextSubMenu onClick={() => openNewTab("/analytics")}>
                      Analytics
                    </TextSubMenu>
                    <TextSubMenu onClick={() => openNewTab("/logscontrol")}>
                      Logs Control
                    </TextSubMenu>
                  </>
                ) : (
                  <> </>
                )}
                <TextSubMenu onClick={() => setIsLogoutModalVisible(true)}>
                  Logout
                </TextSubMenu>
              </CompleteMenu>
            ) : (
              ""
            )}
          </MenuDrawer>

          <WalletDrawer>
            <TxtBalance
              size={"12px"}
              bold={"100"}
              style={{
                marginTop: 15,
                textAlign: "center",
                width: "85%",
                lineHeight: 1.3,
                marginBottom: 10,
              }}
            >
              Use credits to access tools and information.
            </TxtBalance>
            <BalanceDrawer className="balanceEffect" onClick={blurAndUpdate}>
              <ColumnContainer
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 13,
                }}
              >
                <RowContainer style={{ width: "100%" }}>
                  <Consumption usage={isUsage} />
                </RowContainer>
              </ColumnContainer>
            </BalanceDrawer>
          </WalletDrawer>
        </DrawerModern>
      ) : (
        <DrawerModernClose>
          <CircleLogoClose onClick={ModIsStateDrawer}>
            <LogoDrawer src={iconLogo} size={"60px"} />
          </CircleLogoClose>
        </DrawerModernClose>
      )}
    </>
  );
}
