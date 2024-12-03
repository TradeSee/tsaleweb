import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr minmax(300px, 400px);
  /* max-width: 1200px; */
  position: absolute;
  top: 96px;
  left: 0;
  gap: 20px;

  .noPlan {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    background-color: #f0f0f0;
    border: 1px solid #dedede;
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.darker[950]};
  }
`;

export const BuyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.main[500]};
  color: #fafafa;
  border-radius: 4px;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  grid-column: 1/-1;

  .desc {
    display: flex;
    align-items: center;
    gap: 16px;

    h2 {
      padding: 0;
      margin: 0;
    }
  }

  .creditQty {
    background-color: #fafafa;
    color: ${({ theme }) => theme.colors.main[900]};
    padding: 12px 8px 8px 8px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h3 {
      max-height: min-content;
      padding: 0;
      margin: 0;
    }
    span {
      text-align: left;
    }
  }
`;

export const PlansContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 88px 1fr;

  .headPlan {
    background-color: ${({ theme }) => theme.colors.main[500]};
    color: #fafafa;
    text-align: center;
    border-radius: 4px 4px 0 0;
    height: 88px;

    h2 {
      height: 12px;
    }
  }
`;

export const PlansBenefits = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-row: 2;
  grid-column: 1/-1;
  padding: 8px 48px;

  border: 1px solid #cccccc;
  border-radius: 4px;

  div {
    justify-self: center;
  }

  h3 {
    color: ${({ theme }) => theme.colors.main[800]};
  }

  p {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const Checkout = styled.aside`
  background-color: #f0f0f0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 16px;
  border-radius: 4px;

  .headSelect {
    width: 120px;
    margin-bottom: 8px;
    height: min-content;
    justify-self: end;
    border: 1px solid ${({ theme }) => theme.colors.main[500]};
    border-radius: 4px;
    outline: 1px solid ${({ theme }) => theme.colors.main[500]};

    font-size: 16px;
    padding: 8px 0;
  }

  .period {
    display: flex;
    flex-direction: row;
  }

  .monthly {
    border-radius: 25px 0 0 25px;
  }
  .annual {
    border-radius: 0 25px 25px 0;
  }

  > .planData {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
  }

  h2 {
    text-align: right;
    color: ${({ theme }) => theme.colors.main[800]};
  }

  .checkoutBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.sucess.main};
    color: #ffffff;
    border: none;
    border-radius: 4px;
    font-size: 20px;
    font-weight: bold;
    padding: 12px 0;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.sucess.dark};
    }

    &:active {
      background-color: ${({ theme }) => theme.colors.sucess.darker};
    }
  }
`;

export const ActualPlan = styled.div`
  grid-column: 1/-1;

  .PlanTitle {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 0px 20px;
  }

  .planInfo {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    border: 0.5px solid ${({ theme }) => theme.colors.gray[100]};
    border-radius: 4px;
    padding: 20px;
    justify-content: space-between;

    span {
      span {
        font-size: 18px;
      }

      button {
        color: ${({ theme }) => theme.colors.gray[500]};
        border: none;
        outline: none;
        background-color: transparent;
      }
    }

    h2 {
      line-height: 0px;
    }
  }
`;

export const PeriodButton = styled.button`
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.dark[900]};
  font-size: 16px;
  padding: 8px 30px;
  cursor: pointer;

  background-color: #fff;
  color: ${({ theme }) => theme.colors.dark[900]};

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${({ theme }) => theme.colors.dark[900]};
      color: #ffff;
    `}
`;

export const Table = styled.table`
  width: 100%;
  color: ${({ theme }) => theme.colors.dark[950]};
  border: 1px solid ${({ theme }) => theme.colors.gray[50]};
  border-radius: 16px;
  border-collapse: collapse;

  .head {
    background-color: ${({ theme }) => theme.colors.gray[50]};
  }

  td,
  th {
    padding: 12px 48px;
    text-align: left;
  }

  td:nth-child(odd) {
    font-weight: bold;
  }

  tr:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[50]};
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    border-radius: 8px;
    gap: 8px;
    font-size: 16px;
    margin-right: 40px;
    background-color: ${({ theme }) => theme.colors.button.main};
    border: none;
    color: #fafafa;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.button.hover};
    }
    &:active {
      background-color: ${({ theme }) => theme.colors.button.active};
    }
  }
`;

export const HistoryContainer = styled.div`
  grid-column: 1;
  margin-bottom: 24px;
  align-self: self-start;
  grid-row: 3;
  grid-column: 1/-1;

  > header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.colors.dark[950]};

    > span {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
`;

export const FilterButton = styled.button`
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  text-decoration: ${({ isFilterSelected }) =>
    isFilterSelected ? "underline" : "none"};
`;

export const CheckoutButton = styled.button`
display: flex;
align-items: center;
justify-content: center;
gap: 16px;
width: 100%;
background-color: ${({ theme }) => theme.colors.sucess.main};
color: #ffffff;
border: none;
border-radius: 4px;
font-size: 20px;
font-weight: bold;
padding: 12px 0;
transition: all 0.2s;
cursor: pointer;

&:hover {
  background-color:  ${({ theme }) => theme.colors.sucess.dark};
}

&:active {
  background-color:  ${({ theme }) => theme.colors.sucess.darker};
}
`;

export const ButtonContainer = styled.div`
display: flex;
gap: 16px;
`;