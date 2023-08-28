/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        flow: ["'Flow Rounded'", "mono"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
