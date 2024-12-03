import { styled } from "styled-components";

export const Container = styled.div``;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95%;
  margin-top: 160px;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 36px;
  margin-bottom: 64px;
  color:  ${({ theme }) => theme.colors.header.dark};
`;

export const LogoIcon = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid  ${({ theme }) => theme.colors.header.dark};
`;

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;
export const HeaderFormProfile = styled.div`
  width: 100%;
  height: 150px;
  background-color:  ${({ theme }) => theme.colors.dark[950]};
  position: absolute;
  margin-left: 24px;
  padding-top: 35px;
  padding-left: 160px;
  
`;
export const BtnOptProfile = styled.button`
  background-color:  ${({ theme }) => theme.colors.main[500]};
  width: auto;
  border: none;
  border-radius: 8px;
  padding: 5px 14px 5px 14px; 
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    background-color:   ${({ theme }) => theme.colors.button.main};
  }

`;

export const FormGroups = styled.section``;

export const PersonalData = styled.section`
  display: flex;
  flex-direction: column;

  & + & {
    margin: 64px 0;
  }

  header {
    max-width: 100%;
    margin-bottom: 8px;
  }

  h2 {
    color:  ${({ theme }) => theme.colors.header.dark};
    line-height: 0px;
  }  
  span {
    color:  ${({ theme }) => theme.colors.light[300]};
  }
`;

export const Data = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

export const Input = styled.div`
  font-size: 16px;
  position: relative;
  padding-top: 12px;

  input {
    padding-top: 8px;
    width: 100%;
    color: ${({ theme }) => theme.colors.button.main};
    background-color: #fff;

    border: none;
    border-bottom: 2px solid   ${({ theme }) => theme.colors.light[300]};
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
      border-bottom: 2px solid ${({ theme }) => theme.colors.main[500]};
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
    margin-top: 13px;
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
    margin-top: 0;
    color: ${({ theme }) => theme.colors.main[500]};
  }
`;

export const Select = styled.div`
  font-size: 16px;
  position: relative;
  padding-top: 12px;
  margin-top: 24px;
  cursor: pointer;

  select {
    padding-top: 8px;
    width: 100%;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.button.main};
    font-weight: bold;

    border: none;
    border-bottom: 2px solid   ${({ theme }) => theme.colors.light[300]};
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
      border-bottom: 2px solid ${({ theme }) => theme.colors.main[500]};
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
    color: ${({ theme }) => theme.colors.gray[300]};
    top: 0;
    left: 0;
    margin-top: 13px;
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
    color: ${({ theme }) => theme.colors.main[500]};
  }
`;

export const ErrorMessage = styled.p`
  font-size: 12px;
  margin-top: 0;
  color: ${({ theme }) => theme.colors.danger.main};
`;

export const ActionsContainer = styled.footer`
  display: flex;
  gap: 32px;
  margin-top: 12px;

  button {
    cursor: pointer;

    &:hover {
      transition: 0.2s;
      transform: scale(1.05);
    }
  }

  .save {
    background-color: ${({ theme }) => theme.colors.main[500]};
    font-size: 16px;
    border: none;
    outline: none;
    color: #fff;
    border-radius: 8px;
    padding: 8px 16px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.main[600]};
    }

    &:disabled {
      background-color:  ${({ theme }) => theme.colors.main[200]};
    }
  }

  .cancel {
    background-color: #fff;
    font-size: 16px;
    border: none;
    outline: none;
    color: ${({ theme }) => theme.colors.gray[400]};

    &:hover {
      color:  ${({ theme }) => theme.colors.gray[300]};
    }
  }
`;
