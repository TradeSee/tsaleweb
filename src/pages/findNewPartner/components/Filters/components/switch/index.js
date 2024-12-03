import { useContext } from "react";
import { ThemeContext } from "styled-components";

import { CardSwitchText, Container, Option } from "./styles";
import { ImgDefault } from "../../../../../../assets/styles";

export default function Switch({
  firstValue,
  secondValue,
  firstTitle,
  secondTitle,
  firstDescription,
  secondDescription,
  firstIconDeactived,
  firstIconActivated,
  secondIconDeactived,
  secondIconActivated,
  firstSelected,
  secondSelected,
  handleSelect,
  disabled,
}) {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <Option
        className="cardSwitch"
        color={
          !disabled && firstSelected
            ? theme.colors.main[500]
            : theme.colors.light[100]
        }
        onClick={() => !disabled && handleSelect(firstValue)}
        ByName={disabled}
      >
        <div className={!disabled ? "" : "notiglow"} />
        <div className={!disabled ? "" : "notiborderglow"} />

        <div className="text">
          <CardSwitchText
            className="notititle"
            ByName={disabled}
            color={
              firstSelected ? theme.colors.light[100] : theme.colors.main[500]
            }
          >
            {firstTitle}
          </CardSwitchText>

          <CardSwitchText
            className="notibody"
            color={
              firstSelected ? theme.colors.light[100] : theme.colors.main[500]
            }
            ByName={disabled}
          >
            {firstDescription}
          </CardSwitchText>
        </div>

        {firstIconActivated && firstIconDeactived && (
          <ImgDefault
            width={"40px"}
            height={"40px"}
            style={{
              position: "absolute",
              zIndex: 9,
              right: "8px",
              bottom: "16px",
            }}
            src={
              firstSelected || disabled
                ? firstIconDeactived
                : firstIconActivated
            }
          />
        )}
      </Option>

      <Option
        className="cardSwitch"
        color={
          secondSelected ? theme.colors.main[500] : theme.colors.light[100]
        }
        onClick={() => !disabled && handleSelect(secondValue)}
        ByName={disabled}
      >
        <div className={disabled ? "" : "notiglow"} />
        <div className={disabled ? "" : "notiborderglow"} />

        <div className="text">
          <CardSwitchText
            className="notititle"
            color={secondSelected ? "#E9EDF8" : theme.colors.main[500]}
            ByName={disabled}
          >
            {secondTitle}
          </CardSwitchText>

          <CardSwitchText
            className="notibody"
            color={secondSelected ? "#E9EDF8" : theme.colors.main[500]}
            ByName={disabled}
          >
            {secondDescription}
          </CardSwitchText>
        </div>

        {secondIconActivated && secondIconDeactived && (
          <ImgDefault
            width={"40px"}
            height={"40px"}
            style={{
              position: "absolute",
              zIndex: 9,
              right: "8px",
              bottom: "16px",
            }}
            src={
              secondSelected || disabled
                ? firstIconDeactived
                : firstIconActivated
            }
          />
        )}
      </Option>
    </Container>
  );
}
