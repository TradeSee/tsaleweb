import { useContext } from "react";
import { ThemeContext } from "styled-components";
import { enUS } from "date-fns/locale";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import Capitalize from "../../utils/capitalize";
import "react-day-picker/dist/style.css";

export function DatePicker({ value, onChange, from, to }) {
  const theme = useContext(ThemeContext);

  const css = `
.caption {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${theme.colors.dark[950]};
}

.nav {
  display: flex;
  gap: 4px;
}

.prev, .next {
  color: ${theme.colors.main[500]} !important;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent !important;
  border: none;
  transition: all .2s;
}

.prev:hover, .next:hover {
  color: #fafafa !important;
  background-color: ${theme.colors.main[500]} !important;
}

.head-cell {
  text-transform: uppercase;
  font-size: 0.75rem;
  color: #a0aec0;
  font-weight: 500;
  padding-top: 0.25rem;
  padding-bottom: 0.5rem;
}

.button {
  color: #4a5568;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  background-color: transparent;
}

.day-today {
  font-weight: 800;
  color: #2d3748;
}

.day-selected {
  background-color: ${theme.colors.main[500]};
  color: #fff;
  font-weight: 500;
}
`;

  return (
    <>
      <style>{css}</style>
      <DayPicker
        locale={enUS}
        selected={value}
        mode="single"
        fromYear={from || 2017}
        toYear={to || new Date().getFullYear()}
        captionLayout="dropdown-buttons"
        onSelect={(date) => onChange(date ?? new Date())}
        classNames={{
          caption: "caption",
          nav: "nav",
          nav_button_previous: "prev",
          nav_button_next: "next",
          head_cell: "head-cell",
          button: "button",
          day_today: "day-today",
          day_selected: "day-selected",
        }}
        formatters={{
          formatCaption: (date, options) => {
            return (
              <span
                style={{
                  color: "#366DFB",
                  letterSpacing: "-0.408px",
                  textTransform: "capitalize",
                  fontWeight: 700,
                  marginLeft: 16,
                }}
              >
                {Capitalize(format(date, "LLLL yyyy", options))}
              </span>
            );
          },
        }}
      />
    </>
  );
}
