
const prodPlugins=[] //发布时需要的插件
if (process.env.NODE_ENV==='production') {//判断是不是发布 如是去除所有console 不是追加...
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'//加
  ],
  // ele
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    // 'transform-remove-console',
    ...prodPlugins,
    
      "@babel/plugin-syntax-dynamic-import",  //配置路由懒加载插件
  ]
  
}
