module.exports = {
    // 缓存规则
    rules: [
        // 缓存404页面
        {
            match: '/404.html',
            strategy: 'cache'
        },
        // 缓存CSS文件
        {
            match: /.*\.css$/,
            strategy: 'cache'
        },
        // 缓存JS文件
        {
            match: /.*\.js$/,
            strategy: 'cache'
        },
        // 缓存图片
        {
            match: /.*\.(jpg|jpeg|png|gif|webp|svg)$/,
            strategy: 'cache'
        }
    ],
    // 优先级，数字越大优先级越高
    priority: 0,
    // 是否在生成前删除旧的缓存规则
    deleteOld: true
} 