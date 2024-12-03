import styled from "styled-components";

export const Container = styled.div`
  color: #fff;
  display: grid;
  cursor: pointer;
  grid-template-rows: 1fr 1fr;
  width: 100%;
`;

export const Profile = styled.div`
  transition: 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 0 24px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 16px;
  background: ${({ theme }) => theme.colors.dark[950]};

  h1 {
    font-size: 24px;
  }
`;

export const Description = styled.div`
  border-radius: 0px 0px 8px 8px;
  position: relative;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.main[500]};
`;
