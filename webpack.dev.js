const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  watch: true,
  watchOptions: {
    poll: true,
    aggregateTimeout: 300,
  },
});
