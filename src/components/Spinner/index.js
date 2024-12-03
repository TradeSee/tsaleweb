import { useContext } from "react";
import { StyledSpinner } from "./styles";
import { ThemeContext } from "styled-components";

export default function Spinner({ size, spinnerColor }) {
  const theme = useContext(ThemeContext);

  return (
    <StyledSpinner
      size={size || 32}
      spinnerColor={spinnerColor || theme.colors.main[500]}
    />
  );
}
