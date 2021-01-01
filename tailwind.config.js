module.exports = {
  purge: [
    './ui/**/*.html',
    './ui/**/*.js',
  ],
  darkMode: 'media', // or false or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
