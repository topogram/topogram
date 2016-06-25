# Topogram

**Topogram** is a web-based app to create and publish collaborative mapping of networks.

https://codeship.com/projects/159966/status?branch=master

## Features

* interactive editing of networks
* real-time collaboration
* time/geo based data
* CSV import

Topogram is a node application based on [Meteor JS](https://www.meteor.com/) and [Cytoscape JS](http://js.cytoscape.org).

## Run

    git clone https://github.com/topogram/topogram-client.git
    cd topogram-client
    meteor

### Test

There is 2 sorts of tests here :

1. functional tests for the components in `/tests`
2. integration tests for the Meteor app located in ```specs```.

You can launch all tests using `gulp`

    gulp test

You can also run the app in test mode to check integration as you develop

    npm test

Check for ESlint compliance

    npm run lint

### Deploy with Docker

We use Docker to run in production.

1. build the Docker topogram/topogram container with `./build.sh`
1. fetch a mongo Docker container for the DB and run the app with `docker-compose up`


## Publishing instructions

This project is set up to automatically publish to npm. To publish:

1. Set the version number environment variable: export VERSION=1.2.3
1. Publish: ```gulp publish```
