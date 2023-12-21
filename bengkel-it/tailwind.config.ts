import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        blue: {
          main: "#3377FF",
          darker: "#2659BF",
          lighter: "#99BBFF",
          subtle: "#E3EDFF",
        },
        error: {
          main: "#FF3B3B",
          darker: "#E53535",
          lighter: "#FF5C5C",
          subtle: "#FF8080",
        },
        warning: {
          main: "#FFCC00",
          darker: "#E5B800",
          lighter: "#FDDD48",
          subtle: "#FDED72",
        },
        info: {
          main: "#0063F7",
          darker: "#004FC4",
          lighter: "#5B8DEF",
          subtle: "#9DBFF9",
        },
        success: {
          main: "#06C270",
          darker: "#05A660",
          lighter: "#39D98A",
          subtle: "#57EBA1",
        },
        dark: {
          1: "#3A3A3C",
          2: "#6B7588",
          3: "#8F90A6",
          4: "#C7C9D9",
        },
        light: {
          1: "#DDE5E9",
          2: "#EBEBF0",
          3: "#F2F2F5",
          4: "#FAFAFC",
        },
      },
      boxShadow: {
        input: " 0px 0px 2px 0px rgba(0, 0, 0, 0.25);",
        sidebar: "4px 0px 20px 0px rgba(0, 0, 0, 0.05)",
        payment:
          "0px 11px 24px 0px rgba(0, 0, 0, 0.15), 0px 43px 43px 0px rgba(0, 0, 0, 0.13), 0px 97px 58px 0px rgba(0, 0, 0, 0.08), 0px 172px 69px 0px rgba(0, 0, 0, 0.02), 0px 268px 75px 0px rgba(0, 0, 0, 0.00)",
      },
      backgroundImage: {
        va: "url('/svgs/bg-payment.svg')",
      },
    },
  },
  plugins: [],
};
export default config;
