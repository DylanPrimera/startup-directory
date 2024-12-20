/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";
export default {
    darkMode: ["class"],
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",  
      "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
          screens: {
              xs: "475px",
          },
          colors: {
              primary: {
                  "100": "#FFE8F0",
                  DEFAULT: "#78B3CE",
              },
              secondary: "#C9E6F0",
              black: {
                  "100": "#333333",
                  "200": "#141413",
                  "300": "#7D8087",
                  DEFAULT: "#000000",
              },
              white: {
                  "100": "#F7F7F7",
                  DEFAULT: "#FFFFFF",
              },
              terciary:"#FBF8EF",
              quaternary:"#F96E2A"
          },
          fontFamily: {
              "work-sans": ["var(--font-work-sans)"],
          },
          borderRadius: {
              lg: "var(--radius)",
              md: "calc(var(--radius) - 2px)",
              sm: "calc(var(--radius) - 4px)",
          },
          boxShadow: {
              100: "2px 2px 0px 0px rgb(0, 0, 0)",
              200: "2px 2px 0px 2px rgb(0, 0, 0)",
              300: "2px 2px 0px 2px rgb(120, 179, 206)",
          },
      },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
  } satisfies Config;
