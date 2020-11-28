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
            args[0].title = '电能集中远程管控平台'
            return args
        })
    },
    devServer:{
        port:'9005'
    }
}