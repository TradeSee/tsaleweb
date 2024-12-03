import styled from "styled-components";

export const Container = styled.main``;

export const Header = styled.header`
  border-radius: 8px;
  height: 240px;
  display: flex;
  align-items: center;
  gap: 24px;

  img {
    width: 160px;
    height: 160px;
    border: 1px solid ${({ theme }) => theme.colors.main[500]};
    border-radius: 50%;
  }

  .head_title {
  }
`;

export const ContactInfo = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, auto));
  gap: 12px;

  div {
    border-bottom: 1px solid #eeeeee;
    padding: 8px 0;
    display: flex;
    align-items: center;

    span {
      color: #969696;
    }
    strong {
      color: #17283e;
    }
  }
`;

export const Reccomendation = styled.div`
  display: flex;
  margin-top: 120px;
  padding-top: 32px;
  border-top: 1px solid #eeeeee;
  gap: 40px;
`;

export const Card = styled.div`
  border: 1px solid #b0bed0;
  border-radius: 8px;
  height: 240px;

  header {
    background-color: #e6eaf0;
    padding: 8px;
    color: #17283e;
    font-weight: bold;
  }

  section {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 80%;
    padding: 12px;
    gap: 32px;

    .title {
      margin-bottom: 12px;
    }

    h3 {
      height: 12px;
      color: #17283e;
      white-space: nowrap;
    }

    img {
      width: 120px;
      height: 120px;
      border: 1px solid blue;
      border-radius: 100%;
    }

    div {
      display: flex;
      flex-direction: column;
    }

    button {
      background-color: #1c57d9;
      color: #fafafa;
      font-weight: bold;
      font-size: 16px;
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        background: #246dec;
      }

      &:active {
        background: #1d47b0;
      }

      &:disabled {
        background: #ccc;
      }
    }
  }
`;
