import { useContext, useEffect, useState } from "react";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import { ThemeContext } from "styled-components";
import nameIcon from "../../../../icons/nameIcon.png"

import { Input, Select } from "./styles";
import { GroupInput, ImgOpt, InputDefault, SelectDefault, TextDefault } from "../../../../assets/styles";
import SelectIcon from "../../../../icons/NullTrade.png"

export function FloatInput({
  value,
  onChange,
  label,
  error,
  type,
  notRequired,
  isReadOnly,
  img,
  imgX,
  imgY
}) {
  return (
    <>     
      <GroupInput
      style={{ marginBottom: 10 }}
      className="groupInputSale"
      >
        {value ? (
          <TextDefault color="#8a97aa" size="13px" bold="400" style={{position: "absolute", top: -30, left: 5}}>{label}</TextDefault>
        ) : ""}
        <ImgOpt className="iconInputSale" src={img} height={imgY} width={imgX}/>
        <InputDefault
          style={{ paddingLeft: 40 }}
          className="inputSale"
          placeholder={label}
          type="text"
          value={value}
          onChange={onChange}        
        />     
      </GroupInput>      
    </>
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

    <GroupInput className="groupInputSale" style={{ marginBottom: 10 }}>
      <TextDefault color="#8a97aa" size="13px" bold="400" style={{position: "absolute", top: -30, left: 5}}>{label}</TextDefault>
      <SelectDefault
        className={`selectSale inputSale`}
        placeholder={label}
        type="text"
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        style={{ height: 45 }}
      >
        {children}       
      </SelectDefault>
      <img className="iconInputHide" src={SelectIcon} style={{height: 8, width: 8}} />    
    </GroupInput>


  );
}
