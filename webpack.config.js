var browuserSync = require('browser-sync-webpack-plugin');

module.exports = {
    entry: "./src/js/entry.js",
    output: {
        path: "./src/js/",
        filename: "app.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
        new browuserSync({
            host: 'localhost',
            port: '3000',
            server: {baseDir: ['./src/']}
        })
    ]
};