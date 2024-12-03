import styled from "styled-components";

export const Box = styled.div`
  background-color: #fafafa;
  display: grid;
  grid-template-columns: 1fr 8px 1fr;
  gap: 24px;
  box-shadow: 1px 8px 8px #00000020;
  padding: 8px 12px;

  .searchType {
    display: flex;
    gap: 12px;
  }

  label {
    padding: 12px 0;
  }

  .inputsContainer {
    display: flex;
    gap: 16px;
    width: 100%;

    .inputContainer {
      width: 100%;
    }

    input {
      width: 100%;
      font-size: 16px;
      border-radius: 6px;
      padding: 8px 12px;
      outline: none;
      border: 1px solid #00000040;
    }
  }
`;

export const Divider = styled.hr`
  background-color: #eee;
`;
