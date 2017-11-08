const path = require('path');
module.exports = {
    entry: "./emoji-selector.ts",
    output: {
        path: path.join(__dirname, '/dist'),
        filename: "emoji-selector.bundle.js"
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", "json"],
        modules: [
            path.resolve('./node_modules'),
            path.resolve('./')
          ]
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.json$/, loader: "json-loader" }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname),
        compress: true,
        port: 3000,
        historyApiFallback: true
      },
    watch: true
}