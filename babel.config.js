module.exports = {
  presets: [
    [
      'taro',
      {
        framework: 'vue3',
        compiler: 'vite',
        ts: true,
        useBuiltIns: process.env.TARO_ENV === 'h5' ? 'usage' : false
      }
    ]
  ]
}
