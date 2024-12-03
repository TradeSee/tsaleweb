import React from "react";
import { Modal } from "antd";
import CheckoutPage from "../../checkout";

const PurchaseModal = ({
  visible,
  onCancel,
  priceId,
  userId,
  clientSecret,
  priceSponsor,
  cards,
  info,
  address
}) => {
  return (
    <Modal visible={visible} onCancel={onCancel} footer={null}>
      <CheckoutPage
        priceId={priceId}
        userId={userId}
        clientSecret={clientSecret}
        priceSponsor={priceSponsor}
        cards={cards}
        info={info}
        address={address}
      />
    </Modal>
  );
};

export default PurchaseModal;
