import styled from "styled-components";

export const Header = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  align-items: center;

  @media screen and (max-width: 420px) {
    flex-direction: column;
  }
`;
