'use strict';

const express = require('express');
const routes = express.Router();

const { UrlShortenController } = require('../controllers/UrlShorten.controller');

/**
 * @swagger
 * /shorten:
 *   post:
 *     tags:
 *      - URL
 *     name: Shorten a URL
 *     summary: This API shortens a URL
 *     description: Shorten a passed URL
 *     produces: application/json
 *     parameters:
 *     - originalUrl: url
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *          originalUrl:
 *           type: string
 *     responses:
 *       200:
 *         description: URL was Shortened Succesfully
 *       400:
 *        description: Some error occurred while processing
 *       422:
 *        description: Invalid Data Passed
 *
*/
routes.post('/shorten', UrlShortenController.validateUrl, UrlShortenController.hashUrl, UrlShortenController.createShortUrl);

/**
 * @swagger
 * /{shortUrl}:
 *   get:
 *     tags:
 *      - URL
 *     name: Return original URL
 *     summary: This API returns the original URL
 *     description: Resolves the original Url from the hashed short url and return it
 *     produces: application/json
 *     parameters:
 *     - shortUrl: url
 *       schema:
 *         type: object
 *         properties:
 *          shortUrl:
 *           type: string
 *     responses:
 *       200:
 *         description: Url Found
 *       404:
 *        description: Url Not Found
 *
*/
routes.get('/:shortUrl', UrlShortenController.fetchShortUrl);

//The 404 Routes for both get and post. Except above routes, all other are not exposed.
routes.get('*', function(req, res){
	res.status(404).json({ status:404, message: '404 Not Found!' });
});

routes.post('*', function(req, res){
	res.status(404).json({ status:404, message: '404 Not Found!' });
});

module.exports = routes;
