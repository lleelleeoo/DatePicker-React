var browserSync = require('browser-sync-webpack-plugin');

module.exports = {
    entry: "./src/js/entry.jsx",
    output: {
        path: "./src/js/",
        filename: "app.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    plugins: [
        new browserSync({
            host: 'localhost',
            port: '3000',
            server: {baseDir: ['./src/']}
        })
    ]
};