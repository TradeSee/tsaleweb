import Content from "./Components/Content";
import { Container } from "./styles";

// Create Document Component
// eslint-disable-next-line react/prop-types
export default function Cover({ metal }) {
  return (
    <Container>
      <Content metal={metal} />
    </Container>
  );
}
