import styled, { keyframes, css } from "styled-components";
import mapaMundi from "../icons/mapaMundi.jpg";
import mapaR from "../icons/mapaR.png";
import logoDrawer from "../icons/T-SaleMetals-03.png";
import Next from "../icons/next.png";
import Up from "../icons/up.png";
import logoBranca from "../icons/newlogo.png";
import ResponsiveMapping from "../components/ResponsiveMapping";
const { size } = ResponsiveMapping();

const slideOut = keyframes`
  from {
    width: 250px;
  } to {
    width: 40px;
  }
`;

const slideIn = keyframes`
  from {
    width: 40px;
  } to {
    width: 250px;
  }
`;

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.main[500]};
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
export const ClearTable = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light[100]};
  padding: 10px;
  border-radius: 6px;

  &:hover {
    background-color: #ffc6c6;
  }
`;
export const EditTable = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.light[100]};
  padding: 10px;
  border-radius: 6px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.main[200]};
  }
`;
export const ContainerLoading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 40000;
  background-color: ${({ theme }) => theme.colors.main[500]};
  display: flex;
  height: 100dvh;
  width: 100dvw;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const ContainerWhite = styled.div`
  background-color: #fff;
  display: flex;
  height: 100vh;
`;

export const MapaMundi = styled.div`
  width: 610px;
  height: 490px;
  background-image: url(${mapaMundi});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 20px 0 0 20px;
`;

export const LogoDrawer = styled.img`
  width: ${(props) => (props.size ? props.size : "95px")};
  height: ${(props) => (props.size ? props.size : "95px")};
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
`;
export const CarouselImage = styled.img`
  width: 99%;
  height: 200px;
  border-radius: 8px;
`;

export const ItemCarousel = styled.div`
  width: 100%;
`;
export const CarouselContent = styled.div`
  position: absolute;
`;
export const BtnBanner = styled.div`
  width: 10%;
  height: 50px;
  justify-content: center;
  align-items: center;
  display: flex;
`;
export const IsometricBanner = styled.img`
  width: 350px;
  height: 250px;
`;
export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Form = styled.div`
  width: 400px;
  height: 490px;
  background-color: #fff;
  padding: 20px;
  border-radius: 0 20px 20px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const FormRegister = styled.div`
  width: 400px;
  height: 590px;
  background-color: #fff;
  padding: 20px;
  border-radius: 20px 0 0 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const MapaMundiR = styled.div`
  width: 610px;
  height: 590px;
  background-image: url(${mapaR});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 0 20px 20px 0;
`;

export const ContainerForm = styled.div`
  width: 80%;
  padding-top: 5px;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const FormTitle = styled.h2`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.main[500]};
  font-size: bold;
  font-size: 35px;
`;
export const ContainerWithMap = styled(Container)`
  flex: 1;
`;
export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }) => theme.colors.main[300]};
  width: 100%;
  font-size: 13px;
`;
export const CustomLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.main[200]};
  cursor: pointer;
`;
export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ContainerHome = styled(ContainerWhite)`
  display: flex;
  overflow-x: hidden;
  flex-direction: column;
  flex: 1;
`;
export const DrawerModern = styled.div`
  display: flex;
  width: 250px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.dark[950]};
  margin: 0;
  align-items: center;
  flex-direction: column;

  position: fixed;
  z-index: 9999;
  overflow: auto;
  animation: ${slideIn} 0.24s;

  ${({ isLeaving }) =>
    isLeaving &&
    css`
      animation: ${slideOut} 0.24s forwards;

      text,
      div,
      p,
      span {
        display: none;
      }
    `}

  &::-webkit-scrollbar {
    width: 0;
    background-color: transparent;
  }

  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 24px;
    align-items: center;
  }
