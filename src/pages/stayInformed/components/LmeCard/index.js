import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import { getMetalPrice } from "../../../../hooks/metalPrice";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";

function LmeCard() {
  const cardStyles = {
    width: "300px",
    padding: "16px",
    borderRadius: "8px",
  };

  const itemStyles = {
    display: "flex",
    // justifyContent: "space-between",
    alignItems: "center",
    margin: "8px 0",
  };

  const iconStylesUp = {
    marginRight: "8px",
    color: "#008170",
  };

  const iconStylesDown = {
    marginRight: "8px",
    color: "#BB2525",
  };

  const iconStyles = {
    marginRight: "8px",
  };

  const pillStyles = {
    backgroundColor: "rgba(91, 91, 91, 0.13)",
    borderRadius: "12px",
    display: "inline-block",
    padding: "4px ",
    marginRight: "5px",
  };

  const [metal, setMetal] = useState([]);
  const [metalDois, setMetalDois] = useState([]);
  const [metalTres, setMetalTres] = useState([]);

  const convertedData = (data) => {
    if (!data) {
      return {
        MetalName: "Dados Não Disponíveis",
        value1: 0,
        value2: 0,
        value3: 0,
        value4: 0,
      };
    }
    return {
      MetalName: data.MetalName || "Dados Não Disponíveis",
      value1:
        data.value1 !== undefined
          ? parseFloat(data.value1.replace(",", "."))
          : 0,
      value2:
        data.value2 !== undefined
          ? parseFloat(data.value2.replace(",", "."))
          : 0,
      value3:
        data.value3 !== undefined
          ? parseFloat(data.value3.replace(",", "."))
          : 0,
      value4:
        data.value4 !== undefined
          ? parseFloat(data.value4.replace(",", "."))
          : 0,
    };
  };

  useEffect(() => {
    getMetalPrice().then((res) => {
      if (Array.isArray(res) && res.length >= 3) {
        const firstObject = res[0];
        const secondObject = res[1];
        const thirdObject = res[2];

        if (firstObject) {
          const metalData = convertedData(firstObject);
          setMetal(metalData);
        }

        if (secondObject) {
          const metalDataDois = convertedData(secondObject);
          setMetalDois(metalDataDois);
        }

        if (thirdObject) {
          const metalDataTres = convertedData(thirdObject);
          setMetalTres(metalDataTres);
        }
      } else {
        console.error("Não há dados suficientes no array ou formato inválido.");
      }
    });
  }, []);

  return (
    <Card style={cardStyles}>
      <CardContent>
        <div style={itemStyles}>
          <div style={pillStyles}>
            <Typography variant="caption">DAILY</Typography>
          </div>
          <Typography variant="caption">Metal Price</Typography>
        </div>
        <Divider />
        <div style={itemStyles}>
          {metal?.value1 > metal?.value4 ? (
            <TrendingUpIcon style={iconStylesUp} />
          ) : metal?.value1 < metal?.value4 ? (
            <TrendingDownIcon style={iconStylesDown} />
          ) : (
            <TrendingFlatIcon style={iconStyles} />
          )}
          <Typography
            variant="body1"
            style={{
              maxWidth: "230px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {metal?.MetalName}
          </Typography>
        </div>
        <div style={itemStyles}>
          {metalDois?.value1 > metalDois?.value4 ? (
            <TrendingUpIcon style={iconStylesUp} />
          ) : metalDois?.value1 < metalDois?.value4 ? (
            <TrendingDownIcon style={iconStylesDown} />
          ) : (
            <TrendingFlatIcon style={iconStyles} />
          )}
          <Typography
            variant="body1"
            style={{
              maxWidth: "230px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {metalDois?.MetalName}
          </Typography>
        </div>
        <div style={itemStyles}>
          {metalTres?.value1 > metalTres?.value4 ? (
            <TrendingUpIcon style={iconStylesUp} />
          ) : metalTres?.value1 < metalTres?.value4 ? (
            <TrendingDownIcon style={iconStylesDown} />
          ) : (
            <TrendingFlatIcon style={iconStyles} />
          )}
          <Typography
            variant="body1"
            style={{
              maxWidth: "230px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {metalTres?.MetalName}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

export default LmeCard;
