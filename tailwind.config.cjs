/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        task: "#4bade8",
        story: "#68bc3c",
        bug: "#e84c3c",
        epic: "#984ce4",
        inprogress: "#0854cc",
        done: "#08845c",
        todo: "#d4d4d8",
      },
      boxShadow: {
        issue: '0 1px 2px 0 #091e4240',
        list: '0 0 2px 0 #091e4230',
      },
    },
  },
  plugins: [],
};
