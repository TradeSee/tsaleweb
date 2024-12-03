import styled from "styled-components";

export const ClearButton = styled.button`
  display: inline-flex;
  padding: 6px 34px;
  justify-content: center;
  align-items: center;
  gap: 2px;
  border-radius: 8px;
  border: 2px solid #fafafa;
  background: #fafafa;
  color: black;
  cursor: pointer;
  height: 30px;
  
  &:hover {
    color: #214eb9;
  }
`;

export const MainFilter = styled.div`
  background-color: #fafafa;
  max-width: 96%;
  display: grid;
  flex-direction: column;
  align-items: center;
  align-items: center;

  gap: 16px;
  box-shadow: 0 4px 4px #00000040;
  border-radius: 8px;
  padding: 24px 40px;

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
    width: 40%;
  }

  .basic-multi-select {
    width: 100%;
  }

  .searchBy {
    grid-column: 1/-1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;
export const InRow = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  width: 100%;
  > * {
    flex: 1;
  }
`;

export const SearchButton = styled.button`
  background-color: #366DFB;
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

// export const ClearButton = styled.button`
//   background-color: #fff;
//   border: 1px solid #E1F0DA;
//   border-radius: 4px;
//   color: #000;
//   padding: 10px 15px;
//   cursor: pointer;

//   &:hover {
//     color: #214eb9;
//     border-color: #214eb9;
//   }
// `;

export const Underline = styled.div`
width: 5%;
height: 2px;
background-color: #366DFB;
`;
