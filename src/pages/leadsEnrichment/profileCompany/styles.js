import styled from "styled-components";

export const Header = styled.header`
  border-radius: 8px;
  height: 240px;
  display: flex;
  align-items: center;

  img {
    width: 160px;
    height: 160px;
    border: 1px solid ${({ theme }) => theme.colors.main[500]};
    border-radius: 50%;
  }

  .head_title {
  }
`;

export const Container = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const InRow = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.colors.main[500]};
  width: 120px;
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

export const ContactInfo = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  div {
    border-bottom: 1px solid #eeeeee;
    padding: 8px 0;
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 24px;
    span {
      color: #969696;
    }
    strong {
      color: #17283e;
    }
    a {
      color: #969696;
      text-decoration: none;
    }
  }
`;
