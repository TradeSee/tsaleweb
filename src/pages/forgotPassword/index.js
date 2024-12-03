import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import {
  BtnDefault,
  CardForgot,
  ColumnContainer,
  Container,
  ContainerErroLogin,
  GroupInput,
  ImgDefault,
  ImgOpt,
  InputDefault,
  RowContainer,
  TextDefault,
} from "../../assets/styles";
import EmailIcon from "../../icons/mail.png";
import SendIcon from "../../icons/paper-plane.png";
import Warning from "../../icons/cancel.png";
import ResetPassword from "../../hooks/resetPasword";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(0);
  const [errorLogin, setErrorLogin] = useState("erroStep0");
  const [msgError, setMsgError] = useState(
    "Please fill in your email correctly before proceeding."
  );
  const [request, setRequest] = useState(false);
  const theme = useContext(ThemeContext);

  const navigate = useNavigate();

  const validEmail = () => {
    setRequest(true);
    if (email) {
      ResetPassword(email)
        .then(() => {
          setStep(1);
          setRequest(false);
        })
        .catch((error) => {
          console.log(error);
          setMsgError("There was an unexpected error, please try again later.");
          setRequest(false);
        });
    } else {
      setRequest(false);
      setErrorLogin("erroStep1");
      setTimeout(() => {
        setErrorLogin("erroStep2");
      }, 5000);
    }
  };
  return (
    <Container>
      <ContainerErroLogin className={errorLogin}>
        <div class="cardErroLogin">
          <img class="imgErroLogin" src={Warning} />
          <div class="textBoxErroLogin">
            <div class="textContentErroLogin">
              <p class="h1ErroLogin">Attention</p>
              <span class="spanErroLogin"></span>
            </div>
            <p class="pErroLogin">{msgError}</p>
            <div></div>
          </div>
        </div>
      </ContainerErroLogin>
      <CardForgot>
        <ColumnContainer style={{ height: "100%" }}>
          {step == 0 ? (
            <>
              <RowContainer
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextDefault color={theme.colors.main[500]} size="25px">
                  Forgot Password
                </TextDefault>
              </RowContainer>
              <TextDefault
                color="#8a97aa"
                size="14px"
                bold={"400"}
                style={{ marginTop: 20 }}
              >
                Please provide your email associated with your account. If there
                is a record in our database, we will send a password recovery
                email containing instructions for you to reset your password.
              </TextDefault>
              <ColumnContainer
                style={{
                  height: "100%",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <GroupInput className="groupInputSale">
                  <ImgOpt className="iconInputSale" src={EmailIcon} />
                  <InputDefault
                    className="inputSale"
                    placeholder="Email"
                    type="email"
                    id="forgotPasswordEmail"
                    value={email}
                    onChange={(item) => setEmail(item.target.value)}
                  />
                </GroupInput>

                {request ? (
                  <BtnDefault
                    style={{
                      marginTop: 20,
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      cursor: "not-allowed",
                    }}
                    disabled={true}
                  >
                    <div class="typing-indicator">
                      <div
                        class="typing-circle"
                        style={{ backgroundColor: "#fff" }}
                      ></div>
                      <div
                        class="typing-circle"
                        style={{ backgroundColor: "#fff" }}
                      ></div>
                      <div
                        class="typing-circle"
                        style={{ backgroundColor: "#fff" }}
                      ></div>
                      <div class="typing-shadow"></div>
                      <div class="typing-shadow"></div>
                      <div class="typing-shadow"></div>
                    </div>
                  </BtnDefault>
                ) : (
                  <BtnDefault style={{ marginTop: 20 }} onClick={validEmail}>
                    <TextDefault color="#fff" size="17px">
                      Continue
                    </TextDefault>
                  </BtnDefault>
                )}
              </ColumnContainer>
            </>
          ) : (
            <>
              <RowContainer
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextDefault color={theme.colors.main[500]} size="25px">
                  Sent!
                </TextDefault>
              </RowContainer>
              <TextDefault
                color="#4d4d4d"
                size="14px"
                bold={"400"}
                style={{ marginTop: 20, textAlign: "center" }}
              >
                A recovery email has been sent to {email}. If you don't receive
                the email within a few minutes, please check your spam folder or
                try again. Remember to double check if the email address you
                entered is correct.
              </TextDefault>
              <RowContainer
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ImgDefault src={SendIcon} width={"100px"} height={"100px"} />
              </RowContainer>
              <BtnDefault
                style={{ marginTop: 20 }}
                onClick={() => navigate("/")}
              >
                <TextDefault color="#fff" size="17px">
                  Back to login
                </TextDefault>
              </BtnDefault>
            </>
          )}
        </ColumnContainer>
      </CardForgot>
    </Container>
  );
}
