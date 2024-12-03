import styled from "styled-components";

export const Container = styled.main`
  max-width: 80%;
  overflow-y: hidden;

  button {
    border: none;
    background-color: transparent;
  }
`;

export const Filters = styled.header`
  align-self: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px 24px;

  h3 {
    color: "#4b4b4b";
    line-height: 24px;
    margin-bottom: 8px;
  }

  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
export const SearchBar = styled.aside`
  display: flex;
  align-items: center;
  background-color: #e9edf8;
  border-radius: 8px;
  padding: 4px 12px;
  width: 95%;
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  background-color: #e9edf8;
  outline: none;
  font-size: 16px;
  margin-left: 8px;
  padding: 8px 4px;

  &:hover,
  &:focus {
    background-color: #e9edf8;
    border-width: none !important;
    outline: none !important;
    box-shadow: unset !important;
  }
`;

export const AddMetal = styled.section`
  background-color: transparent;
  border: 1px dashed ${({ theme }) => theme.colors.main[500]};

  height: 80%;
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #fafafa;
  padding: 8px 12px;
  gap: 8px;
  cursor: pointer;

  &:hover {
    transition: 0.4s;
    background-color: #246dec;

    div {
      transition: 0.4s;
      border: 1px solid ${({ theme }) => theme.colors.main[500]};
      background-color: #fafafa;
    }

    strong {
      transition: 0.4s;
      color: #fafafa;
    }
  }

  div {
    border: 1px dashed ${({ theme }) => theme.colors.main[500]};
    border-radius: 100%;
    display: flex;
    align-items: center;
    padding: 8px;
  }

  strong {
    color: ${({ theme }) => theme.colors.main[500]};
  }
`;

export const Card = styled.section`
  background-color: ${({ theme }) => theme.colors.main[500]};
  height: 70%;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 8px;
  color: #fafafa;
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    transition: 0.2s;
    background-color:  ${({ theme }) => theme.colors.button.hover};
  }

  header {
    width: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    strong {
      max-width: 230px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-left: 2px;
    }

    p {
      margin-top: 8px;
    }
  }

  button {
    border: 1px solid #f00;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;

    :hover {
      background-color: ${({ theme }) => theme.colors.button.hover};
      border-radius: 100%;
    }
  }
`;

export const Header = styled.header`
  margin-top: 20;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
