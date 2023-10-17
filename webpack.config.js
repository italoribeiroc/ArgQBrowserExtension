const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        popup: "./src/popup/popup.tsx",
    },
    module: {
        rules: [
            {
                use: "ts-loader",
                test: /\.tsx?$/,
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve("src/manifest.json"),
                    to: "dest",
                },
                {
                    from: path.resolve("src/assets/images/argq_favicon.png"),
                    to: "dest",
                },
            ],
        }),
        new HtmlPlugin({
            title: "Arg Q!",
            filename: "index.html",
        }),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "bundle.js",
    },
};
