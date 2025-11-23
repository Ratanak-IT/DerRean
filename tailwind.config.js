// tailwind.config.js
module.exports = {
  darkMode: "class", // Enable dark mode via class
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addVariant, e }) {
      // This will create a variant for dark mode: .dark\:your-class
      addVariant('dark', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.dark .${e(`dark${separator}${className}`)}`;
        });
      });
    },
  ],
};

