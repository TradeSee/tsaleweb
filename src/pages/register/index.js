import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import {
  ContainerWithMap,
  FormContainer,
  InputDefault,
  ImgOpt,
  ContainerForm,
  ContainerErroLogin,
  FormRegister,
  TextDefault,
  SelectDefault,
  GroupInputR,
  MapaMundiR,
  Center,
} from "../../assets/styles";
import ButtonBlue from "../../components/myButton";
import { Link, useNavigate } from "react-router-dom";
import { listEmail, requestRegister, signIn } from "../../contexts/auth";
import Warning from "../../icons/cancel.png";
import EmailIcon from "../../icons/mail.png";
import LockIcon from "../../icons/padlock.png";
import Name from "../../icons/broker.png";
import Ping from "../../icons/ping-v2.png";
import Stateicon from "../../icons/business.png";
import Country from "../../components/Flag";
import { message } from "antd";
import usePasswordValidation from "./util/validPass";
import { Typography } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { MuiTelInput } from "mui-tel-input";

function Register() {
  const [messageApi, contextHolder] = message.useMessage();
  const [errorLogin, setErrorLogin] = useState("erroStep0");
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [cPassword, setCpassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [validEmail, setValidEmail] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(true);
  const { isValidPassword, validationErrors, validatePassword } =
    usePasswordValidation();
  const theme = useContext(ThemeContext);

  const [value, setValue] = React.useState("");

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const [step1Data, setStep1Data] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: "",
  });

  const [step2Data, setStep2Data] = useState({
    addressLine1: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });

  const handleInputChange = (step, name, value) => {
    if (step === 1) {
      setStep1Data({
        ...step1Data,
        [name]: value,
      });
    } else if (step === 2) {
      setStep2Data({
        ...step2Data,
        [name]: value,
      });
    }
  };

  const handleNext = async () => {
    const step1Filled =
      step1Data.name !== "" &&
      step1Data.lastName !== "" &&
      step1Data.email !== "" &&
      step1Data.password !== "" &&
      step1Data.phone !== "" &&
      step1Data.role !== "";

    const step2Filled =
      step2Data.addressLine1 !== "" &&
      step2Data.city !== "" &&
      step2Data.state !== "" &&
      step2Data.country !== "" &&
      step2Data.postalCode !== "";

    const errors = await validatePassword(step1Data.password);

    if (
      currentStep === 1 &&
      step1Filled &&
      validEmail &&
      (!errors || !errors.length)
    ) {
      setCurrentStep(2);
    } else if (currentStep === 2 && step2Filled) {
      try {
        const uid = await requestRegister(step2Data, step1Data);
        if (uid) {
          signIn(step1Data?.email, step1Data?.password)
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
      } catch (error) {
        console.error("Error during registration:", error);
      }
    } else {
      console.log("Incomplete form data");
    }
  };

  const handleReturn = async () => {
    setCurrentStep(1);
  };

  const getFlag = (country) => {
    let filter = Country.filter((item) => {
      return item.country == country;
    });
    return filter[0].src;
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "This email has already been registered.",
    });
  };

  const errorPass = () => {
    messageApi.open({
      type: "error",
      content: "Passwords don't match.",
    });
  };

  function valid() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(step1Data.email)) {
      message.error("Invalid email format. Please enter a valid email address.");
      setValidEmail(false);
      return;
    }
     
    if (step1Data.email) {
      listEmail(step1Data.email).then((status) => {
        if (!status) {
          error();
          setValidEmail(false);
        } else {
          setValidEmail(true);
        }
      });
    }
  }

  function validEqual() {
    if (cPassword != step1Data.password) {
      errorPass();
    }
  }

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
      {contextHolder}
      <FormContainer>
        <FormRegister>
          <Center>
            {currentStep === 2 ? (
              <WestIcon
                onClick={handleReturn}
                sx={{
                  color: theme.colors.main[500],
                  cursor: "pointer",
                  marginRight: "50px",
                }}
              />
            ) : (
              <></>
            )}
            <TextDefault
              color={theme.colors.main[500]}
              size={"30px"}
              bold={"600"}
            >
              Register
            </TextDefault>
          </Center>
          <ContainerForm>
            {currentStep === 1 && (
              <>
                <GroupInputR className="groupInputSale">
                  <ImgOpt className="iconInputSale" src={Name} />
                  <InputDefault
                    style={{ paddingLeft: 40 }}
                    className="inputSale"
                    placeholder="First Name"
                    type="name"
                    value={step1Data.name}
                    onChange={(e) =>
                      handleInputChange(1, "name", e.target.value)
                    }
                  />
                </GroupInputR>
                <GroupInputR className="groupInputSale">
                  <ImgOpt className="iconInputSale" src={Name} />
                  <InputDefault
                    style={{ paddingLeft: 40 }}
                    className="inputSale"
                    placeholder="Last Name"
                    type="lastName"
                    value={step1Data.lastName}
                    onChange={(e) =>
                      handleInputChange(1, "lastName", e.target.value)
                    }
                  />
                </GroupInputR>
                <GroupInputR className="groupInputSale">
                  <ImgOpt className="iconInputSale" src={EmailIcon} />
                  <InputDefault
                    style={{ paddingLeft: 40 }}
                    className="inputSale"
                    placeholder="Email"
                    type="email"
                    value={step1Data.email}
                    onChange={(e) =>
                      handleInputChange(1, "email", e.target.value)
                    }
                    onBlur={valid}
                  />
                </GroupInputR>
                <GroupInputR className="groupInputSale">
                  <MuiTelInput
                    style={{
                      background: "#f8fafc",
                      width: "300px",
                      height: "100%",
                      borderRadius: "2px",
                      borderColor: theme.colors.light[100],
                    }}
                    className="inputSale"
                    placeholder="Phone"
                    type="phone"
                    value={step1Data.phone}
                    onChange={(value) => handleInputChange(1, "phone", value)}
                  />
                </GroupInputR>
                <GroupInputR className="groupInputSale">
                  <ImgOpt className="iconInputSale" src={LockIcon} />
                  <InputDefault
                    style={{ paddingLeft: 40 }}
                    className="inputSale"
                    placeholder="Password"
                    type={isPasswordVisible ? "password" : "text"}
                    value={step1Data.password}
                    onChange={(e) =>
                      handleInputChange(1, "password", e.target.value)
                    }
                  />

                  <button
                    style={{
                      position: "absolute",
                      right: 8,
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setIsPasswordVisible((prevState) => !prevState)
                    }
                  >
                    {isPasswordVisible ? (
                      <VisibilityOff
                        sx={{
                          opacity: 0.3,
                        }}
                      />
                    ) : (
                      <Visibility
                        sx={{
                          opacity: 0.3,
                        }}
                      />
                    )}
                  </button>
                </GroupInputR>
                <GroupInputR className="groupInputSale">
                  <ImgOpt className="iconInputSale" src={LockIcon} />
                  <InputDefault
                    style={{ paddingLeft: 40 }}
                    className="inputSale"
                    placeholder="Confirm password"
                    type={isConfirmPasswordVisible ? "password" : "text"}
                    value={cPassword}
                    onChange={(e) => setCpassword(e.target.value)}
                    onBlur={validEqual}
                  />

                  <button
                    style={{
                      position: "absolute",
                      right: 8,
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setIsConfirmPasswordVisible((prevState) => !prevState)
                    }
                  >
                    {isConfirmPasswordVisible ? (
                      <VisibilityOff
                        sx={{
                          opacity: 0.3,
                        }}
                      />
                    ) : (
                      <Visibility
                        sx={{
                          opacity: 0.3,
                        }}
                      />
                    )}
                  </button>
                </GroupInputR>
                <GroupInputR className="groupInputSale">
                  <SelectDefault
                    className="inputSale selectSale"
                    placeholder="From"
                    type="text"
                    value={step1Data.role}
                    onChange={(e) =>
                      handleInputChange(1, "role", e.target.value)
                    }
                  >
                    <option value="value" selected>
                      Select role
                    </option>
                    <option value="commercial">Commercial</option>
                    <option value="purchasing">Purchasing</option>
                    <option value="marketing">Marketing</option>
                    <option value="directorship">Directorship</option>
                    <option value="management">Management</option>
                  </SelectDefault>
                </GroupInputR>
              </>
            )}

            {currentStep === 2 && (
              <>
                <GroupInputR className="groupInputSale">
                  <ImgOpt className="iconInputSale" src={Ping} />
                  <InputDefault
                    style={{ paddingLeft: 40 }}
                    className="inputSale"
                    placeholder="Address Line 1"
                    type="addressLine1"
                    value={step2Data.addressLine1}
                    onChange={(e) =>
                      handleInputChange(2, "addressLine1", e.target.value)
                    }
                  />
                </GroupInputR>
                <GroupInputR className="groupInputSale">
                  <ImgOpt className="iconInputSale" src={Ping} />
                  <InputDefault
                    style={{ paddingLeft: 40 }}
                    className="inputSale"
                    placeholder="City"
                    type="city"
                    value={step2Data.city}
                    onChange={(e) =>
                      handleInputChange(2, "city", e.target.value)
                    }
                  />
                </GroupInputR>
                <GroupInputR className="groupInputSale">
                  <ImgOpt className="iconInputSale" src={Stateicon} />
                  <InputDefault
                    style={{ paddingLeft: 40 }}
                    className="inputSale"
                    placeholder="State"
                    type="state"
                    value={step2Data.state}
                    onChange={(e) =>
                      handleInputChange(2, "state", e.target.value)
                    }
                  />
                </GroupInputR>

                <GroupInputR className="groupInputSale">
                  <SelectDefault
                    className="inputSale selectSale"
                    placeholder="From"
                    type="text"
                    value={step2Data.country}
                    onChange={(e) =>
                      handleInputChange(2, "country", e.target.value)
                    }
                  >
                    <option value="country" selected>
                      Country
                    </option>
                    {Country.map((obj, index) => (
                      <option key={index} value={obj.country}>
                        {obj.country}
                      </option>
                    ))}
                  </SelectDefault>
                  <ImgOpt
                    className="iconInput"
                    src={step2Data.country ? getFlag(step2Data.country) : Ping}
                  />
                </GroupInputR>
                <GroupInputR className="groupInputSale">
                  <ImgOpt className="iconInputSale" src={Ping} />
                  <InputDefault
                    style={{ paddingLeft: 40 }}
                    className="inputSale"
                    placeholder="Postal Code"
                    type="postalCode"
                    value={step2Data.postalCode}
                    onChange={(e) =>
                      handleInputChange(2, "postalCode", e.target.value)
                    }
                  />
                </GroupInputR>
              </>
            )}
            {/* {validationErrors.length > 0 && (
              <div className="error-messages">
                {validationErrors.map((error, index) => (
      <span key={index}>{error}</span>
      ))}
              </div>
            )} */}
            <ButtonBlue width="290px" onClick={handleNext} marginTop={"20px"}>
              {currentStep >= 2 ? "Create Account" : "Next"}
            </ButtonBlue>
            <Center>
              <Typography mt={1} variant="subtitle2" color="#4D6484">
                I already have an account!
                <Link
                  underline="none"
                  variant="subtitle2"
                  to="/"
                  color="#366DFB"
                >
                  {" "}
                  Login
                </Link>
              </Typography>
            </Center>
          </ContainerForm>
        </FormRegister>
      </FormContainer>
      <MapaMundiR />
    </ContainerWithMap>
  );
}

export default Register;
