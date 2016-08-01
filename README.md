# Topogram


**Topogram** is a web-based app to create and publish collaborative mapping of networks.

[![Build Status](https://travis-ci.org/topogram/topogram.svg?branch=api)](https://travis-ci.org/topogram/topogram)
[![Join the chat at https://gitter.im/topogram/topogram](https://badges.gitter.im/topogram/topogram.svg)](https://gitter.im/topogram/topogram?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


## Features

* interactive editing of networks
* real-time collaboration
* time/geo based data
* CSV import

![Screenshot Topogram](http://topogram.io/images/Topogram-Network.png)

Topogram is a node application based on [Meteor JS](https://www.meteor.com/) and [Cytoscape JS](http://js.cytoscape.org).

## Run

    git clone https://github.com/topogram/topogram-client.git
    cd topogram-client
    meteor npm install
    meteor

### Test

There is 2 sorts of tests here :

1. functional tests for the components in `/tests`
2. integration tests for the Meteor app located in ```specs```.

You can launch all tests using `gulp test` or `npm test`

You can also run the app in test mode to check integration as you develop

    npm test:ui

Check for ESlint compliance

    npm run lint


### Deploy with Docker

We use Docker to run in production.

1. build the Docker topogram/topogram container with `./build.sh`
1. fetch a mongo Docker container for the DB and run the app with `docker-compose up`


## Build the docs

All the docs will be built in the `.docs/` folder.

    gulp doc

## Publishing instructions

This project is set up to automatically publish to npm. To publish:

1. Set the version number environment variable: export VERSION=1.2.3
1. Publish: ```gulp publish```

## Internationalization

Topogram supports internationalization. Please read our [i18n guidelines](https://github.com/topogram/topogram/wiki/App-translation) and feel free to add your own language by translating a file in `./i18n` folder!
