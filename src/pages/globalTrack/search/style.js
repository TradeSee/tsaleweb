import styled from "styled-components";

export const StepsContainer = styled.div`
  max-width: 96%;

  header {
    display: flex;
    align-items: center;
    background-color: #f2f2f2;
    border-radius: 6px;
  }

  section {
    display: flex;
    align-items: center;
    position: relative;
  }

  section:not(:last-of-type) {
    border-bottom: 1px solid #eee;
  }

  p {
    width: 200px;
    margin-left: 80px;
  }

  *,
  :after,
  :before {
    box-sizing: border-box;
  }

  .tracking__step {
    position: relative;
  }

  .tracking-container {
    width: 100px;
    display: flex;
    justify-content: center;
    position: relative;
  }

  .tracking__step.step_over:before {
    background: ${({ theme }) => theme.colors.main[500]};
    bottom: 0;
    content: "";
    display: block;
    left: 47.8%;
    height: 50px;
    position: absolute;
    top: 0.4px;
    width: 0.3rem;
    z-index: 1;
  }
  .tracking__step.step_blue:before {
    background: ${({ theme }) => theme.colors.main[500]};
    left: 47.8%;
    content: "";
    display: block;
    position: absolute;
    top: -89%;
    width: 4.8px;
    height: 70px;
  }

  .tracking__step.step_start:before {
    background: ${({ theme }) => theme.colors.main[500]};
    bottom: 12px;
    left: 50%;
    content: "";
    display: block;
    position: absolute;
    top: -89%;
    transform: translateX(-50%);
    width: 5px;
    height: 50px;
  }

  .data-step {
    background: #fff;
    border: 0.5rem solid ${({ theme }) => theme.colors.main[500]};
    border-radius: 50%;
    display: block;
    height: 25.6px;
    position: relative;
    width: 25.6px;
    z-index: 2;
  }
  .data-step.current {
    border: 0.3rem solid ${({ theme }) => theme.colors.main[500]};
    height: 1.8875rem;
    width: 1.8875rem;
  }

  .data-step.current::before {
    -webkit-font-smoothing: antialiased;
    color: rgb(34, 34, 33);
    content: "\\1F6A2";
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    left: 50%;
    line-height: 1;
    position: absolute;
    text-transform: none;
    top: 50%;
    transform: translate(-50%, -50%);
    font-family: icomoon !important;
    font-variant: normal;
  }

  .data-step.start {
    background: ${({ theme }) => theme.colors.main[500]};
    border: 0.2rem solid ${({ theme }) => theme.colors.main[500]};
    height: 30.8px;
    width: 30.8px;
  }

  .data-step.start::before {
    -webkit-font-smoothing: antialiased;
    color: rgb(255, 255, 255);
    content: "\\1F4CD";
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    left: 50%;
    line-height: 1;
    position: absolute;
    text-transform: none;
    top: 50%;
    transform: translate(-50%, -50%);
    font-family: icomoon !important;
    font-variant: normal;
  }
`;

export const Empty = styled.div`
  height: 80dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    width: 40%;
    color: #1b2e8d;
  }

  img {
    width: 80px;
  }

  button {
    background-color: #246dec;
    border: none;
    outline: none;
    font-size: 16px;
    color: #fafafa;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: #3a8cf7;
    }

    &:active {
      background-color: #1c57d9;
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 98%;
  margin-bottom: 4px;

  button {
    font-size: 16;
    font-weight: bold;
    color: #fafafa;
    background: #1c57d9;
    padding: 12px 24px;
    border: none;
    outline: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;

    :hover {
      background: #246dec;
    }

    :active {
      background: #1d47b0;
    }
  }
`;

export const Container = styled.main`
  width: 100%;
  height: 80dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TabsContainer = styled.section`
  width: 97%;
  height: fit-content;
  border-radius: 8px;
  transition: all 0.2s;
`;

export const FilterByName = styled.div`
  flex-direction: row;
  display: flex;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  gap: 16px;

  input {
    font-size: 16px;
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #aaa;
    outline: none;
  }
`;

export const MainFilter = styled.div`
  background-color: #fafafa;
  max-width: 96%;
  display: grid;
  flex-direction: column;
  align-items: center;
  align-items: center;
  margin-top: 20px;

  gap: 16px;
  box-shadow: 0 4px 4px #00000040;
  border-radius: 8px;
  padding: 24px 40px;

  h2 {
    color: #17283e;
    grid-column: 1/-1;
  }

  input {
    width: 100%;
    height: 47px;
    line-height: 30px;
    padding-left: 12px;
    border: 2px solid transparent;
    border-radius: 10px;
    outline: none;
    background-color: #f8fafc;
    color: #4b4b4b;
    transition: 0.5s ease;
    border-width: 2px;
    border-color: #e9edf8;
    font-weight: 530;
    font-size: 13px;
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

// export const InRow = styled.div`
//   flex-direction: row;
//   display: flex;
//   align-items: center;
//   width: 100%;
//   > * {
//     flex: 1;
//   }
// `;

export const InRow = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
`;

export const Heading = styled.h4`
  margin-right: 8px;
  color: #17283e;
`;

export const Ml10 = styled.div`
  margin-left: 40%;
`;

export const HiddenInScreen = styled.p`
  display: none;

  @media print {
    display: block;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-start;
`;

export const MyCard = styled.div`
  border-radius: 18px;
  background-color: #e9edf8;
  padding: 20px;
  flex: 1 0 calc(33.33% - 10px);
  max-width: 300px;
  box-sizing: border-box;
  min-height: 100px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;
export const MyCardContent = styled.div`
  width: 100%;
`;

export const SearchButton = styled.button`
  background-color: ${({ theme }) => theme.colors.main[500]};
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

export const ClearButton = styled.button`
  background-color: #fafafa;
  border: 1px solid #fafafa;
  border-radius: 4px;
  color: #000;
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: #214eb9;
  }
`;

export const Underline = styled.div`
  width: 5%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.main[500]};
`;

export const MyLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d1d1d1;
`;

export const GroupInput = styled.div`
  width: 50%;
  max-width: 250px;

  .buttonExplore {
    position: absolute;
    bottom: -24px;
  }

  @media screen and (max-width: 1160px) {
    img {
      display: none;
    }
  }
`;
