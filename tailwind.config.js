/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        ink: "#292A2E",
        ink2: "#3B3B3B",
        mute: "#8F8F8F",
        soft: "#F6F6F7",
        hair: "#E6E6EB",
        line: "#E2E2E7",
        edit: "#E8F1FE",
        editline: "#CFE1FB",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.06), 0 1px 3px rgba(16,24,40,0.10)",
        fab: "0 8px 24px rgba(0,0,0,0.28)",
        sheet: "0 -8px 40px rgba(0,0,0,0.18)",
        phone: "0 40px 80px rgba(0,0,0,0.28), 0 8px 24px rgba(0,0,0,0.16)",
      },
      borderRadius: {
        sheet: "26px",
      },
    },
  },
  plugins: [],
};
