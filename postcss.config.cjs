module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 192,
      propList: ["*"],
      unitPrecision: 5,
      replace: true,
      mediaQuery: false,
      minPixelValue: 12,
    }
  }
}