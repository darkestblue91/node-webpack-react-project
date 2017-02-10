var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

//all the vendor libraries we wanna add
const VENDOR_LIBS = [
	'faker', 'lodash', 'redux', 'react', 'react-redux', 'react-dom', 'react-input-range', 'redux-form', 'redux-thunk', 'react-router'
];

module.exports = {
 	entry: {
		//create a file with libraries (vendor) and other with proyect own files (bundle)
		vendor: VENDOR_LIBS,
		bundle: './src/index.js'
  	},
  	output: {
		//Save all the bundles in dist folder with its name and hash
		//the hash is important to improve the browser cache of files
		//it tells to the browser that the bundle file changes
  		path: path.join(__dirname, 'dist'),
    	filename: '[name].[chunkhash].js'
  	},
  	module: {
		rules: [
			{
				//bundle all .js files except the ones from the node_modules folder
			 	use: 'babel-loader',
			  	test: /\.js$/,
			  	exclude: /node_modules/
		  	},
		  	{
				//load all the css files into the bundles
				use: ['style-loader', 'css-loader'],
			 	test: /\.css$/
		  	}
	 	]
  	},
	plugins: [
		//dont repeat content between bundles
		new webpack.optimize.CommonsChunkPlugin({
			names: ['vendor', 'manifest']
		}),
		//add the script tags to index.html automatically
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	]
};
