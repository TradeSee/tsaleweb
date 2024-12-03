/* eslint-disable react/prop-types */

import { format } from "date-fns";
import {
  Container,
  FirstBlock,
  FourthBlock,
  OrderInfo,
  Payments,
  RegularInfo,
  SecondBlock,
  Signature,
  StyledContent,
  Table,
  ThirdBlock,
} from "./styles";

import Capitalize from "../../../../../../../../utils/capitalize";
import { useEffect, useState } from "react";
import getUserInfo, {
  getCompanyUser,
} from "../../../../../../../../hooks/getUsers";

// Create Document Component
export default function Content({ info, company }) {
  const [companyData, setCompanyData] = useState();

  const cleanShipweight = info.shipWeight.map(
    (weight) => weight.match(/\d+(\.\d+)?/)[0]
  );

  const priceForTon = info.priceForTon
    .reduce((acc, actual) => acc + actual, 0)
    .toFixed(2);
  const shipWeight = parseFloat(
    cleanShipweight.reduce(
      (acc, actual) => parseFloat(acc) + parseFloat(actual),
      0
    )
  );

  const subtotal = priceForTon * shipWeight;

  const totalTaxes = parseFloat(info.totalTx.match(/\d+(\.\d+)?/)[0]);
  const shippingHandling =
    parseFloat(info.costImport.match(/\d+(\.\d+)?/)[0]) +
    parseFloat(info.costBroker.match(/\d+(\.\d+)?/)[0]) +
    parseFloat(info.costPort.match(/\d+(\.\d+)?/)[0]) +
    parseFloat(info.costTrasp.match(/\d+(\.\d+)?/)[0]) +
    parseFloat(info.costOrigin.match(/\d+(\.\d+)?/)[0]) +
    parseFloat(info.costMaritime.match(/\d+(\.\d+)?/)[0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserInfo();
        return userData;
      } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error);
      }
    };

    fetchData().then((res) =>
      getCompanyUser(res.uid).then((res) => setCompanyData(res))
    );
  }, []);

  return (
    <Container>
      <div className="bar"></div>

      <StyledContent>
        <FirstBlock>
          <RegularInfo>
            <h2>Your Company</h2>
            <span>123 Street Name</span>
            <br />
            <span>Your City, st 123</span>
            <br />
            <span>(123) 456-7890</span>
          </RegularInfo>

          <RegularInfo style={{ gridColumn: 1 }}>
            <h2>Ship Via</h2>
            <span>{info.costIncoterm}</span>
          </RegularInfo>

          <OrderInfo style={{ gridColumn: 3, gridRow: 1 }}>
            <h2>Purchase Order</h2>
            <p>
              <span>Date</span> <span>{format(Date.now(), "MM/dd/yyyy")}</span>
            </p>
          </OrderInfo>

          <RegularInfo style={{ gridColumn: 3 }}>
            <h2>Terms</h2>
            <span>Shipping & Payment</span>
          </RegularInfo>

          <hr />
        </FirstBlock>

        <SecondBlock>
          <RegularInfo>
            <h2>Supplier</h2>

            {companyData && <p>{companyData.companyN}</p>}

            <p>
              {companyData && <span>{companyData.corporateName}</span>}
              <br />
              {companyData && <span>{companyData.address}</span>}
              <br />
              {companyData && (
                <span>
                  {companyData.City === "" ? "City" : companyData.City},{" "}
                  {companyData.state === "" ? "State" : companyData.state}, Zip
                </span>
              )}

              <br />
              <span>Phone Number</span>
              <br />
              <span>Email</span>
              <br />
            </p>
          </RegularInfo>

          <RegularInfo style={{ gridColumn: 3 }}>
            <h2>Ship To</h2>

            <p>{company ? company?.country || "Country" : "Country"}</p>

            <p>
              <span>
                {company
                  ? company?.companyName || "Company Name"
                  : "Company Name"}
              </span>
              <br />
              <span>
                {company
                  ? company?.addressList === ""
                    ? "Street Address"
                    : company?.addressList
                  : "Street Address"}
              </span>

              <br />
              <span>
                {company
                  ? company?.city === ""
                    ? "City"
                    : company?.city
                  : "City"}
                ,{" "}
                {company
                  ? company?.state === ""
                    ? "State"
                    : company?.state
                  : "State"}
                ,{" "}
                {company
                  ? company?.zipCode === ""
                    ? "Zip"
                    : company?.zipCode
                  : "Zip"}
              </span>
              <br />
              <span>Phone Number</span>
              <br />
              <span>Email</span>
              <br />
            </p>
          </RegularInfo>

          <hr />
        </SecondBlock>

        <ThirdBlock>
          <Table>
            <thead>
              <tr>
                <th>Item #</th>
                <th style={{ width: 200 }}>Description</th>

                <th style={{ width: 100 }}>Qty</th>
                <th style={{ width: 140 }}>Price Per Ton</th>
                <th style={{ width: 100 }}>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {info.hsCodeSel.map((hsCode, index) => (
                <tr key={hsCode.key}>
                  <td>{hsCode.hsCode}</td>
                  <td style={{ width: 200 }}>{hsCode.hsName}</td>

                  <td style={{ width: 100 }}>{info.shipWeight[index]}</td>
                  <td style={{ width: 140 }}>
                    $ {info.priceForTon[index].toFixed(2)}
                  </td>
                  <td style={{ width: 100 }}>
                    $
                    {(
                      info.priceForTon[index].toFixed(2) *
                      parseFloat(cleanShipweight[index]).toFixed(2)
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <hr />
        </ThirdBlock>

        <FourthBlock>
          <textarea
            placeholder="Notes"
            value={info?.description}
            style={{ resize: "none" }}
          />

          <Payments>
            <div className="priceText">
              <div>
                <span>Cost Import</span>
                <span>Cost Port</span>
                <span>Cost Origin</span>
                <span>Cost Transportation</span>
                <span>Cost Maritime</span>
                <span>Cost Broker</span>
                <span>Tax Rate</span>
                <span>Shipping & Handling</span>
                <span>Subtotal</span>
                <span>Subtotal Less discount</span>
              </div>

              <span>Total</span>
            </div>

            <div className="prices">
              <div>
                <span>
                  $
                  {parseFloat(info.costImport.match(/\d+(\.\d+)?/)[0]).toFixed(
                    2
                  )}
                </span>
                <span>
                  $
                  {parseFloat(info.costPort.match(/\d+(\.\d+)?/)[0]).toFixed(2)}
                </span>
                <span>
                  $
                  {parseFloat(info.costOrigin.match(/\d+(\.\d+)?/)[0]).toFixed(
                    2
                  )}
                </span>
                <span>
                  $
                  {parseFloat(info.costTrasp.match(/\d+(\.\d+)?/)[0]).toFixed(
                    2
                  )}
                </span>
                <span>
                  $
                  {parseFloat(
                    info.costMaritime.match(/\d+(\.\d+)?/)[0]
                  ).toFixed(2)}
                </span>
                <span>
                  $
                  {parseFloat(info.costBroker.match(/\d+(\.\d+)?/)[0]).toFixed(
                    2
                  )}
                </span>
                <span>{totalTaxes}%</span>
                <span>${shippingHandling.toFixed(2)}</span>
                <span>${subtotal.toFixed(2)}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <span>${subtotal.toFixed(2)}</span>
            </div>
          </Payments>
        </FourthBlock>

        <Signature>
          <h1>Approved By:</h1>
          <hr />
          <div>
            <span>Authorization Signature</span>
            <span>Date</span>
          </div>
        </Signature>
      </StyledContent>
    </Container>
  );
}
