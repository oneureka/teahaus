// https://docs.taro.zone/docs/next/babel-config
module.exports = {
  presets: [
    [
      "taro",
      {
        framework: "vue3",
        ts: true,
        compiler: "vite",
        useBuiltIns: process.env.TARO_ENV === "h5" ? "usage" : false,
      },
    ],
  ],
};
