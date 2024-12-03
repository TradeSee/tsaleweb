import styled from "styled-components";

export const Container = styled.section`
  max-height: 80%;
  height: 35%;
  width: 80vw;
  overflow: scroll;
  border-radius: 16px;

  table {
    background-color: #f4f4f4;
    padding: 16px;
    border-radius: 0px 0px 16px 16px;
    width: 100%;

    th {
      text-align: left;
    }
  }
`;

export const Header = styled.header`
  background-color: #eeeeee;
  border-radius: 16px 16px 0 0;
  padding: 16px;
  display: flex;
  justify-content: space-between;

  span {
    display: flex;
    align-items: center;
    font-weight: bold;

    span {
      margin-left: 8px;
    }
  }

  div {
    display: flex;
    gap: 12px;
  }
`;

export const FilterButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  text-decoration: ${({ isFilterSelected }) =>
    isFilterSelected ? "underline" : "none"};
`;
