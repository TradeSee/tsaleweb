import { Link } from "react-router-dom";

import { TagInfo } from "../../utils/tagToInfo";
import { Container, NewsText, NewsTitle } from "./styles";

export default function NewsCard({ data }) {
  return (
    <Container>
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={`/stayinformed/${data.id}`}
      >
        <TagInfo type={data.type} />
        <NewsTitle>{data.text}</NewsTitle>
        <NewsText>{data.content} </NewsText>
        <span style={{ color: "#BBB", fontSize: 12 }}>By Argus</span>
      </Link>
    </Container>
  );
}
