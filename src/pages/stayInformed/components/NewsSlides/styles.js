import styled from "styled-components";

export const Header = styled.header`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  strong {
    color: #4b4b4b;
    font-size: 20px;
  }

  a {
    text-decoration: none;
  }

  a > strong {
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.main[500]};
  }
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #e9edf8;
  border-radius: 8px;
  padding: 4px 12px;

  input {
    border: none;
    background-color: #e9edf8;
    outline: none;
    font-size: 16px;
    margin-left: 8px;

    :hover {
      outline: none;
      box-shadow: none;
    }
  }
`;
