import { useContext, useState } from "react";
import { PopOver } from "../PopOver";
import { DatePicker } from "../DatePicker";
import { format } from "date-fns";
import { InputWrapper, TextHolder } from "./styles";
import { Close } from "@mui/icons-material";
import { ThemeContext } from "styled-components";

export function DatePickerInput({ error, value, onChange, label }) {
  const theme = useContext(ThemeContext);

  const [selectedDate, setSelectedDate] = useState(value ?? new Date());

  const errorContainer = {
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
    marginTop: "0.5rem",
    color: `${theme.colors.danger.main}`,
  };

  const errorText = {
    fontSize: "0.75rem",
    color: `${theme.colors.danger.main}`,
  };

  function handleChangeDate(date) {
    setSelectedDate(date);
    onChange?.(format(date, "yyyy-MM-dd"));
  }

  return (
    <PopOver.Root>
      <PopOver.Trigger>
        <div
          style={{
            height: "fit-content",
            maxHeight: "fit-content",
          }}
        >
          <InputWrapper error={error} type="button">
            <TextHolder>{label || "Date"}</TextHolder>

            <span>
              {typeof selectedDate === "string"
                ? selectedDate.replace(/-/g, "/")
                : format(selectedDate, "MM/dd/yyyy")}
            </span>
          </InputWrapper>

          {error && (
            <div style={errorContainer}>
              <Close />
              <span style={errorText}>{error}</span>
            </div>
          )}
        </div>
      </PopOver.Trigger>

      <PopOver.Content>
        <DatePicker value={selectedDate} onChange={handleChangeDate} />
      </PopOver.Content>
    </PopOver.Root>
  );
}
