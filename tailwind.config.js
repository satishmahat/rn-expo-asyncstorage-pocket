/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        syneBold: ['Syne-Bold'],
        syneSemiBold: ['Syne-SemiBold'],
        syneMedium: ['Syne-Medium'],
        syneRegular: ['Syne-Regular'],
        syneExtraBold: ['Syne-ExtraBold'],
      },
    },
  },
  plugins: [],
};