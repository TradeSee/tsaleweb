import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  padding-left: 16px;
  padding-right: 12px;
  align-self: center;
  width: 100%;

  input:hover {
    background-color: transparent;
    background: transparent;
    box-shadow: none;
    border: none;
    outline: none;
  }

  .mainbox {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
    border-radius: 160px;
    background-color: #e9edf8;
    transition: all 0.3s ease;
  }

  .checkbox {
    cursor: pointer;
  }

  .checkbox:focus {
    border: none;
    outline: none;
  }

  .checkbox:checked {
    right: 10px;
  }

  .checkbox:checked ~ .mainbox {
    width: 50px;
  }

  .checkbox:checked ~ .mainbox .search_input {
    width: 0;
    height: 0px;
  }

  .checkbox:checked ~ .mainbox .iconContainer {
    padding-right: 8px;
  }

  .checkbox {
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    position: absolute;
    right: 17px;
    top: 10px;
    z-index: 9;
    cursor: pointer;
    appearance: none;
  }

  .search_input {
    box-sizing: border-box;
    height: 100%;
    width: 94%;
    background-color: transparent;
    border: none;
    outline: none;
    padding-bottom: 4px;
    padding-left: 10px;
    font-size: 1em;
    color: #4b4b4b;
    transition: all 0.3s ease;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;

    @media screen and (max-width: 1100px) {
      width: 90%;
    }
  }

  .search_input::placeholder {
    color: #8a97aa;
    font-weight: 600;
  }

  .iconContainer {
    box-sizing: border-box;
    padding-top: 5px;
    width: fit-content;
    transition: all 0.3s ease;
    margin-right: 4px;
  }

  .search_icon {
    box-sizing: border-box;
    fill: ${({ theme }) => theme.colors.dark[950]};
    font-size: 1.3em;
  }
`;
