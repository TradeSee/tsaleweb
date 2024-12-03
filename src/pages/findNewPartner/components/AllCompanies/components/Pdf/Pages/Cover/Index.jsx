import Content from "./Components/Content";
import { Container } from "./styles";

// Create Document Component
// eslint-disable-next-line react/prop-types
export default function Cover({ country, role, selectedHsCodes, company }) {
  return (
    <Container>
      <Content company={company} role={role} selectedHsCode={selectedHsCodes} />
    </Container>
  );
}
