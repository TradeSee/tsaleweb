import styled from "styled-components";

export const FlagContainer = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: ${({ Bg }) => `url(${Bg})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
