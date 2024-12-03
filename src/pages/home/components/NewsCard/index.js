import React from "react";
import { TagInfo } from "../../../../pages/stayInformed/utils/tagToInfo";
import { Link } from "react-router-dom";
import { Card, CardContent, Header } from "./styles";
import { TextDefault } from "../../../../assets/styles";

export default function NewsCard({ item, index }) {
  return (
    <Card>
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        key={index}
        to={`/stayinformed/${item.id}`}
      >
        <Header>
          <TextDefault className="lineLM1" color="#4b4b4b" size='20px' style={{marginLeft: 10, width: '50%'}} >{item.text}</TextDefault>

          <TagInfo type={item.type} />
        </Header>

        <CardContent>
          <TextDefault className="lineLM3" color="#8a97aa" size='12px' bold='700' style={{marginTop: 15, marginLeft: 10}} >{item.content}</TextDefault>
        </CardContent>
      </Link>
    </Card>
  );
}
