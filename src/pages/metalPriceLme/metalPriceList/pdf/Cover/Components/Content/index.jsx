/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";

import { format } from "date-fns";
import { Container } from "./styles";

import Logotype from "../../../../../../../icons/T-SaleMetals-03.png";
import { auth } from "../../../../../../../database/config";
import getUserInfo from "../../../../../../../hooks/getUsers";
import { authScreen } from "../../../../../../../contexts/auth";
import Capitalize from "../../../../../../../utils/capitalize";
import HsCodeList from "../../../../../../../hooks/HsCodeList";

export default function Content({ metal }) {
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

  return (
    <Container>
      {userInfo && (
        <>
          <div className="bar" />
          <div>
            <h2 style={{ wordSpacing: -116 }}>BUSINESS REPORT</h2>
            <span style={{ fontSize: 12 }}>
              {format(new Date(), "MM/dd/yyyy")} - {userInfo?.userData?.name}{" "}
              {userInfo?.userData?.lastName}
            </span>
            <br />
            <span style={{ fontSize: 12 }}>
              Metal Name: {Capitalize(metal?.MetalName)}
            </span>
            <br />
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
