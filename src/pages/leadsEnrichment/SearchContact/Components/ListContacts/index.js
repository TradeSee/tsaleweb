import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, Container, Content } from "./styles";
import Logo from "../../../../../icons/T-Logo.png";

import AllModal from "../../../../../components/AllModal";
import { deleteCredit, historyCredits } from "../../../../../hooks/credits";
import { saveAnalytics } from "../../../../../hooks/analytics";

export default function ListContacts({ contact, userId, userName }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(false);
  const navigate = useNavigate();

  console.log("contact", contact);

  function cleanCompanyName(url) {
    url = url.replace(/(^\w+:|^)\/\//, "");
    url = url.replace(/^www\./, "");
    url = url.replace(/\..*/, "");

    return url;
  }

  function handleSelectContact(contact) {
    setIsModalVisible(true);
    const cleanedCompanyName = cleanCompanyName(contact.companyName);

    setSelectedContact({ ...contact, companyName: cleanedCompanyName });
  }

  const formattedDate = new Date().toISOString();

  const infoC = {
    text: `Credits used with research on Leads Enrichment`,
    type: "decrease",
    date: formattedDate,
    credits: 1,
  };
  const infoA = {
    action: `Search`,
    date: formattedDate,
    page: "Leads Enrichment",
    keywords: `${contact?.name} - ${contact?.email}`,
    name: userName,
  };

  function confirma() {
    deleteCredit(userId, 1);
    historyCredits(infoC, userId);
    saveAnalytics(userId, infoA);
    navigate("/leadsenrichment-linkedin", { state: selectedContact });
  }

  return (
    <Container>
      <AllModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        message={"Proceeding will consume 1 credit from your balance. Confirm?"}
        title={"View full data"}
        onConfirm={confirma}
      />

      <Content>
        {contact?.email !== "Not Found" ? (
          <>
            <Card>
              <header>Contact Details</header>

              <section>
                <img src={Logo} alt="Logo" />

                <div>
                  <div className="title">
                    <h3>{contact?.name}</h3>

                    <span>{contact?.email}</span>
                  </div>

                  <button onClick={() => handleSelectContact(contact)}>
                    View full data
                  </button>
                </div>
              </section>
            </Card>
          </>
        ) : (
          <h2>No contact found</h2>
        )}
      </Content>
    </Container>
  );
}
