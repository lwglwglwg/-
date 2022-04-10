module.exports={ //配置
    publicPath: './', // 1 静态资源路径（默认/，打包后会白屏）
//   outputDir: 'dist', // 打包后文件的目录 （默认为dist）
//   assetsDir: 'static', //  outputDir的静态资源(js、css、img、fonts)目录  默认为‘’没有单独目录js/css/img在根目录中。

      
   productionSourceMap: false,  //2.去除生产环境的productionSourceMap

    chainWebpack:config=>{// 3. 自定义打包入口  
        //发布模式
        config.when(process.env.NODE_ENV === 'production',config=>{
            //entry找到默认的打包入口，调用clear则是删除默认的打包入口
            //add添加新的打包入口
            config.entry('app').clear().add('./src/main-prod.js')


              // 2.使用externals设置排除项  （2.加载外部CDN）
              config.set('externals',{
                vue:'Vue',
                'vue-router':'VueRouter',
                axios:'axios',
                lodash:'_',
                echarts:'echarts',
                nprogress:'NProgress',
                'vue-quill-editor':'VueQuillEditor'
            })
        //## 处理$router.  发布模式引入cdn资源
        config.plugin('html').tap(args => {
            args[0].isProd = true
            return args
        })

        })
        //开发模式
        config.when(process.env.NODE_ENV === 'development',config=>{
            config.entry('app').clear().add('./src/main-dev.js')

       //## 处理$router  开发模式不引入cdn资源
        config.plugin('html').tap(args => {
            args[0].isProd = false
            return args
        })

        })
    }


}