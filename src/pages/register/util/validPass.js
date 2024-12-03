import { useState } from "react";
import { message } from "antd";

export default function usePasswordValidation() {
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    setIsValidPassword(passwordRegex.test(password));

    const errors = [];
    if (!/(?=.*\d)/.test(password)) {
      errors.push("Password must contain at least one number (0-9).");
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push("Password must contain at least one lowercase letter (a-z).");
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push("Password must contain at least one uppercase letter (A-Z).");
    }
    if (!/(?=.*[a-zA-Z])/.test(password)) {
      errors.push("Password must contain at least one letter.");
    }
    if (!/.{8,}/.test(password)) {
      errors.push("Password must be at least 8 characters long.");
    }

    if (errors.length > 0) {
      errors.forEach((error) => {
        message.error(error);
      });
    }

    setValidationErrors(errors);
  };

  return { isValidPassword, validationErrors, validatePassword };
}