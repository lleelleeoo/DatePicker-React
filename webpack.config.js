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
    }
};