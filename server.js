const path = require('path');
const express = require('express');

const app = express();

//auth routes come here, so you can create your signup, signin, getuserinfo, forget password and logout routes here

//api routes come here
app.get('/api', (req, res, next) => {
	res.status(200).json({
		message: 'Hi, I am the API'
	});
});

//Running webpack only in development for development
if(process.env.NODE_ENV !== 'production') {
	const webpack = require('webpack');
	const webpackMiddleware = require('webpack-dev-middleware');
	const webpackConfig = require('./webpack.config.js');
	app.use(webpackMiddleware(webpack(webpackConfig)));
//Not running webpack in production for speed
} else {
	app.use(express.static('dist'));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'dist/index.html'));
	});
}

app.listen(process.env.PORT || 5000, () => console.log('Listening'));