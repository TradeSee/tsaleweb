import React, { useEffect, useState } from "react";
import EmailIcon from "../../icons/mail.png";
import LockIcon from "../../icons/padlock.png";
import HidePass from "../../icons/hidden.png";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import {
  ContainerWithMap,
  MapaMundi,
  FormContainer,
  Form,
  FormTitle,
  FlexRow,
  Center,
  CustomLink,
  GroupInput,
  InputDefault,
  ImgOpt,
  ContainerForm,
  ContainerErroLogin,
} from "../../assets/styles";
import ButtonBlue from "../../components/myButton";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authScreen, signIn } from "../../contexts/auth";
import Warning from "../../icons/cancel.png";
import { Visibility } from "@mui/icons-material";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorLogin, setErrorLogin] = useState("erroStep0");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (email && pass) {
      signIn(email, pass)
        .then((msg) => {
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
          setErrorLogin("erroStep1");
          setTimeout(() => {
            setErrorLogin("erroStep2");
          }, 5000);
        });
    } else {
      setErrorLogin("erroStep1");
      setTimeout(() => {
        setErrorLogin("erroStep2");
      }, 5000);
    }
  };

  useEffect(() => {
    authScreen().then((res) => {
      if (res) {
        navigate("/home");
      }
    });
  });

  return (
    <ContainerWithMap>
      <ContainerErroLogin className={errorLogin}>
        <div class="cardErroLogin">
          <img class="imgErroLogin" src={Warning} />
          <div class="textBoxErroLogin">
            <div class="textContentErroLogin">
              <p class="h1ErroLogin">Not authenticated</p>
              <span class="spanErroLogin"></span>
            </div>
            <p class="pErroLogin">Incorrect email or password!</p>
            <div></div>
          </div>
        </div>
      </ContainerErroLogin>
      <MapaMundi />
      <FormContainer>
        <Form>
          <ContainerForm>
            <FormTitle>Sign In</FormTitle>
            <GroupInput className="groupInputSale">
              <ImgOpt className="iconInputSale" src={EmailIcon} />
              <InputDefault
                className="inputSale"
                placeholder="Email"
                type="email"
                id="loginEmail"
                value={email}
                style={{ paddingLeft: 40 }}
                onChange={(item) => setEmail(item.target.value)}
              />
            </GroupInput>

            <GroupInput style={{ marginBottom: 10 }} className="groupInputSale">
              <ImgOpt className="iconInputSale" src={LockIcon} />
              <InputDefault
                className="inputSale"
                placeholder="Password"
                type={isPasswordVisible ? "text" : "password"}
                id="loginSenha"
                value={pass}
                style={{ paddingLeft: 40 }}
                onChange={(item) => setPass(item.target.value)}
              />
              {isPasswordVisible ? (
                <div
                  onClick={() => setIsPasswordVisible(false)}
                  className="iconInputHide"
                  style={{
                    position: "absolute",
                    right: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Visibility sx={{ fontSize: 20, color: "#8A97AA" }} />
                </div>
              ) : (
                <ImgOpt
                  className="iconInputHide"
                  src={HidePass}
                  onClick={() => setIsPasswordVisible(true)}
                />
              )}
            </GroupInput>

            <FlexRow>
              <FormControlLabel
                control={<Checkbox sx={{ color: "#e9edf8" }} />}
                label={
                  <span
                    className="checkbox-label"
                    style={{ fontSize: 13, color: "#4D6484" }}
                  >
                    Remember
                  </span>
                }
                className="checkbox-label"
              />
              <span style={{ flex: 1 }}></span>
              <CustomLink href="forgot-password">Forgot password?</CustomLink>
            </FlexRow>
            <ButtonBlue onClick={handleClick} width="290px" marginTop={"20px"}>
              Login
            </ButtonBlue>
            <Center>
              <Typography mt={1} variant="subtitle2" color="#4D6484">
                Don't have an account?
                <Link
                  underline="none"
                  variant="subtitle2"
                  href="/register"
                  color="#366DFB"
                >
                  {" "}
                  Register Now
                </Link>
              </Typography>
            </Center>
          </ContainerForm>
        </Form>
      </FormContainer>
    </ContainerWithMap>
  );
}

export default Login;
