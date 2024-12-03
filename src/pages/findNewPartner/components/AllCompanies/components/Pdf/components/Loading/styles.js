import styled from "styled-components";

export const ContainerLoading = styled.div`
  background-color: ${({ theme }) => theme.colors.main[500]};
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