`;
export const DrawerModernClose = styled.div`
  display: flex;
  width: 40px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.dark[950]};
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  z-index: 9999;
`;
export const CircleLogo = styled.button`
  background-color: #fff;
  width: 90px;
  height: 90px;
  border-radius: 70px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 20px;
  box-shadow: none;
  border: none;
  cursor: pointer;
  transform: scale(1);
  transition: 0.3s;

  :hover {
    transition: 0.3s;
    transform: scale(1.1);
  }
`;
export const CircleLogoClose = styled.button`
  background-color: #fff;
  width: 60px;
  height: 60px;
  border-radius: 70px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-top: 20px;
  margin-left: 40px;
  box-shadow: none;
  border: none;
`;
export const MenuDrawer = styled.div`
  width: 90%;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;
export const WalletDrawer = styled.div`
  background-color: ${({ theme }) => theme.colors.dark[900]};
  width: 90%;
  height: 120px;
  border-radius: 6px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  margin-top: 110%;
`;
export const OptionsDrawer = styled.div`
  width: 90%;
  height: 50px;
  margin-top: 10px;
  justify-content: "flex-start";
  align-items: center;
  display: flex;
  padding: 2px 10px 2px 10px;
`;
export const IconOpt = styled.div`
  width: 35px;
  height: 35px;
  background-color: ${({ theme }) => theme.colors.main[500]};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-right: 20px;
`;
export const ImgOpt = styled.img`
  width: ${(props) => props.width || "16px"};
  height: ${(props) => props.height || "16px"};
`;
export const TxtOpt = styled.text`
  color: #fff;
  font-size: 16;
  font-weight: bold;
  width: 130px;
`;
export const TxtBalance = styled.text`
  color: ${(props) => (props.color ? props.color : "#fff")};
  font-size: ${(props) => (props.size ? props.size : "15px")};
  font-weight: ${(props) => (props.bold ? props.bold : "bold")};
  filter: ${({ isBlurred }) => (isBlurred ? "blur(4px)" : "blur(0px)")};
  user-select: none;
`;
export const TextDefault = styled.text`
  color: ${(props) => (props.color ? props.color : "#000")};
  font-size: ${(props) => (props.size ? props.size : "15px")};
  font-weight: ${(props) => (props.bold ? props.bold : "bold")};
`;
export const TagColors = styled.div`
  background-color: ${(props) => props.color};
  padding: 5px 15px 5px 15px;
  border-radius: 5px;
`;
export const TextSubMenu = styled.text`
  color: #fff;
  font-size: 13px;
  cursor: pointer;
  padding: 10px;
  width: 90%;
  border-radius: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.main[500]};
  }
`;
export const ArrowOpt = styled.div`
  width: 20px;
  height: 20px;
  background-image: ${(props) =>
    props.iconSt ? `url(${Up})` : `url(${Next})`};
  background-repeat: no-repeat;
  background-size: cover;
`;
export const HrDrawer = styled.div`
  width: 90%;
  margin-top: 20px;
`;
export const LineDrawer = styled.div`
  width: 100%;
  height: 0.3px;
  background-color: ${({ theme }) => theme.colors.dark[900]};
  margin-top: 3px;
`;
export const BalanceDrawer = styled.div`
  width: 90%;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.main[500]};
  border-radius: 13px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  position: relative;
`;
export const ContainerPrincing = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;
export const LogoBranca = styled.div`
  width: 100px;
  height: 100px;
  background-image: url(${logoBranca});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 10px 0 0 10px;
  margin-top: 10px;
`;
export const ColumnContainer = styled.div`
  position: relative;
  flex-direction: column;
  display: flex;
`;

export const IconServices = styled.div`
  width: ${(props) => (props.width ? props.width : "400px")};
  height: ${(props) => (props.height ? props.height : "450px")};
  background-image: url(${(props) => props.iconUrl});
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Circle = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.main[400]};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${(props) => props.iconUrl});
  background-size: cover;
  margin-left: 5px;
  margin-right: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

export const SquareImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border-color: "#000";
`;

