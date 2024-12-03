import styled from "styled-components";

export const Container = styled.div``;

export const ChartLegend = styled.p`
  display: flex;
  align-items: left;
  font-weight: semibold;
  max-width: 100%;
  font-size: 12px;
  align-self: flex-start;
  position: relative;
  padding-left: 12px;

  &::before {
    content: "";
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: ${({ Color }) => Color};
    border-radius: 100%;
    top: 2px;
    left: 0;
  }
`;
