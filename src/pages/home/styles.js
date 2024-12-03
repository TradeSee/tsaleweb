import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  margin-top: 0.75rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1.4fr;
  grid-template-rows: 3.75rem 12.5rem 16.25rem 8.75rem 13.125rem;
  column-gap: 1.75rem;
  row-gap: 0.75rem;
  margin-right: 1rem;

  @media screen and (max-width: 81.25rem) {
    grid-template-rows: 3.75rem 12.5rem 16.25rem 8.75rem 13.125rem 1fr;
  }
`;

export const Header = styled.header`
  grid-row: 1;
  grid-column: 1/-1;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 1.75rem;
  align-items: center;
`;

export const Notifications = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  position: relative;
  align-self: center;
  margin-top: 20px;
`;
export const TagNotification = styled.div`
  width: 17px;
  height: 17px;
  background-color: #E93939;
  position: absolute;
  z-index: 999999;
  top: 0;
  border-radius: 50%;
  
`;

export const NotificationBtn = styled.div`
  width: 3.125rem;
  height: 3.125rem;
`;

export const FavoriteMetals = styled.section`
  flex-direction: row;
  display: flex;
  transition: 0.2s;
  margin-top: -0.9rem;
  .swiper {
    height: 15rem;
    transition: 0.2s;
  }

  .swiper-slide {
    height: 11.875rem;
    transition: 0.2s;
  }

  @media screen and (max-width: 81.25rem) {
    grid-column: 1/-1;
  }
`;

export const DeleteMetalButton = styled.button`
  position: absolute;
  right: 0.75rem;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  z-index: 20;

  :hover {
    background-color: #d4dbf1;
    border-radius: 100%;
  }
`;

export const NewsContainer = styled.section`
  flex-direction: row;
  height: 29rem;
  display: flex;
  transition: 0.2s;
  margin-top: -2.1875rem;

  .swiper {
    height: 10rem;
    transition: 0.2s;
  }

  .swiper-slide {
    height: 7.5rem;
    transition: 0.2s;
  }

  @media screen and (max-width: 81.25rem) {
    grid-column: 1/-1;
  }
`;

export const ServicesContainer = styled.section`
  grid-column: 1/5;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 24px;
  height: 12.5rem;
  transition: 0.2s;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: -1.5625rem;

  .swiper {
    grid-column: 1/-1;
    height: 11.875rem;
    transition: 0.2s;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  .swiper-slide {
    height: 10rem;
    transition: 0.2s;
    width: 100%;
    max-width: 25rem;
    padding: 0;
    margin: 0;
  }

  @media screen and (max-width: 81.25rem) {
    grid-column: 1/-1;
    margin-top: 0;
    column-gap: 0;
    padding: 0;
    height: 12.5rem;
    margin-bottom: 1.5rem;
  }
`;

export const Service = styled.article`
  border-width: 0rem;
  display: flex;
  justify-content: center;
  position: relative;

  img {
    width: 70%;
    height: auto;
    max-height: 14.375rem;
  }

  @media screen and (max-width: 81.25rem) {
    img {
      height: 5rem;
    }
  }
`;

export const CardServiceMinimal = styled.div`
  background-color: #e9edf8;
  width: 100%;
  height: 95%;
  border-radius: 0.375rem;

  h3 {
    color: #4b4b4b;
    line-height: 16px;
    margin: 0;
  }

  p {
    display: -webkit-box;
    color: #8a97aa;
    font-weight: 700;
    max-width: 60%;
    font-size: 0.75rem;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    padding: 0;
    margin: 8px 0;
  }

  span {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.main[500]};
  }

  @media screen and (max-width: 81.25rem) {
    width: 100%;

    padding: 0 24px;
  }
`;

export const FavoriteCompaniesContainer = styled.section`
  background-color: #e9edf8;
  border-radius: 0.375rem;
  padding: 0.9375rem 0rem 0.5rem 1.25rem;
  transition: 0.2s;
  z-index: 9999;
  margin-top: 10px;

  ::-webkit-scrollbar {
    width: 0.375rem;
  }

  @media screen and (max-width: 81.25rem) {
    grid-column: 1/-1;
    grid-row: 5;
    overflow: hidden;
  }
`;

export const FavoriteCompanies = styled.div`
  height: 100%;
  max-width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  margin-top: 25px;

  &::-webkit-scrollbar-track {
    background: #e9edf8;
  }
`;
export const ContainerCardModule = styled.div`
  width: 100%;
`;

export const SponsorContainer = styled.section`
  grid-row: 4 / 6;
  grid-column: 5;
  width: 100%;
  margin-bottom: 1.5rem;
  border-radius: 0.375rem;
  border: 0.0625rem solid #5d5d5d40;
  cursor: pointer;
  transition: 0.2s;

  header {
    background-color: ${({ theme }) => theme.colors.main[500]};
    padding: 1rem;
    border-radius: 0.375rem 0.375rem 0 0;

    img {
      width: 100%;
      height: auto;
      max-height: 8.75rem;
    }
  }

  section {
    text-align: center;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    height: 45%;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  h2 {
    color: ${({ theme }) => theme.colors.main[500]};
    line-height: 1.25rem;
  }

  p {
    color: #4b4b4b;
    width: 95%;
    font-size: 0.875rem;
  }

  @media screen and (max-width: 81.25rem) {
    display: none;
  }
`;
export const ContainerModalCenter = styled.div`
  width: 57.5%;
  height: 350px;
  background-color: #fff;
  border-radius: 6px;
  padding: 20px 0px 0px 50px;
  overflow-y: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const ContainerSeachHome = styled.div`
  width: 57.5%;
  height: 540px;
  background-color: #e9edf8;
  margin-top: 71px;
  margin-left: 17.5%;
  border-radius: 6px;
  padding: 0px 15px 0px 15px;
  overflow-y: auto;

  @media only screen and (max-width: 1400px) {
    width: 56.1%;
    height: 540px;
    margin-left: 17.8%;
  }
`;
export const ContainerFirstLogin = styled.div`
  width: 57.5%;
  height: 440px;
  background-color: #fff;
  top: 20%;
  left: 25%;
  border-radius: 6px;
  padding: 0px 15px 0px 15px;
  overflow-y: auto;
  position: absolute;

  @media only screen and (max-width: 1400px) {
    width: 56.1%;
    height: 540px;
    margin-left: 17.8%;
  }
`;
export const ContainerNotificationHome = styled.div`
  width: 57.5%;
  height: 540px;
  background-color: #e9edf8;
  border-radius: 6px;
  padding: 0px 15px 0px 15px;
  overflow-y: auto;
  margin-left: ${(props) => (props.maxWidth-400)+"px" || "50px"};
  margin-top: 90px;

  @media only screen and (max-width: 1400px) {
    width: 56.1%;
    height: 540px;
    margin-left: 17.8%;
  }
`;
