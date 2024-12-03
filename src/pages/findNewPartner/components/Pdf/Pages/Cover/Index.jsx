import Content from "./Components/Content";
import { Container } from "./styles";

// Create Document Component
// eslint-disable-next-line react/prop-types
export default function Cover({ company, role, selectedHsCodes }) {
  return (
    <Container>
      <Content
        company={company}
        role={role}
        selectedHsCodes={selectedHsCodes}
      />
    </Container>
  );
}