export const RowContainer = styled.div`
  flex-direction: row;
  display: flex;
`;

export const BarProgress = styled.div`
  width: 176px;
  background-color: #7399fc;
  height: 11px;
  border-radius: 10px;
`;
export const StatesProgress = styled.div`
  width: ${(props) => props.usage ? props.usage+"%" : "0%"};
  background-color: ${(props) => props.usage <= 50 ? "#3BC17A" : props.usage <= 75 ? "#F19120" : "#E93939"};
  height: 100%;
  border-radius: 10px;
  z-index: 99999;
`;

export const RowContainerLeads = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

export const IconTextContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const HrDefault = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.light[100]};
  margin-top: 15px;
`;
export const ScrollContainer = styled.div`
  flex-direction: row;
  display: flex;
  max-width: 150%;
  overflow-x: hidden;
  margin-left: -118px;
  padding-left: 135px;
  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    max-width: 8px;
    background-color: ${({ theme }) => theme.colors.gray[200]};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.colors.gray[300]};
  }
  &::-webkit-scrollbar-button {
    display: none;
  }
  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;
export const CarouselContainer = styled.div`
  width: 100%;
  height: 260px;
  transition: 0.2s;
  padding-left: 16px;

  @media screen and (max-width: 1100px) {
    grid-column: 1/-1;
  }
`;
export const TradeMetalContainer = styled.div`
  width: 100%;
  height: 260px;
  margin-top: 40px;
  flex-direction: row;
  display: flex;
`;
export const PanelTrade = styled.div`
  width: 88%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.light[100]};
  border-radius: 6px;
  padding: 15px 0px 0px 20px;
`;
export const ServiceContainer = styled.div`
  width: 100%;
  height: ${size === "md" ? "170px" : "200px"};
  flex-direction: row;
  display: flex;
  padding-bottom: 20px;
  margin-top: -20px;
`;
export const PanelService = styled.img`
  width: 88%;
  height: 100%;
  border-radius: 20px;
  border: none;
  border-width: 0px;
  box-shadow: none;
  margin-left: -10px;
`;
export const FavoriteContainer = styled.div`
  width: 88%;
  height: 540px;
  background-color: ${({ theme }) => theme.colors.light[100]};
  border-radius: 20px;
  margin-top: 30px;
  padding: 15px 0px 0px 20px;
`;
export const BtnNotification = styled.div`
  width: 45px;
  height: 45px;
`;
export const MainSearchInput = styled.input`
  height: 45px;
  width: 60%;
`;
export const TagVariation = styled.div`
  width: 60px;
  height: 30px;
  background-color: ${(props) => props.color};
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const ContainerStay = styled.div`
  // background-color: #f0f0f0;
  width: 75vw;
  border-radius: 25px;
`;

export const ContainerUniqueStay = styled.div`
  background-color: #f0f0f0;
  width: 75vw;
  border-radius: 25px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

export const GroupInput = styled.div`
  width: 100%;
  margin-top: 20px;
`;

export const GroupInputR = styled.div`
  width: 100%;
  margin-top: 15px;
  position: relative;
`;
export const InputDefault = styled.input`
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.light[100]};
  width: 100%;
`;
export const SelectDefaultR = styled.select`
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.light[100]};
  width: 100%;
  height: 50px;
  padding-right: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #8a97aa;
  border-radius: 8px;
`;
export const SelectDefault = styled.select`
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.light[100]};
  width: 100%;
  height: 50px;
  padding-right: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #4b4b4b;
`;
export const OptionImg = styled.option`
  background-repeat: no-repeat;
  padding-left: 10px;
`;
export const ContainerErroLogin = styled.div`
  width: 350px;
  height: 100px;
  position: fixed;
  justify-content: center;
  align-items: center;
  display: flex;
  z-index: 9999;
`;
export const NewsContainer = styled.div`
  width: 88%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.light[100]};
  padding: 15px 0px 0px 20px;
  margin-top: 40px;
  border-radius: 20px;
`;
export const CardFlagCountry = styled.div`
  width: 90%;
  height: 80px;
  padding-left: 20px;
  border-radius: 20px;
  margin-top: 20px;
  align-items: center;
  display: flex;
`;
export const FlagCountry = styled.img`
  width: 70px;
  height: 70px;
`;
export const ImgDefault = styled.img`
  width: ${(props) => (props.width ? props.width : "50px")};
  height: ${(props) => (props.height ? props.height : "50px")};
`;
export const BallNotification = styled.div`
  width: ${(props) => props.size || "12px"};
  height: ${(props) => props.size || "12px"};
  border-radius: 50%;
  background-color: ${(props) => props.color || "#366dfb"};
`;

