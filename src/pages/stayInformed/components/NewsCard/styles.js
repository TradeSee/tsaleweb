import styled from "styled-components";

export const Container = styled.article`
  padding: 16px;
  background-color: #fafafa;
  border-radius: 8px;
  height: 200px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const NewsTitle = styled.h3`
  color: ${({ theme }) => theme.colors.dark[950]};
`;

export const NewsText = styled.p`
  text-align: justify;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #aaa;
`;
