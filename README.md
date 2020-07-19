# URL Shortener Service

URL shortener service let's you shorten your long urls into something smaller and easily readable. This project contains both the backend server and frontend client.
Server is written in **NodeJS** and the **Express** framework while client is written using **ReactJS**. Server and client code can be found in the respective directory with the same name.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. Please note that no deployment process is described and thus the project can only run in development mode as of now.

## Prerequisites

To get up and running, you will have to install  ```docker```  and ```docker-compose```. Please read the instructions provided in the links below to install docker and docker-compose.

  * [Installing Docker](https://docs.docker.com/install/)
  * [Installing Docker Compose](https://docs.docker.com/compose/install/)

## Installation

We assume that you have docker and docker-compose installed. To install all the required packages and dependencies, just use the command below.

```
docker-compose build
```

And after building, use the command below to run the system.

```
docker-compose up
```

## User Interface
The system should be running at this point. Open a browser window and navigate to [http://localhost:3000](http://localhost:3000). You will see a form where you can input your URL and submit. This will then show the shortened URL of the input you provided.

You can copy the Shortened URL and paste it in your browser window. This will redirect you to the original URL.

If a random hash or a random page is opened, a 404 page will be shown.

## API Endpoints

The server will be up and running on port 8091 and URL [http://localhost:8091](http://localhost:8091). If you want to change the port, please have a look at the ```Dockerfile``` inside the "server" directory.

**Shorten a new URL**

```
POST http://localhost:8091/shorten
```

This endpoint expects a parameter ```originalUrl``` to be passed. Otherwise, it will fail with 400 status code. If the passed Url is not valid, it will fail with 422 status code. If the shortening is successfull, it will return the original url along with the hash with 200 status code.

**Resolve the original URL**

```
GET http://localhost:8091/{urlHash}
```

This endpoint expects ```urlHash``` to be passed in the URL. It will resolve the ```originalUrl``` of this hash and then return the originalUrl along with the hash. If the urlHash is not correct, it will fail with 404 error. If the resolve is successfull, it will return 200 status code.


## Running Tests

Test cases are implemented for both server and client. ```chai``` and ```mocha``` are used for server test cases while ```jest``` and ```enzyme```  are used for client test cases.

At the moment, ```docker-compose``` is not used to run test cases and thus you have to run test cases inside the docker containers.

**Server test cases**

To navigate inside the server container, use the command below:

```
docker-compose exec urlshortener_server sh
```

And then run:

```
npm test
```

**Client test cases**

To navigate inside the client container, use the command below:

```
docker-compose exec urlshortener_client sh
```

And then run:

```
npm test
```

## Swagger Documentation

Swagger is used to create API documentation. ```swagger-jsdoc``` package is used which provides the flexibility of adding ```@swagger``` annotation in route and create the documentation easily. ```swagger-ui-express``` package is used to serve the Swagger UI but due to some reasons, the assets weren't being loaded and thus UI is not available at the moment.

An endpoint for viewing the API specification is created and can be viewed at:

```
GET http://localhost:8091/swagger.json
```

## Built With
  * [NodeJS](https://nodejs.org/en/) - JavaScript runtime
  * [Express](https://expressjs.com/) - Web framework for NodeJS
  * [ReactJS](https://reactjs.org/) - JavaScript library for building UI
  * [MongoDB](https://www.mongodb.com/) - NoSQL document-based Database





