const postcssImport = require('postcss-import');
const tailwind = require('tailwindcss');
const nested = require('postcss-nested');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const plugins = [postcssImport, tailwind, nested, autoprefixer];

if (process.env.NODE_ENV === 'production') {
  plugins.push(cssnano);
}

module.exports = { plugins };