export const ContainerBtnNextSolutions = styled.div`
  position: fixed;
  bottom: 0;
  background-image: linear-gradient(to bottom, transparent, #fff);
  width: 100%;
  height: 100px;
  z-index: 1;
  justify-content: flex-end;
  align-items: flex-end;
  display: flex;
  margin-left: 23.5px;
`;
export const ContainerBtnNext = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  z-index: 1;
  justify-content: flex-end;
  align-items: flex-end;
  display: flex;
  background-color: ${({ theme }) => theme.colors.danger.main};
`;
export const BtnNextSolutions = styled.div`
  width: 160px;
  height: 45px;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 10px;
  color: ${(props) => props.color || "#fff"};
  background-color: ${(props) => props.color || "#fff"};
  margin-right: 40px;
  margin-bottom: 40px;
  cursor: pointer;

  &:hover {
    background-color: #efefef;
  }
`;
export const BtnCancelSolutions = styled.div`
  width: 50px;
  height: 45px;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 10px;
  color: ${(props) => props.color || "#fff"};
  background-color: ${(props) => props.color || "#fff"};
  margin-right: 40px;
  margin-bottom: 40px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.danger.main};
  }
`;
export const CardHsCode = styled.div`
  width: 90%;
  height: 80px;
  padding-left: 20px;
  border-radius: 20px;
  margin-top: 20px;
  align-items: center;
  display: flex;
  transition: all 0.05s;
`;
export const BackIconProduct = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.light[100]};
  justify-content: center;
  align-items: center;
  display: flex;
`;
export const ImgIconProduct = styled.img`
  width: 60px;
  height: 60px;
`;
export const TagBlue = styled.div`
  width: 45px;
  height: 15px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: ${({ theme }) => theme.colors.main[500]};
`;
export const TagTable = styled.div`
  width: 95%;
  background-color: ${({ theme }) => theme.colors.main[500]};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: bold;
`;
export const CardDefault = styled.div`
  width: ${(props) => (props.width ? props.width : "100%")};
  background-color: ${(props) => (props.bkgColor ? props.bkgColor : "#e9edf8")};
  height: ${(props) => (props.height ? props.height : "150px")};
  border-radius: ${(props) => (props.radius ? props.radius : "20px")};
`;
export const ContainerCardDashboard = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`;
export const GroundCircleDefault = styled.div`
  width: ${(props) => (props.width ? props.width + "px" : "50px")};
  height: ${(props) => (props.height ? props.height + "px" : "50px")};
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: #fff;
  border-radius: ${(props) => (props.width ? props.width / 2 + "px" : "25px")};
`;
export const CardSMH = styled.div`
  width: ${(props) => (props.width ? props.width + "px" : "280px")};
  height: ${(props) => (props.height ? props.height + "px" : "150px")};
  display: flex;
  background-color: ${({ theme }) => theme.colors.light[100]};
  border-radius: ${(props) => (props.width ? props.width / 2 + "px" : "25px")};
  padding: 20px;
