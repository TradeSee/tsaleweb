import React, { useState, useEffect } from "react";
import { ContainerHome, ContainerUniqueStay } from "../../../assets/styles";
import Drawer from "../../../components/Drawer";
import { Grid } from "@mui/material";
import { TagInfo } from "../utils/tagToInfo";
import { useParams } from "react-router-dom";
import { useNews } from "../../../hooks/getNews";
import "../../../App.css";

export default function SingleStayInformed() {
  const { id } = useParams();
  const { newsData, loading } = useNews();
  const [data, setData] = useState("");

  useEffect(() => {
    if (!loading) {
      setData(newsData);
    }
  }, [loading, newsData]);
  const [singleItem, setSingleItem] = useState(null);

  useEffect(() => {
    const selectedItem = data[id];
    setSingleItem(selectedItem);
  }, [data, id]);

  const [toggleDrawer, useTroggleDawer] = useState(false);
  function SetToggle(state) {
    useTroggleDawer(state);
    console.log(state);
  }
  return (
    <ContainerHome>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={2}>
          <Drawer handleToggle={SetToggle} initState={toggleDrawer} />
        </Grid>
        <Grid sx={{ marginLeft: "75px" }}>
          <h1> Highlights</h1>
          <ContainerUniqueStay>
            <>
              {loading ? (
                <p>Carregando...</p>
              ) : (
                <>
                  {singleItem && (
                    <div>
                      <TagInfo type={singleItem.type} /> - {singleItem.text}{" "}
                      published in {singleItem.published}
                      <p style={{ textAlign: "justify" }}>
                        {singleItem.content
                          .split(".")
                          .map((paragraph, index) => (
                            <React.Fragment key={index}>
                              {paragraph.trim()}.
                              {index <
                                singleItem.content.split(".").length - 1 && (
                                <br />
                              )}
                            </React.Fragment>
                          ))}
                      </p>
                    </div>
                  )}
                </>
              )}
            </>
          </ContainerUniqueStay>
        </Grid>
      </Grid>
    </ContainerHome>
  );
}
