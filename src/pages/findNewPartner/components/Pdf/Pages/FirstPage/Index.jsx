import Header from "../../components/Header";
import { CriteriaFirst } from "../../components/Criteria";
import Content from "./Components/Content";
import { Container } from "./styles";
import Summary from "../Summary";

// Create Document Component
// eslint-disable-next-line react/prop-types
export default function FirstPage({ data, companies }) {
  return (
    <Container>
      <Header />
      <CriteriaFirst />
      <Content general={data} />
      <Summary companies={companies} />
    </Container>
  );
}
