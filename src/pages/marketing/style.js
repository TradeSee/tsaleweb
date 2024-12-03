import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const HeaderFilter = styled.div`
  max-width: 97%;
  display: grid;
  flex-direction: column;
  grid-template-rows: 20px 1fr 1fr;
  grid-template-columns: minmax(50px, 1fr) minmax(100px, 2fr) minmax(50px, 3fr) minmax(50px, 4fr) 160px;
  align-items: center;

  gap: 16px;
  box-shadow: 0 4px 0px #00000040;
  border-radius: 8px;
  padding: 24px 40px;
  margin-top: 10px;
  h2 {
    color: #17283e;
    grid-column: 1/-1;
  }

  input {
    font-size: 16px;
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #aaa;
    outline: none;
  }

  .basic-multi-select {
    width: 100%;
    max-width: 1061px;
    flex-wrap: nowrap;
  }

  .Select-Text {
    font-size: 14px;
  }

  .searchBy {
    grid-column: 1/-1;
    display: flex;
    gap: 12px;
  }
`;

export const InRow = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.colors.main[500]};
  width: 100px;
  border: none;
  border-radius: 4px;
  color: #fff;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #214eb9;
  }
`;

export const MyLine = styled.div`
width: 97%;
height: 1px;
background-color:${({ theme }) => theme.colors.gray[300]};
margin-top: 14px;
margin-bottom: 14px;
`;