module.exports = {
    devServer: {
        proxy: {
            // i assume ^ is just like a backslash
            // so if anywhere we type /api, we mean the localhost
            '^/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                logLevel: 'debug',
                pathRewrite: { '^/api': '/' },
            },
        },
    }
}