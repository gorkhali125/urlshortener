'use strict';

const shortid = require('shortid');
const {urlValidator} = require('../helpers/Validators');
const Url = require('../models/UrlShorten.model');

class UrlShortenController {
  static validateUrl(req, res, next) {
    if (!req.body.originalUrl) {
      res.status(400).send({status: 400, message: 'Some error occurred while processing!'});
    } else if(!urlValidator(req.body.originalUrl)){
      res.status(422).send({status: 422, message: 'Invalid Data Passed!'});
    }else{
      next();
    }  
  }

  static hashUrl(req, res, next) {
    Url.findOne({ originalUrl: req.body.originalUrl })
    .then((existingUrl) => {
      if(existingUrl){
        res.status(200).json({status: 200, message: 'URL Shortened Succesfully!', originalUrl: existingUrl.originalUrl, urlHash: existingUrl.urlHash});
      }else{
        req.body.urlHash = shortid.generate();
        next();
      }
    })    
  }

  static createShortUrl(req, res, next) {
    Url.create({ originalUrl: req.body.originalUrl, urlHash:req.body.urlHash }, function (err, savedUrl) {
      if(err){
        res.status(400).send({status: 400, message: 'Some error occurred while processing!'});
      }else{
        res.status(200).json({status: 200, message: 'URL Shortened Succesfully!', originalUrl: savedUrl.originalUrl, urlHash: savedUrl.urlHash});
      }
    });
  }

  static fetchShortUrl(req, res, next) {
    Url.findOne({ urlHash: req.params.shortUrl })
      .then((existingUrl) => {
        if(existingUrl){
          res.status(200).json({status: 200, message: 'Url Found!', originalUrl: existingUrl.originalUrl});
        }else{
          res.status(404).json({status: 404, message: 'Url Not Found!'});
        }
      })
  }
}

module.exports = {UrlShortenController};
