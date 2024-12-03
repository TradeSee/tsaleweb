import styled from "styled-components";

export const InitialIcon = styled.aside`
  background-color: ${({ theme }) => theme.colors.main[500]};
  width: 50%;
  height: 100dvh;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 80%;
    height: auto;
  }
`;
