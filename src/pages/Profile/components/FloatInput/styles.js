import styled from "styled-components";

export const Input = styled.div`
  font-size: 16px;
  position: relative;
  padding-top: 12px;

  input {
    padding: 8px 0 8px 8px;
    width: 100%;
    font-size: 16px;
    max-width: 1200px;
    color:  ${({ theme }) => theme.colors.button.main};
    background-color: #fff;

    border: 1px solid  ${({ theme }) => theme.colors.light[300]};
    border-radius: 4px;
    outline: none;
    font-size: 16px;
    min-width: 220px;
    transition: all 0.3s ease-out;
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    appearance: none;
    -webkit-appearance: none;
    box-shadow: none;

    &:focus {
      border: 1px solid ${({ theme }) => theme.colors.main[500]};
    }

    ::placeholder {
      color: transparent;
    }
  }

  input:disabled {
    cursor: not-allowed;
  }

  label {
    pointer-events: none;
    position: absolute;
    color:  ${({ theme }) => theme.colors.gray[300]};
    top: 0;
    left: 0;
    margin-top: 22px;
    margin-left: 8px;
    transition: 0.3s ease-out;
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
  }

  input:required:invalid + label {
    color: red;
  }

  input:focus:required:invalid + label:after {
    content: "*";
  }

  input:focus + label,
  input:not(:placeholder-shown) + label {
    font-size: 12px;
    margin-top: -4px;
    margin-left: 0;
    color:  ${({ theme }) => theme.colors.gray[300]};
  }

  small {
    color: ${({ theme }) => theme.colors.danger.main};
  }
`;

export const Select = styled.div`
  font-size: 16px;
  position: relative;
  padding-top: 12px;
  cursor: pointer;

  select {
    padding: 8px 0 8px 8px;
    width: 100%;
    cursor: pointer;
    color:  ${({ theme }) => theme.colors.button.main};

    border: 1px solid  ${({ theme }) => theme.colors.light[300]};
    border-radius: 4px;
    outline: none;
    font-size: 16px;
    min-width: 220px;
    transition: all 0.3s ease-out;
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    appearance: none;
    -webkit-appearance: none;
    box-shadow: none;

    &:focus {
      border: 1px solid ${({ theme }) => theme.colors.main[500]};
    }

    ::placeholder {
      color: transparent;
    }
  }

  select:disabled {
    cursor: not-allowed;
  }

  label {
    pointer-events: none;
    position: absolute;
    color:  ${({ theme }) => theme.colors.gray[300]};
    top: 0;
    left: 0;
    margin-top: 22px;
    margin-left: 8px;
    transition: 0.3s ease-out;
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
  }

  select:required:invalid + label {
    color: red;
  }

  select:focus:required:invalid + label:after {
    content: "*";
  }

  select:focus + label,
  select:not(:placeholder-shown) + label {
    font-size: 12px;
    margin-top: 0;
    margin-left: 0;
    color:  ${({ theme }) => theme.colors.gray[300]};
  }
`;
