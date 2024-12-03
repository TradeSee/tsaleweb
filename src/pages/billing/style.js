import styled from "styled-components";
import SponsorIcon from "../../icons/sponsorIc.png";
import CreditsIcon from "../../icons/boxCredit.png";

export const Container = styled.div`
  display: grid;
  width: 80%;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 24px;
`;

export const BoxBilling = styled.div`
  position: relative;
  //width: 100%;
  width: 600px;
  height: 350px;
  padding: 20px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;

  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
  z-index: 0;

  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
    align-self: flex-end;
    margin-top: 44px;
    width: 60%;
    height: 250px;
    background-color: #fff;
  }
`;

export const BoxImg = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  width: 220px;
  height: 350px;
  background-image: url(${SponsorIcon});
  padding: 20px;
  border-radius: 20px 20px 20px 20px;
  display: flex;
  align-items: center;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

export const BoxBillingC = styled.div`
  position: relative;
  //width: 100%;
  width: 600px;
  height: 350px;
  padding: 20px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-self: end;
  justify-self: end;

  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
  z-index: 0;

  .content {
    display: flex;
    align-items: center;
    flex-direction: column;
    align-self: flex-end;
    margin-top: 44px;

    width: 60%;
    height: 250px;
    background-color: #fff;
  }
`;

export const BoxCreditImg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 220px;
  height: 350px;
  background-image: url(${CreditsIcon});
  padding: 20px;
  border-radius: 20px 20px 20px 20px;
  display: flex;
  align-items: center;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const ImgSponsor = styled.div`
  width: 220px;
  height: 250px;
  background-image: url(${SponsorIcon});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 0 20px 20px 0;
`;

export const CustomButton = styled.button`
  background-color: ${({ theme }) => theme.colors.main[500]};
  color: #fff;
  padding: 8px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
`;

export const BillingButton = styled.button`
  background-color: ${({ theme }) => theme.colors.button.main};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.button.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.button.active};
  }
`;
