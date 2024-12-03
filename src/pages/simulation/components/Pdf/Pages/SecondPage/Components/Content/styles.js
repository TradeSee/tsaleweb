import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  position: relative;
  width: 210mm;
  height: 297mm;

  .bar {
    position: absolute;
    width: 100%;
    height: 12px;
    background-color: #0981b1;
    top: 0;

    &::before {
      content: "";
      position: absolute;
      background-color: #089bd5;
      width: 35%;
      height: 12px;
      left: 0;
    }

    &::after {
      content: "";
      position: absolute;
      background-color: #153344;
      width: 35%;
      height: 12px;
      right: 0;
    }
  }

  hr {
    background-color: #d9d9d9;
    height: 2px;
    width: 100%;
    grid-column: 1/-1;
  }
`;

export const StyledContent = styled.div`
  padding: 32px 48px;
`;

export const RegularInfo = styled.div`
  h2 {
    font-size: 16px;
  }

  p {
    font-size: 12px;
  }
`;

// First Block
export const FirstBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 24px 22px;
  grid-row-gap: 32px;
`;

export const OrderInfo = styled.div`
  width: max-content;
  grid-column: 2;

  h2 {
    font-size: 16px;
  }

  p {
    width: 100%;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
  }
`;

// Second Block
export const SecondBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  position: relative;

  hr {
    position: absolute;
    bottom: -8px;
  }
`;

// Third Block
export const ThirdBlock = styled.div`
  display: Flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  gap: 8px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  margin-top: 20px;

  tr {
    padding: px;
  }

  tbody > tr {
    &:nth-child(odd) {
      background-color: #e9edf8;
    }
  }

  th,
  td {
    font-size: 16px;
    padding: 8px;
    text-align: left;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

// Fourth Block
export const FourthBlock = styled.div`
  display: Flex;
  justify-content: space-between;
  position: relative;
  gap: 8px;
  margin-top: 20px;

  textarea {
    resize: "none";
    width: 40%;
    height: 400px;
    padding: 8px;
    font-size: 16px;
    border-color: #d9d9d9;
  }
`;

export const Payments = styled.div`
  width: 50%;
  height: 400px;
  border: 1px solid #d9d9d9;
  display: flex;
  justify-content: space-between;

  .priceText {
    background-color: #e9edf8;
  }

  .priceText,
  .prices {
    padding: 8px;
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > div {
      display: flex;
      flex-direction: column;
      font-size: 18px;
      gap: 12px;
    }

    & > span {
      font-size: 24px;
      font-weight: bold;
      align-self: flex-end;
      justify-self: flex-end;
    }
  }
`;

// Signature
export const Signature = styled.div`
  display: Flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  gap: 8px;
  bottom: 24px;
  width: 88%;

  hr {
    height: 2px;
    background-color: black;
    font-size: 16px;
    width: 100%;
  }

  div {
    width: 100%;
    margin-top: -8px;
    font-weight: bold;

    span:first-of-type {
      margin-right: 360px;
    }
  }
`;
