import React, { useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import CheckoutForm from "../checkoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { requestRegister } from "../../../contexts/auth";

const stripePromise = loadStripe("a");


const ModalRegister = ({ visible, onOpen, onClose, priceId, priceSponsor }) => {
  const showModal = () => {
    if (onOpen) {
      onOpen();
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  const priceIdSponsor = priceSponsor?.sponsor

  const [currentStep, setCurrentStep] = useState(1);

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


  const [clientSecret, setClientSecret] = useState("");


  const address = {
    city: step2Data.city,
    country: step2Data.country,
    line1: step2Data.addressLine1,
    postalCode: step2Data.postalCode,
    state: step2Data.state,
  };

  
function getClientSecret() {
  fetch("https://api4242/create-plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ info, priceId, address, priceIdSponsor }),
  })
    .then((res) => res.json())
    .then((data) => {
      setClientSecret(data.clientSecret);
    })
    .catch((error) => {
      console.error("Erro ao obter o clientSecret:", error);
    });
}


const appearance = {
  theme: 'stripe',
};
const options = {
  clientSecret,
  appearance,
};

const [idGerado, setIdGerado] = useState(null);


const info = {
  email: step1Data.email,
  name: step1Data.name,
  userId: idGerado,
};



const handleNext = async () => {
  if (currentStep === 1) {
    setCurrentStep(2);
  } else if (currentStep === 2) {
    try {
      const uid = await requestRegister(address, step1Data);
      console.log("dentroHandle", uid);
      info.userId = uid;
      setIdGerado(uid);
      getClientSecret();
      setCurrentStep(3);
    } catch (error) {
      console.error("Erro durante o registro:", error);
    }
  } else {
    const allFormData = { ...step1Data, ...step2Data };
    console.log("Dados do formulário completos:", allFormData);
  }
};
  
  return (
    <>
      <Modal
        visible={visible}
        title="Register"
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <Button
              style={{
                backgroundColor: "blue",
                color: "white",
              }}
              key="next"
              onClick={handleNext}
            >
              {currentStep >= 2 ? "Next" : "Submit"}
            </Button>
            ,
            <CancelBtn />
          </>
        )}
      >
        {currentStep === 1 && (
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: "small",
            }}
            size="small"
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input
                name="name"
                value={step1Data.name}
                onChange={(e) => handleInputChange(1, "name", e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Please input your last name!",
                },
              ]}
            >
              <Input
                name="lastName"
                value={step1Data.lastName}
                onChange={(e) =>
                  handleInputChange(1, "lastName", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                name="email"
                value={step1Data.email}
                onChange={(e) => handleInputChange(1, "email", e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input
                name="password"
                type="password"
                value={step1Data.password}
                onChange={(e) => handleInputChange(1, "password", e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              rules={[
                {
                  required: true,
                  message: "Please input your phone!",
                },
              ]}
            >
              <Input
                type="number"
                name="phone"
                value={step1Data.phone}
                onChange={(e) => handleInputChange(1, "phone", e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Role">
              <Select
                name="role"
                value={step1Data.role}
                onChange={(value) => handleInputChange(1, "role", value)}
              >
                <Select.Option value="commercial">Commercial</Select.Option>
                <Select.Option value="purchasing">Purchasing</Select.Option>
                <Select.Option value="marketing">Marketing</Select.Option>
                <Select.Option value="directorship">Directorship</Select.Option>
                <Select.Option value="management">Management</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        )}

        {currentStep === 2 && (
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: "small",
            }}
            size="small"
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item
              label="Address Line 1"
              rules={[
                {
                  required: true,
                  message: "Please input your line 1!",
                },
              ]}
            >
              <Input
                name="addressLine1"
                value={step2Data.addressLine1}
                onChange={(e) =>
                  handleInputChange(2, "addressLine1", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item
              label="City"
              rules={[
                {
                  required: true,
                  message: "Please input your city!",
                },
              ]}
            >
              <Input
                name="city"
                value={step2Data.city}
                onChange={(e) => handleInputChange(2, "city", e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="State"
              rules={[
                {
                  required: true,
                  message: "Please input your state!",
                },
              ]}
            >
              <Input
                name="state"
                value={step2Data.state}
                onChange={(e) => handleInputChange(2, "state", e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Country">
              <Select
                name="country"
                value={step2Data.country}
                onChange={(value) => handleInputChange(2, "country", value)}
              >
                <Select.Option value="">Select a country *</Select.Option>
                <Select.Option value="United States">
                  United States
                </Select.Option>
                <Select.Option value="Canada">Canada</Select.Option>
                <Select.Option value="Brazil">Brazil</Select.Option>
                <Select.Option value="China">China</Select.Option>
                <Select.Option value="Germany">Germany</Select.Option>
                <Select.Option value="Japan">Japan</Select.Option>
                <Select.Option value="United Kingdom">
                  United Kingdom
                </Select.Option>
                <Select.Option value="France">France</Select.Option>
                <Select.Option value="Netherlands">Netherlands</Select.Option>
                <Select.Option value="Belgium">Belgium</Select.Option>
                <Select.Option value="India">India</Select.Option>
                <Select.Option value="Vietnam">Vietnam</Select.Option>
                <Select.Option value="Turkey">Turkey</Select.Option>
                <Select.Option value="Mexico">Mexico</Select.Option>
                <Select.Option value="Philippines">Philippines</Select.Option>
                <Select.Option value="Colombia">Colombia</Select.Option>
                <Select.Option value="Thailand">Thailand</Select.Option>
                <Select.Option value="Pakistan">Pakistan</Select.Option>
                <Select.Option value="United Arab Emirates">
                  United Arab Emirates
                </Select.Option>
                <Select.Option value="Singapore">Singapore</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Postal Code"
              rules={[
                {
                  required: true,
                  message: "Please input your Postal Code!",
                },
              ]}
            >
              <Input
                name="postalCode"
                value={step2Data.postalCode}
                onChange={(e) =>
                  handleInputChange(2, "postalCode", e.target.value)
                }
              />
            </Form.Item>
          </Form>
        )}
        {currentStep === 3 && (
          <>
              {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm priceId={priceId} priceIdSponsor={priceIdSponsor} userId={idGerado} />
                </Elements>
              )}
              </>
        )}
      </Modal>
    </>
  );
};

export default ModalRegister;
