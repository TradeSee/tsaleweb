import styled from "styled-components";

export const ContainerPdf = styled.div `
display: none;

  @media print {
    display: block;

    @page {
      margin: 0;
      padding: 0;
      /* size: A4 portrait; */
      break-before: always;
    }
  }
`;

export const LogoPdf = styled.img`
  width: ${(props) => (props.size ? props.size : "95px")};
  height: ${(props) => (props.size ? props.size : "95px")};
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Rectangle = styled.div`
  background-color: #030637;
  width: 100%;
  padding: 20px; 
  color: white;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  align-items: center;
`;

export const LeftText = styled.span`
  margin-right: auto;
`;

export const RightText = styled.span`
  margin-left: auto;
`;

export const ContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  margin-left: 12px;
  > div {
    display: flex;
    align-items: center;
  }
`;

export const InfoTitle = styled.span`
  font-weight: bold;
  font-size: 18px;
  margin-top: 8px;
`;

export const InfoValue = styled.span`
font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 100%;   
  margin-left: 5px;
`;