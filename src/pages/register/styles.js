import styled from "styled-components";

export const SponsorCard = styled.div`
  max-width: 300px;
  box-shadow: 0px 0px 8px #5d5d5d;
  border-radius: 16px;

  header {
    background-color: ${({ theme }) => theme.colors.main[500]};
    padding: 24px;
    border-radius: 16px 16px 0 0;

    img {
      width: 220px;
    }
  }

  section {
    text-align: center;
    margin-bottom: 64px;
  }

  footer {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > span {
      color: #fc5050;
      text-decoration: line-through;
    }

    div {
      border: 1px solid #51ca73;
      border-radius: 8px;
      padding: 8px 24px;
      position: relative;
      margin-top: 12px;
      margin-bottom: 32px;

      span {
        font-size: 24px;
        font-weight: 500;
      }

      &::before {
        content: "Save 50%";
        position: absolute;
        background-color: #51ca73;
        color: #fafafa;
        font-weight: bold;
        border-radius: 4px;
        padding: 0px 16px;
        top: -8px;
      }
    }

    button {
      padding: 8px 16px;
      border-radius: 8px;
      border: none;
      outline: none;
      background-color: #51ca73;
      font-size: 16px;
      font-weight: bold;
      color: #fafafa;
      margin-bottom: 48px;
    }
  }
`;
