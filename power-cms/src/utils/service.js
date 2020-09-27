let service = {}

if (process.env.NODE_ENV == 'development') {
    // 开发环境下的服务器地址
    service.serviceUrl = "http://59.110.215.45"
} else {
    // 部署环境下的服务器地址
    service.serviceUrl = ''
}

export default service