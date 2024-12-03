import styled from "styled-components";

export const Card = styled.article`
  background-color: #e9edf8;
  border-radius: 6px;
  padding: 8px;
  cursor: pointer;
  height: 120px;

  & + & {
    margin-top: 16px;
  }

  &:hover {
    transition: 0.3s;
    transform: scale(1.025);
  }
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8;

  strong {
    color: #1f4172;
    max-width: 70%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const CardContent = styled.article`
  width: 98%;
  margin-bottom: 2px;
  align-items: center;

  p {
    display: block;
    display: -webkit-box;
    max-width: 98%;
    font-size: 16px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #8a97b1;

    @media screen and (max-width: 1240) {
      -webkit-line-clamp: 2;
    }
  }
`;
