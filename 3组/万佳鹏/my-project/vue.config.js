
module.exports = {
  publicPath: './', // 静态资源路径（默认/，打包后会白屏）
  outputDir: 'dist', // 打包后文件的目录 （默认为dist）
  assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录  默认为‘’没有单独目录js/css/img在根目录中。
  productionSourceMap: false,
  lintOnSave: false,
}