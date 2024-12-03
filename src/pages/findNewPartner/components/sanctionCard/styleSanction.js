import styled from "styled-components";

export const StyledRectangle = styled.div`
  width: 1250px;
  height: 100px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #EEEEEE;
  border-radius: 8px;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoItem = styled.div`
  margin-bottom: 5px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ButtonPdf = styled.button`
  background-color: #e9edf8;
  color: #8a97aa;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
`;

export const ButtonAction = styled.button`
  background-color: #fff;

  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  margin-right: 20px;
  cursor: pointer;
`;

export const PillScore = styled.div`
  width: 90px;
  height: 30px;
  background-color: #e93939;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
`;
