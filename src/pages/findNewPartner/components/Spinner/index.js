import { ThemeContext } from "styled-components";

import { StyledSpinner } from "./styles";
import { useContext } from "react";

export default function Spinner({ size, spinnerColor }) {
  const theme = useContext(ThemeContext);

  return (
    <StyledSpinner
      size={size || 32}
      spinnerColor={spinnerColor || theme.colors.main[500]}
    />
  );
}
