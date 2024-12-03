/* eslint-disable react/prop-types */

import { format } from "date-fns";
import { Container } from "./styles";

import Logotype from "../../../../../../../../../icons/T-SaleMetals-03.png";

export default function Content() {
  return (
    <Container>
      <div className="bar"></div>
      <div>
        <h2>BUSINESS REPORT</h2>
        <span style={{ fontSize: 20 }}>{format(new Date(), "MM/dd/yyyy")}</span>
      </div>

      <footer>
        <img src={Logotype} alt="Logotype" />
        <small>
          Analytics data manage and offered by T-Sale Metals -
          www.tsalemetals.com - All rights reserved
        </small>
      </footer>
    </Container>
  );
}
