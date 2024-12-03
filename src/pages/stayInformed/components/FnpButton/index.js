import { useNavigate } from "react-router-dom";

import IsoCompanie from "../../../../carousel/companiesv2.png";
import ResponsiveMapping from "../../../../components/ResponsiveMapping";
import { Container, Icon, IconContainer } from "./styles";

import { TextDefault, BtnBanner } from "../../../../assets/styles";

const { size } = ResponsiveMapping();

export default function FnpButton() {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate("/trade-data")}>
      <div>
        <h1>Trade Data!</h1>

        <TextDefault color={"#fff"} size={"15px"} bold={"100"}>
          Get access to all metal suppliers worldwide
        </TextDefault>

        <IconContainer>
          <Icon src={IsoCompanie} />
        </IconContainer>
      </div>
    </Container>
  );
}
