import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const slideFadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideFadeRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const animationMap = {
  "slide-fade-up": slideFadeUp,
  "slide-fade-right": slideFadeRight,
};

const FadeTransition = styled.span`
  opacity: ${({ in: inProp }) => (inProp ? "1" : "0")};
  animation: ${({ in: inProp, animationName }) =>
      inProp
        ? animationMap[animationName]
        : animationMap[`out${animationName}`]}
    0.3s linear;
`;

const TransitionGroup = ({ children, name }) => {
  const [items] = useState(children);

  return (
    <>
      {items.map((child, index) => (
        <FadeTransition key={index} in={true} animationName={name}>
          {child}
        </FadeTransition>
      ))}
    </>
  );
};

const Transition = ({ children, name }) => {
  return (
    <>
      <FadeTransition in={true} animationName={name}>
        {children}
      </FadeTransition>
    </>
  );
};

export { TransitionGroup, Transition };
