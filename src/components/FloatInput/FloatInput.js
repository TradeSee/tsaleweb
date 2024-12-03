import { useContext, useState } from "react";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";

import { Input, Select } from "./styles";
import { ThemeContext } from "styled-components";

export function FloatInput({
  value,
  onChange,
  label,
  error,
  type,
  notRequired,
  isReadOnly,
}) {
  return (
    <Input>
      <input
        value={value}
        placeholder=" "
        required={!notRequired}
        onChange={onChange}
        readOnly={isReadOnly}
        disabled={isReadOnly}
        spellCheck={"false"}
        type={type || "text"}
      />
      <label>{label}</label>

      <br />
      {error && <small>{error}</small>}
    </Input>
  );
}

export function FloatSelect({
  value,
  onChange,
  label,
  children,
  defaultValue,
}) {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const theme = useContext(ThemeContext);

  return (
    <Select>
      <select
        onFocus={() => setIsSelectOpen(true)}
        onBlur={() => setIsSelectOpen(false)}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        defaultChecked={defaultValue}
      >
        {children}
      </select>
      <label>{label}</label>

      {!isSelectOpen ? (
        <ArrowDropDownRoundedIcon
          sx={{
            position: "absolute",
            right: 0,
            color: theme.colors.main[200],
          }}
        />
      ) : (
        <ArrowDropUpRoundedIcon
          sx={{
            position: "absolute",
            right: 0,
            color: theme.colors.main[500],
          }}
        />
      )}
    </Select>
  );
}
