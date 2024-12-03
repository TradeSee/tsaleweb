import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: max-content;
  gap: 8px;
  align-items: center;
  padding: 4px 12px;
  background-color: ${({ Role }) =>
    Role === "Supplier" ? "#5791c8" : "#5DB888"};
  border-radius: 4px;
`;
