/* eslint-disable react/prop-types */

import { Text } from "@react-pdf/renderer";

import { Container } from "./styles";
import Footer from "../../components/Footer";

// Create Document Component
export default function Summary({ companies }) {
  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "90%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            columnGap: "40%",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Summary</Text>
          </div>

          <div
            style={{
              display: "grid",
              marginTop: 12,
              gridTemplateRows: "repeat(5, 12px)",
              gridTemplateColumns: "repeat(2, 1fr)",
              alignItems: "center",
              columnGap: 8,
              rowGap: 4,
            }}
          >
            {companies.map((company, index) => (
              <div
                key={index + 2}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "min-content",
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    marginRight: 8,
                  }}
                >
                  {index + 1}.
                </Text>

                <Text style={{ fontSize: 10 }}>
                  {" "}
                  {company?.profile?.companyName?.toUpperCase()}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p
        style={{
          fontSize: 12,
          width: "90%",
          alignSelf: "center",
          background: "#F4F4F4",
          padding: 8,
          marginTop: 12,
          borderRadius: 8,
        }}
      >
        Obs.: The list start with the company that has the bigger results in
        Importation or exportation.
      </p>

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Footer />
      </div>
    </Container>
  );
}
