'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Include the envars file to load all the environment variables
const envars = require('./envars');

//Require Swagger jsdoc
const swaggerJSDoc = require('swagger-jsdoc');

// Enable routes
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var swaggerDefinition = {
	info: {	
		title: 'URL Shortener Swagger API', 
		version: '1.0.0', 
		description: 'Endpoints to test the URL shortener', 
	},
	host: `http://${envars.hostname}:${envars.port}/`,
	basePath: '/', 
}

var options = {
	swaggerDefinition,
	apis: ['./routes/index.js']
}

const swaggerSpec = swaggerJSDoc(options);

app.get('/swagger.json', function (req, res){
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
});

app.use('/', routes);

const mongoUri = `mongodb://${envars.dbuser}:${envars.dbpass}@${envars.hostname}:${envars.dbport}/${envars.dbname}?authSource=admin`;
mongoose
	.connect(mongoUri, { useNewUrlParser: true, keepAlive: 1 })
	.then(() => {
		if(!module.parent){
			app.listen(envars.port, () => {
				console.log(`Server running at http://${envars.hostname}:${envars.port}/`);
			});
		}
	})
	.catch((err) => {
		console.log(err);
	});

exports = module.exports = app;