`;
export const BtnDefault = styled.button`
  border: none;
  border-radius: ${(props) => (props.borderR ? props.borderR : "15px")};
  background-color: ${(props) =>
    props.color ? props.color : props.theme.colors.main[500]};
  color: #fff;
  font-weight: bold;
  padding: ${(props) => props.padding || "10px 20px"};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  width: ${(props) => (props.width ? props.width : "auto")};
  margin-top: ${(props) => props.marginTop || "0"};
  margin-left: ${(props) => props.marginLeft || "0"};
  height: ${(props) => props.height || "45px"};
  font-size: 20px;

  &:hover {
    background-color: ${(props) =>
      props.hoverColor ? props.hoverColor : props.theme.colors.main[500]};
  }
`;

export const NewsBox = styled.div`
  width: 20%;
  flex: 1;
`;
export const BackgrBtnScrollRight = styled.div`
  width: 250px;
  height: 150px;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    white 100%
  );
  position: absolute;
  z-index: 999;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
`;
export const BackgrBtnScrollLeft = styled.div`
  width: 250px;
  height: 150px;
  background-image: linear-gradient(
    to left,
    rgba(255, 255, 255, 0) 0%,
    white 100%
  );
  position: absolute;
  z-index: 999;
  left: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
`;
export const CardContainer = styled.div`
  width: 250px;
  height: 150px;
  background-color: ${({ theme }) => theme.colors.light[100]};
`;
export const CompleteMenu = styled.div`
  width: 90%;
  background-color: ${({ theme }) => theme.colors.main[500]};
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  flex-direction: column;
  display: flex;
  padding-left: 35px;
  padding-top: 0px;
  padding-bottom: 20px;
`;
export const CardForgot = styled.div`
  width: 25%;
  height: 52%;
  border-radius: 20px;
  background-color: #fff;
  padding: 50px;
`;
export const CardCompany = styled.div`
  width: 100%;
  height: ${(props) => (props.height ? props.height : "100%")};
  border-radius: 20px;
  background-color: ${(props) =>
    props.color ? props.color : props.theme.colors.light[100]};
  display: flex;
`;
export const CircleDefault = styled.div`
  width: ${(props) => (props.size ? props.size + "px" : "20px")};
  height: ${(props) => (props.size ? props.size + "px" : "20px")};
  background-color: ${(props) => (props.color ? props.color : "#fff")};
  border-radius: ${(props) => (props.size ? props.size / 2 + "px" : "10px")};
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const IconHistory = styled.div`
  width: ${(props) => (props.size ? props.size + "px" : "60px")};
  height: ${(props) => (props.size ? props.size + "px" : "60px")};
  background-color: ${({ theme }) => theme.colors.main[500]};
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const CardForm = styled.div`
  width: 95%;
`;
export const IndicatorCard = styled.div`
  width: 90%;
  background-color: ${({ theme }) => theme.colors.light[100]};
  height: 150px;
  border-radius: 4px;
  display: flex;
  justify-content: center;

  .barColor {
    width: 90%;
    height: 4px;
    background-color: ${(props) =>
      props.color ? props.color : `${props.theme.colors.main[500]}`};
  }
`;
export const ContainerTable = styled.div`
  width: 100%;
  margin-top: 30px;
`;
export const BackgrNut = styled.div`
  width: 45px;
  height: 45px;
  background-color: ${({ theme }) => theme.colors.main[500]};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
`;
export const BarTrade = styled.div`
  width: 97%;
  height: 30px;
  background-color: ${({ theme }) => theme.colors.gray[950]};
  border-radius: 6px;
  margin-top: 30px;
  margin-left: 20px;
`;
export const ContainerModal = styled.div`
  width: 350px;
  max-height: 400px;
  background-color: #fff;
  position: absolute;
  top: 60px;
  z-index: 999999;
  border-radius: 4px;
  overflow: auto;
  padding: 15px;
  box-shadow: 2px 5px 10px 2px #bababa;
`;
export const BackgroundClose = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 99999;
`;
