module.exports={
    outputDir: 'dist',
    indexPath: 'index.html',
    productionSourceMap: false,
    configureWebpack: {
        externals: {
            'BMap': 'BMap',
            'BMap_Symbol_SHAPE_POINT':'BMap_Symbol_SHAPE_POINT'
        }
    },
    chainWebpack: config => {
        config.plugin('html').tap(args=>{
            args[0].title = 'cmz-cms-demo'
            return args
        })
    }
}