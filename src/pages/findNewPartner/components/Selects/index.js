import All from "../../assets/Icons/All";
import Compliance from "../../assets/Icons/Compliance";
import Email from "../../assets/Icons/Email";
import Profile from "../../assets/Icons/Profile";
import { Container, Icon } from "./styles";
import Aluminium from "../../../../icons/Al.png";
import Nickel from "../../../../icons/Ni.png";
import Tin from "../../../../icons/Sn.png";
import Cobre from "../../../../icons/Cu.png";
import Zinco from "../../../../icons/Zn.png";
import Lead from "../../../../icons/Pb.png";
import Cobalt from "../../../../icons/cobalt.png";

export default function InfoSelect({
  type = "Profile",
  isSelected,
  onSelect,
  iconType = "fnp",
}) {
  return (
    <Container onClick={() => onSelect((prevState) => !prevState)}>
      <Icon IsSelected={isSelected} iconType={iconType}>
        {type === "All" && <All color={isSelected ? "#366DFB" : "#8a97aa"} />}
        {type === "Email" && (
          <Email color={isSelected ? "#366DFB" : "#8a97aa"} />
        )}
        {type === "Profile" && (
          <Profile color={isSelected ? "#366DFB" : "#8a97aa"} />
        )}
        {type === "Compliance" && (
          <Compliance color={isSelected ? "#366DFB" : "#8a97aa"} />
        )}
        {type === "Aluminium" && <img src={Aluminium} alt={Aluminium} />}
        {type === "Nickel" && <img src={Nickel} alt={Nickel} />}
        {type === "Tin" && <img src={Tin} alt={Tin} />}
        {type === "Zinc" && <img src={Zinco} alt={Zinco} />}
        {type === "Lead" && <img src={Lead} alt={Lead} />}
        {type === "Copper" && <img src={Cobre} alt={Cobre} />}
        {type === "Cobalt" && <img src={Cobalt} alt={Cobalt} />}
      </Icon>

      <p>{type === "Compliance" ? "Compliance" : type}</p>
    </Container>
  );
}
