import styled from "styled-components";

export const Container = styled.div``;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 380px);
  margin-right: 64px;
  gap: 32px;
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
