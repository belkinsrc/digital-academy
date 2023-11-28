const nested = require("postcss-nested");
const postcss = require("postcss-preset-env");
const customMedia = require("postcss-custom-media");

module.exports = {
    plugins: [nested(), postcss(), customMedia({})]
}