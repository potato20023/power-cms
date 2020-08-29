let service = {}

if (process.env.NOOE_ENV == 'development') {
    // 开发环境下的服务器地址
    service.baseUrl = ''
} else {
    // 部署环境下的服务器地址
    service.baseUrl = ''
}