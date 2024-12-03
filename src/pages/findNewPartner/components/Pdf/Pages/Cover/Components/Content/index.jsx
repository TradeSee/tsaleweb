/* eslint-disable react/prop-types */

import { format } from "date-fns";
import { Container } from "./styles";

import Logotype from "../../../../../../../../icons/T-SaleMetals-03.png";
import { useEffect, useMemo, useState } from "react";
import { auth } from "../../../../../../../../database/config";
import getUserInfo from "../../../../../../../../hooks/getUsers";
import { authScreen } from "../../../../../../../../contexts/auth";
import Capitalize from "../../../../../../../../utils/capitalize";
import HsCodeList from "../../../../../../../../hooks/HsCodeList";
import { Navigate } from "react-router-dom";

export default function Content({ company, role }) {
  const [userInfo, setUserInfo] = useState(null);
  const [auth, setAuth] = useState(false);
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    authScreen().then((res) => {
      if (res) {
        setTimeout(() => {
          setAuth(true);
        }, 1000);
        requestHsList();
      } else {
        setTimeout(() => {
          Navigate("/");
        }, 2000);
      }
    });
  }, []);

  const requestHsList = () => {
    if (products.length === 0) {
      HsCodeList()
        .then((data) => {
          const sortedProduts = data
            .map((prod) => ({
              ...prod,
              hsCode: Number(prod.hsCode.replace(/\./g, "")),
            }))
            .sort((a, b) => a.hsCode - b.hsCode);

          const fixedProducts = sortedProduts.map((prod) => ({
            ...prod,
            hsCode: prod.hsCode.toString(),
          }));

          setProducts(fixedProducts);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const correctHsCodes = useMemo(
    () =>
      products.map((hsCode) => {
        return {
          ...hsCode,
          value: `${hsCode.hsCode} - ${hsCode.hsName}`,
        };
      }),
    [products]
  );

  const selectedHsCodes = useMemo(
    () =>
      company?.matchedHsCodes?.map((hs) =>
        correctHsCodes?.filter((code) => code.hsCode === hs)
      ),
    [correctHsCodes, company]
  );

  return (
    <Container>
      {userInfo && (
        <>
          <div className="bar" />
          <div>
            <h2 style={{ wordSpacing: -20 }}>BUSINESS REPORT</h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 12 }}>
                {format(new Date(), "MM/dd/yyyy")} - {userInfo?.userData?.name}{" "}
                {userInfo?.userData?.lastName}
              </span>
              <span style={{ fontSize: 12 }}>
                Country: {Capitalize(company?.country)}
              </span>
              <span style={{ fontSize: 12 }}>Role: {role}</span>
              {selectedHsCodes?.length > 0 && (
                <>
                  <span
                    style={{
                      maxWidth: "100%",
                      fontSize: 12,
                      position: "relative",
                    }}
                  >
                    Hs Code:{" "}
                    <div
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
                      {selectedHsCodes?.map((product, index) => (
                        <>
                          {index > 0 && <br />}
                          <span
                            style={{
                              fontSize: 12,
                              textAlign: "left",
                              margin: 0,
                            }}
                          >
                            {product[0].value}
                          </span>
                        </>
                      ))}
                    </div>
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
