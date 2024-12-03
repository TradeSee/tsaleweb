import React from "react";
import { Modal } from "antd";
import CheckoutCredits from "../../checkout/checkoutCredits";

const PurchaseModalCredits = ({
  visible,
  onCancel,
  credits,
  userId,
  clientSecret,
  cards,
  info,
  address,
  pay
}) => {
  return (
    <Modal visible={visible} onCancel={onCancel} footer={null}>
      <CheckoutCredits
        credits={credits}
        userId={userId}
        clientSecret={clientSecret}
        cards={cards}
        info={info}
        address={address}
        pay={pay}
      />
    </Modal>
  );
};

export default PurchaseModalCredits;
