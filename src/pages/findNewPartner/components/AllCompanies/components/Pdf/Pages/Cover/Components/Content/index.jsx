/* eslint-disable react/prop-types */

import { format } from "date-fns";
import { Container } from "./styles";

import Logotype from "../../../../../../../../../../icons/T-SaleMetals-03.png";
import { useEffect, useState } from "react";
import getUserInfo from "../../../../../../../../../../hooks/getUsers";
import { authScreen } from "../../../../../../../../../../contexts/auth";
import Capitalize from "../../../../../../../../../../utils/capitalize";

export default function Content({ company, role, selectedHsCode }) {
  const [userInfo, setUserInfo] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    authScreen().then((res) => {
      if (res) {
        setTimeout(() => {
          setAuth(true);
        }, 2000);
      }
    });
  });

  useEffect(() => {
    if (auth) {
      const fetchData = async () => {
        try {
          const userData = await getUserInfo();
          setUserInfo(userData);
        } catch (error) {
          console.error("Erro ao buscar informações do usuário:", error);
        }
      };

      fetchData();
    }
  }, [auth]);

  return (
    <Container>
      {userInfo && (
        <>
          <div className="bar" />
          <div>
            <h2 style={{ wordSpacing: -64 }}>BUSINESS REPORT</h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 12 }}>
                {format(new Date(), "MM/dd/yyyy")} - {userInfo?.userData?.name}{" "}
                {userInfo?.userData?.lastName}
              </span>
              <span style={{ fontSize: 12 }}>
                Country: {Capitalize(company?.country)}
              </span>
              <span style={{ fontSize: 12 }}>Role: {role}</span>
              {selectedHsCode?.length > 0 && (
                <>
                  <span
                    style={{
                      maxWidth: "100%",
                      fontSize: 12,
                      position: "relative",
                    }}
                  >
                    Hs Code:{" "}
                    <section
                      style={{
                        top: 0,
                        width: "160mm",
                        left: 56,
                        position: "absolute",
                        textAlign: "left",
                        display: "flex",
                        flexDirection: "column",
                        padding: 0,
                      }}
                    >
                      {selectedHsCode?.map((product, index) => (
                        <>
                          {index > 0 && <br />}
                          <span
                            style={{
                              fontSize: 12,
                              textAlign: "left",
                              margin: 0,
                            }}
                          >
                            {product.hsCode} - {product.hsName}
                          </span>
                        </>
                      ))}
                    </section>
                  </span>
                </>
              )}
            </div>
          </div>

          <footer>
            <img src={Logotype} alt="Logotype" />
            <small>
              Analytics data manage and offered by T-Sale Metals -
              www.tsalemetals.com - All rights reserved
            </small>
          </footer>
        </>
      )}
    </Container>
  );
}
