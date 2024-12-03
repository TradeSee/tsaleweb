import styled from "styled-components";

export const Card = styled.article`
  background-color: #f7f7f7;
  border-radius: 20px;
  cursor: pointer;
  width: 100%;
  height: 100%;

  & + & {
    margin-top: 16px;
  }

  &:hover {
    transition: 0.3s;
    transform: scale(1.025);
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin-right: 5px;
  margin-left: 5px;
  border-bottom: 1px solid #e7e7e7;
  height: 120px;

  article {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 8;
    margin-left: 8px;

    h2 {
      color: #1f4172;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      line-clamp: 2;
    }
  }

  p {
    color: #989898;
    margin-top: 1px;
    margin-bottom: 8px;
  }
`;

export const Container = styled.section`
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  max-height: 400px;
  padding: 12px 24px;
`;
