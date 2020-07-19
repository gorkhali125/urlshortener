const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiLike = require('chai-like');
const should = chai.should();

chai.use(chaiHttp);
chai.use(chaiLike);

const server = require("../app");
var serverRun;

before(done =>{
    serverRun = server.listen(process.env.port, done);
});

after(done => {
    serverRun.close(done);
});

describe('create short url', function(){
    it('should create a new short url for valid original URL', function(done){
        chai.request(server)
            .post('/shorten')
            .send({
                originalUrl: 'http://deepeshkhanal.com.np',
            })
            .end(function (err,res) {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.like({
                    originalUrl: 'http://deepeshkhanal.com.np'
                });
                done();

            });

    });

    it('should return existing hash for same url', function(done){
        chai.request(server)
            .post('/shorten')
            .send({
                originalUrl: 'http://deepeshkhanal.com.np',
            })
            .end(function (err,res) {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.like({
                    urlHash: 'BfOqgtvM'
                });
                done();

            });
    });

    it('should return error when empty body is passed', function(done){
        chai.request(server)
            .post('/shorten')
            .send()
            .end(function (err,res) {
                res.should.have.status(400);
                res.body.should.be.an('object');
                res.body.should.like({
                    message: 'Some error occurred while processing!'
                });
                done();

            });
    });

    it('should return error when invalid URL is passed', function(done){
        chai.request(server)
            .post('/shorten')
            .send({
                originalUrl: 'randomdata',
            })
            .end(function (err,res) {
                res.should.have.status(422);
                res.body.should.be.an('object');
                res.body.should.like({
                    message: 'Invalid Data Passed!'
                });
                done();

            });
    });
});

describe('resolve full url', () => {
    it('should return the original Url', function(done){
        chai.request(server)
            .get('/BfOqgtvM')
            .send()
            .end(function (err,res) {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.like({
                    originalUrl: 'http://deepeshkhanal.com.np',
                });
                done();

            });
    });

    it('should return invalid Url for random hash', function(done){
        chai.request(server)
            .get('/randomHash')
            .send()
            .end(function (err,res) {
                res.should.have.status(404);
                res.body.should.be.an('object');
                res.body.should.like({
                    message: 'Url Not Found!',
                });
                done();

            });
    });
});

describe('random routes/path test', () => {
    it('should return 404 page not found', function(done){
        chai.request(server)
            .get('/BfOqgtvM/randomMenu')
            .send()
            .end(function (err,res) {
                res.should.have.status(404);
                res.body.should.be.an('object');
                res.body.should.like({
                    message: '404 Not Found!',
                });
                done();

            });
    });

    it('should return 404 page not found for / also', function(done){
        chai.request(server)
            .get('/')
            .send()
            .end(function (err,res) {
                res.should.have.status(404);
                res.body.should.be.an('object');
                res.body.should.like({
                    message: '404 Not Found!',
                });
                done();

            });
    });

    it('should return 404 page not found for GET request on /shorten', function(done){
        chai.request(server)
            .get('/shorten')
            .send()
            .end(function (err,res) {
                res.should.have.status(404);
                res.body.should.be.an('object');
                res.body.should.like({
                    message: 'Url Not Found!',
                });
                done();

            });
    });
});