import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  height: 90%;
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

export const Empty = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    width: 80%;
    color: #1b2e8d;
  }

  img {
    width: 120px;
    height: auto;
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

export const AllChats = styled.aside`
  width: 40%;
  min-width: 600px;
  height: 100%;
  padding-right: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-right: 1px solid #ccc;
`;

export const ChatCard = styled.article`
  display: flex;
  align-items: center;
  border-radius: 8px;
  gap: 12px;
  padding: 12px 12px;
  width: 100%;
  max-width: 600px;

  background-color: ${({ isSelected }) =>
    isSelected ? "#eeeeee80" : "transparent"};

  strong {
    font-size: 20px;
  }

  span {
    max-width: 100%;
    color: #bbb;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  img {
    width: 68px;
    height: 68px;
    border-radius: 100%;
    border: 1px solid ${({ theme }) => theme.colors.main[500]};
  }

  & > div {
    width: 100%;
    max-width: 450px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
  }

  div > header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  &:hover {
    background-color: #eeeeee80;
  }

  cursor: pointer;
`;

export const Chat = styled.section`
  position: relative;
  max-width: 100%;
  max-height: 90dvh;

  border-radius: 8px;
  padding: 8px 12px;
`;

export const ChatHeader = styled.header`
  max-width: 100%;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;

  img {
    width: 80px;
    height: 80px;
    border-radius: 100%;
  }

  h2 {
    max-width: 120px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const ChatContent = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 85%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 24px;
`;

export const Message = styled.article`
  max-width: 80%;
  align-self: ${({ isMine }) => (isMine ? "flex-end" : "flex-start")};
  position: relative;
  user-select: none;

  padding: 0px 64px 0px 8px;
  margin: 8px;
  background-color: #e0e0e0;
  border-radius: ${({ isMine }) =>
    isMine ? "8px 0 8px 8px" : "0 8px 8px 8px"};

  .arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
  }

  .left {
    top: 0;
    right: -10px;
    border-width: 0px 0 10px 10px;
    border-color: transparent transparent transparent #e0e0e0;
  }

  .right {
    top: 0;
    left: -10px;
    border-width: 0 10px 10px 0;
    border-color: transparent #e0e0e0 transparent transparent;
  }

  p {
    max-width: 100%;
    word-wrap: break-word;
    word-break: break-all;
  }

  .hour {
    position: absolute;
    right: 12px;
    bottom: 0;
    font-size: 12px;
    color: #aaa;
  }
`;

export const SendMessage = styled.div`
  width: 96%;
  position: absolute;
  left: 0;
  bottom: 0;
  border: 1px solid #aaa;
  padding: 8px;
  border-radius: 8px;
  box-shadow: none;
  display: flex;
  background-color: #fff;

  left: 50%;
  transform: translate(-50%, 0);

  button {
    font-size: 24px;
    color: ${({ theme }) => theme.colors.main[500]};
    background-color: transparent;
    outline: none;
    border: none;
  }

  input {
    width: 100%;
    outline: none;
    font-size: 16px;
    border: none;

    &:hover {
      box-shadow: none;
    }
  }
`;
