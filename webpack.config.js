const webpack = require("webpack");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
	mode: 'none',
	entry: ["./src/index.js"],
	output: {
		path: __dirname + "/public",
		filename: "bundle.min.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['env']
				}
			}
		]
	},
	plugins: [
		new UglifyJSPlugin()
	]
};







