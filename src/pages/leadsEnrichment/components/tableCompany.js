import React from "react";
import { Table } from "antd";
import { deleteCredit, historyCredits } from "../../../hooks/credits";
import { saveAnalytics } from "../../../hooks/analytics";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { addLeadView } from "../../../hooks/findNewPartner";

const LinksTable = ({
  data,
  companyName,
  userId,
  userName,
  onClick,
  isTrade,
  companyId
}) => {
  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "Possible links, Website and more",
      dataIndex: "link",
      key: "link",
      render: (text, record) => {
        const url = text?.replace(
          "http://www.google.com/url?esrc=s&q=&rct=j&sa=U&url=",
          ""
        );
        const cleanUrl = url.split("/")[2];

        return (
          <a href={`${url}`} target="_blank" rel="noreferrer">
            {url}
          </a>
        );
      },
    },
    {
      title: "Description",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Leads",
      dataIndex: "link",
      key: "link",
      render: (text, record) => {
        const url = text?.replace(
          "http://www.google.com/url?esrc=s&q=&rct=j&sa=U&url=",
          ""
        );
        const cleanUrl = url.split("/")[2];

        return (
          <>
            {isTrade ? (
              <a href="#" onClick={() => onClick(cleanUrl)}>
                <ContactMailIcon />
              </a>
            ) : (
              <a href="#" onClick={() => handleClick(cleanUrl)}>
                <ContactMailIcon />
              </a>
            )}
          </>
        );
      },
    },
  ];

  const formattedDate = new Date().toISOString();

  const handleClick = async (urlCompany) => {
    try {
      deleteCredit(userId, 1);
      historyCredits(
        {
          text: `Credits used with company profile on Leads Enrichment`,
          type: "decrease",
          date: formattedDate,
          credits: 1,
        },
        userId
      );
      const infoA = {
        action: `Search`,
        date: formattedDate,
        page: "Leads Enrichment",
        keywords: `${companyName}`,
        name: userName,
      };
      saveAnalytics(userId, infoA);     
      const url = `/leadsenrichment-profileCompany?urlCompany=${encodeURIComponent(
        urlCompany
      )}&companyName=${encodeURIComponent(companyName)}`;
      window.open(url, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  const rankedData = data.map((item, index) => {
    let link = item.link.match(/^(.*?)(?=›)/);
    link = link ? link[0].trim() : item.link;
    return { ...item, rank: index + 1, link };
  });
  return <Table dataSource={rankedData} columns={columns} />;
};

export default LinksTable;
