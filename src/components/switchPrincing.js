import React, { useState } from "react";
import styled from "styled-components";

const SwitchContainer = styled.div`
  display: flex;
  border-radius: 13px;
  overflow: hidden;
  margin-top: 5px;
  margin-bottom: 5px;
  border: 2px solid ${({ theme }) => theme.colors.main[500]};
  padding: 3px;
`;

const SwitchButton = styled.button`
  flex: 1;
  border-radius: 10px;
  background-color: ${(props) =>
    props.active ? `${({ theme }) => theme.colors.main[500]}` : "#fff"};
  color: ${(props) =>
    props.active ? "#fff" : `${({ theme }) => theme.colors.main[500]}`};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  border-width: 0;
  height: 40px;
  font-size: 17px;
`;

const SwitchPrincing = ({ text1, text2, onOptionChange }) => {
  const [activeOption, setActiveOption] = useState(text2);

  const handleSwitch = (option) => {
    setActiveOption(option);
    onOptionChange(option);
  };

  return (
    <SwitchContainer>
      <SwitchButton
        variant={activeOption === text1 ? "contained" : "outlined"}
        onClick={() => handleSwitch(text1)}
        active={activeOption === text1}
      >
        {text1}
      </SwitchButton>
      <SwitchButton
        variant={activeOption === text2 ? "contained" : "outlined"}
        onClick={() => handleSwitch(text2)}
        active={activeOption === text2}
      >
        {text2}
      </SwitchButton>
    </SwitchContainer>
  );
};

export default SwitchPrincing;
