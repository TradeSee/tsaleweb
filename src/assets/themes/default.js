/* eslint-disable import/no-anonymous-default-export */
const defaultTheme = {
  colors: {
    background: "#ffffff",
    textColor: "#17283e",

    text: "#fafafa",
    light: {
      50: "#f2f4fb",
      100: "#e9edf8",
      200: "#d4dbf1",
      300: "#bac4e7",
      400: "#9ea5db",
      500: "#858acf",
      600: "#6e6cbf",
      700: "#5e5ba7",
      800: "#4d4c87",
      900: "#42426d",
      950: "#27273f",
    },
    main: {
      50: "#eff4ff",
      100: "#dae6ff",
      200: "#bdd4ff",
      300: "#90baff",
      400: "#5c95fe",
      500: "#366dfb",
      600: "#204cf0",
      700: "#1838dd",
      800: "#1a2fb3",
      900: "#1b2e8d",
      950: "#151d56",
    },
    dark: {
      50: "#e9f9ff",
      100: "#cef2ff",
      200: "#a7e9ff",
      300: "#6be0ff",
      400: "#26caff",
      500: "#00a3ff",
      600: "#0079ff",
      700: "#005eff",
      800: "#0050e6",
      900: "#0049b3",
      950: "#002c67",
    },
    darker: {
      50: "#e9f9ff",
      100: "#cef2ff",
      200: "#a7eaff",
      300: "#6be0ff",
      400: "#26caff",
      500: "#00a4ff",
      600: "#007aff",
      700: "#005fff",
      800: "#0051e6",
      900: "#004ab3",
      950: "#003985",
    },
    gray: {
      50: "#f6f6f6",
      100: "#e7e7e7",
      200: "#d1d1d1",
      300: "#b0b0b0",
      400: "#888888",
      500: "#6d6d6d",
      600: "#5d5d5d",
      700: "#4f4f4f",
      800: "#454545",
      900: "#3d3d3d",
      950: "#1e1e1e",
    },
    button: {
      color: "#fafafa",

      main: "#1c57d9",
      hover: "#246dec",
      active: "#1d47b0",
      disabled: "#ccc",
    },
    secondaryButton: {
      mainBg: "#fff",
      mainColor: "#1c57d9",

      hoverBg: "#1c57d9",
      hoverColor: "#fff",

      activeBg: "#1c57d9",

      disabled: "#ccc",
    },
    header: {
      dark: "#17283e",
    },
    warn: {
      light: "#f6b56a",
      main: "#f4a74d",
      dark: "#f19120",
    },
    danger: {
      light: "#F97171",
      main: "#FC5050",
      dark: "#F63131",
    },
    sucess: {
      main: "#51CA73",
      dark: "#35b259",
      darker: "#269345",
    },
  },
  Tipography: {
    font: "Inter",

    heading: {
      h1: {
        size: "32px",
        weight: 700,
        lineHeight: "32px",
      },
      h2: {
        size: "24px",
        weight: 700,
        lineHeight: "31px",
      },
      h3: {
        size: "20px",
        weight: 700,
        lineHeight: "26px",
      },
      h4: {
        size: "18px",
        weight: 700,
        lineHeight: "23px",
      },
    },

    body: {
      large: {
        size: "18px",
        lineHeight: "27px",
        bold: 700,
        medium: 500,
        regular: 400,
      },

      normal: {
        size: "16px",
        lineHeight: "24px",
        bold: 700,
        medium: 500,
        regular: 400,
      },

      small: {
        size: "14px",
        lineHeight: "21px",
        bold: 700,
        medium: 500,
        regular: 400,
      },
    },

    input: {
      label: {
        size: "12px",
        lineHeight: "12px",
        weight: 400,
      },

      placeholder: {
        size: "14px",
        lineHeight: "20px",
        weight: 400,
      },

      helper: {
        size: "12px",
        lineHeight: "17px",
        weight: 400,
      },
    },

    button: {
      large: {
        size: "16px",
        lineHeight: "22px",
        weight: 500,
      },

      small: {
        size: "14px",
        lineHeight: "20px",
        weight: 500,
      },
    },
  },
};

export default defaultTheme;
