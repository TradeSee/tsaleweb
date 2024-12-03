import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextDefault } from "../../../../assets/styles";
import { message } from "antd";
import styled, { ThemeContext } from "styled-components";
import InfoIcon from "@mui/icons-material/Info";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import { Input } from "antd";
import { stripeService } from "../../../../service/apiStripe";
import { addFeedback } from "../../../../hooks/getUsers";
const { TextArea } = Input;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 450,
  bgcolor: "#F5F5F5",
  borderRadius: 8,
  boxShadow: 24,
  p: 4,
};

const CancelButton = styled.button`
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.bgColor};
  margin-right: 10px;
  width: 200px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InRow = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MyLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d1d1d1;
  margin-top: 14px;
  margin-bottom: 14px;
`;

export default function ModalCancelSubs({
  visible,
  onCancel,
  subscriptionId,
  customerId,
  userId,
}) {
  const theme = useContext(ThemeContext);

  const [value, setValue] = useState("");
  const [step, setStep] = useState(0);

  const formattedDate = new Date().toISOString();

  function cancelPlan() {
    fetch("https://api4242/cancel-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscriptionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        addFeedback(userId, value, formattedDate);
        let successMessage = "Plan successfully canceled";
        message.success(successMessage);
      })
      .catch((error) => {
        console.error("Erro ao obter o clientSecret:", error);
      });
  }

  async function createPortal() {
    if (customerId) {
      try {
        const response = await stripeService.createportal(customerId);
        const newWindow = window.open(response?.data?.url, "_blank");
        newWindow.focus();
      } catch (error) {
        console.error("Erro ao gerar o token:", error);
      }
    }
  }

  const handleSubscribe = () => {
    createPortal();
  };

  const handleCancelSubscription = () => {
    cancelPlan();
  };

  const exitPage = () => {
    setStep(0);
    onCancel();
  };

  return (
    <div>
      <Modal
        open={visible}
        onClose={onCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <InRow>
            <TextDefault
              color={theme.colors.danger.main}
              bold={"700"}
              size={"10px"}
            >
              CANCEL PLAN
            </TextDefault>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={exitPage} />
          </InRow>
          {step === 0 ? (
            <>
              <br />

              <TextDefault color={"#000000"} bold={"700"} size={"28px"}>
                You're about to cancel your subscription
              </TextDefault>
              <br />
              <br />
              <TextDefault
                color={theme.colors.gray[400]}
                bold={"400"}
                size={"14px"}
              >
                Once your subscription expires on your next invoice date, your
                credits won't be renewed...
              </TextDefault>
              <br />
              <MyLine />

              <div>
                <CancelIcon
                  sx={{
                    color: theme.colors.danger.main,
                    fontSize: "1.2rem",
                    verticalAlign: "middle",
                  }}
                />{" "}
                <TextDefault color={"#00000"} bold={"500"} size={"14px"}>
                  Web & Mobile
                </TextDefault>
              </div>
              <div style={{ marginTop: "5px" }}>
                <CancelIcon
                  sx={{
                    color: theme.colors.danger.main,
                    fontSize: "1.2rem",
                    verticalAlign: "middle",
                  }}
                />{" "}
                <TextDefault color={"#00000"} bold={"500"} size={"14px"}>
                  Company Data, Enrichment leads and Market Intelligence
                </TextDefault>
              </div>
              <div style={{ marginTop: "5px" }}>
                <InfoIcon
                  sx={{
                    color: theme.colors.gray[400],
                    fontSize: "1.2rem",
                    verticalAlign: "middle",
                  }}
                />{" "}
                <TextDefault color={"#00000"} bold={"500"} size={"14px"}>
                  Don't worry! The data you have on plataform will be safe.
                </TextDefault>
              </div>

              <br />
              <br />
              <br />
              <ButtonsContainer>
                <CancelButton
                  bgColor={theme.colors.main[500]}
                  textColor={"#fff"}
                  onClick={handleSubscribe}
                >
                  Downgrade
                </CancelButton>
                <CancelButton
                  bgColor={theme.colors.gray[50]}
                  textColor={theme.colors.gray[400]}
                  onClick={() => setStep(1)}
                >
                  Cancel subscription
                </CancelButton>
              </ButtonsContainer>
            </>
          ) : (
            <>
              <br />
              <br />
              <TextDefault color={"#000000"} bold={"700"} size={"28px"}>
                {`Sorry to see you go :(`}
              </TextDefault>
              <br />
              <TextDefault
                color={theme.colors.gray[400]}
                bold={"400"}
                size={"13px"}
              >
                We hope you continue to enjoy our platform
              </TextDefault>
              <br />
              <MyLine />
              <br />

              <TextDefault color={"#000000"} bold={"400"} size={"14px"}>
                Tell us why are you leaving?
              </TextDefault>
              <br />
              <TextArea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Share your feedback here..."
                autoSize={{
                  minRows: 3,
                  maxRows: 5,
                }}
              />

              <br />
              <br />
              <ButtonsContainer>
                <CancelButton
                  bgColor={theme.colors.main[500]}
                  textColor={"#fff"}
                  onClick={handleSubscribe}
                >
                  Downgrade
                </CancelButton>
                <CancelButton
                  bgColor={"#F5F5F5"}
                  textColor={theme.colors.gray[400]}
                  onClick={() => setStep(1)}
                >
                  Yes, cancel it
                </CancelButton>
              </ButtonsContainer>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
