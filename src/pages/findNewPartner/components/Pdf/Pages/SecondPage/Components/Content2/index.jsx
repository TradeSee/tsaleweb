import { StyleSheet } from "@react-pdf/renderer";

import { Table } from "./styles";

const styles = StyleSheet.create({
  Container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 4,
  },
  Logo: {
    width: 100,
    height: 100,
  },
  Title: {
    fontSize: 28,
    alignSelf: "flex-start",
  },
  TitleBold: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  Section: {
    display: "flex",
    width: "100%",
  },
  Content: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  ContentNinety: {
    marginTop: 64,
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  TextContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "20%",
  },
  Subtitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  info: {
    textAlign: "center",
    fontWeight: "semibold",
    maxWidth: "80%",
    fontSize: 20,
  },
  infoMargin: {
    marginTop: 24,
    textAlign: "center",
    fontWeight: "semibold",
    maxWidth: "80%",
    fontSize: 20,
  },
  DocsInfo: {
    display: "flex",
    flexDirection: "column",
  },
});

export default function Content2({ role, company }) {
  const TradingPartners =
    role === "Supplier"
      ? company?.exportTradingPartners
      : company?.importTradingPartners;

  return (
    <div style={styles.Container}>
      <div
        style={{
          width: "80%",
        }}
      >
        <h3
          style={{
            color: "#4B4B4B",
            fontSize: 16,
          }}
        >
          Top Trade Partners {role === "Supplier" ? "(Clients)" : "(Supplier)"}
        </h3>
        <span
          style={{
            color: "#A7A7A7",
            fontSize: 12,
          }}
        >
          {company?.companyName?.toUpperCase()}
        </span>
      </div>

      <Table colspan={3}>
        <tr>
          <th></th>
          <th>Company Name</th>
          <th>Country</th>
          <th>Market Share</th>
        </tr>
        {TradingPartners?.map((company, index) => (
          <>
            {index < 20 && (
              <tr key={company?.companyID}>
                <td>
                  <a
                    href={`https://app.tsalemetals.com/trade-data?companyName=${company.companyName}&companyId=${company.companyID}&country=${company.country}&role=${role}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#000" }}
                  >
                    {index + 1}
                  </a>
                </td>
                <td>
                  <a
                    href={`https://app.tsalemetals.com/trade-data?companyName=${company.companyName}&companyId=${company.companyID}&country=${company.country}&role=${role}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#000" }}
                  >
                    {company?.companyName?.toUpperCase()}{" "}
                  </a>
                </td>
                <td>
                  <a
                    href={`https://app.tsalemetals.com/trade-data?companyName=${company.companyName}&companyId=${company.companyID}&country=${company.country}&role=${role}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#000" }}
                  >
                    {company?.country?.toUpperCase()}{" "}
                  </a>
                </td>
                <td>
                  <a
                    href={`https://app.tsalemetals.com/trade-data?companyName=${company.companyName}&companyId=${company.companyID}&country=${company.country}&role=${role}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#000" }}
                  >
                    {company?.percentageShare?.toFixed(0)}%{" "}
                  </a>
                </td>
              </tr>
            )}
          </>
        ))}
      </Table>

      <p
        style={{
          fontSize: 12,
          maxWidth: "85%",
          marginLeft: 40,
          bottom: 0,
          right: 0,
          background: "#F4F4F4",
          padding: 12,
          borderRadius: 8,
          height: "min-content",
        }}
      >
        <strong>Top Trade Partners: </strong>
        {`are the main business partners and customs responsible for the purchase of this company’s products. In this listing, you can find the market share of each one as well as the partner's location.`}
      </p>
    </div>
  );
}
