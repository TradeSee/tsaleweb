import React, { useState, useEffect, useContext } from "react";
import { Modal, Space } from "antd";
import WarningIcon from "@mui/icons-material/Warning";
import DangerousIcon from "@mui/icons-material/Dangerous";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import CodeIcon from "@mui/icons-material/Code";
import { ThemeContext } from "styled-components";

const AllModal = ({ visible, onCancel, message, title, onConfirm, type }) => {
  const themeContext = useContext(ThemeContext);

  const Warning = () => (
    <WarningIcon style={{ color: `${themeContext.colors.warn.main}` }} />
  );
  const Dangerous = () => (
    <DangerousIcon style={{ color: `${themeContext.colors.danger.main}` }} />
  );
  const Logout = () => (
    <LogoutIcon style={{ color: `${themeContext.colors.danger.main}` }} />
  );
  const CheckCircle = () => (
    <CheckCircleIcon style={{ color: `${themeContext.colors.sucess.main}` }} />
  );
  const SearchOff = () => <SearchOffIcon />;
  const Code = () => <CodeIcon />;

  const [icon, setIcon] = useState(null);

  useEffect(() => {
    switch (type) {
      case "danger":
        setIcon(<Dangerous />);
        break;
      case "logout":
        setIcon(<Logout />);
        break;
      case "warning":
        setIcon(<Warning />);
        break;
      case "correct":
        setIcon(<CheckCircle />);
        break;
      case "notFound":
        setIcon(<SearchOff />);
        break;
      default:
        setIcon(<Code />);
        break;
    }
  }, [type]);

  return (
    <Modal
      zIndex={99999}
      title={
        <Space>
          {icon}
          <span>{title}</span>
        </Space>
      }
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
    >
      <p>{message}</p>
    </Modal>
  );
};

export default AllModal;
