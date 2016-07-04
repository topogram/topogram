FROM node:0.10.43
MAINTAINER Clément Renaud <hello@clementrenaud.com>

# FIX
RUN ln -s /usr/local/bin/node /usr/local/bin/nodejs

# Prebuild everything, so we dont push it everytime
# install meteor dependencies
ADD programs/server/package.json /tmp/package.json
RUN cd /tmp && npm install
# now our dependencies
ADD package.json /tmp/package.json
RUN cd /tmp && npm install --production
# and bind everything to the correct path
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/
RUN mkdir -p /opt/app/programs/server
RUN mkdir -p /opt/app/programs/web.browser/
RUN ln -s /tmp/node_modules /opt/node_modules
RUN ln -s /tmp/node_modules /opt/app/programs/server/node_modules
RUN ln -s /tmp/node_modules /opt/app/programs/web.browser/node_modules
# RUN ln -s /tmp/node_modules /opt/app/programs/web.cordova/node_modules

ADD . /opt/app
WORKDIR /opt/app

ENV PORT 80
EXPOSE 80

CMD ["node", "main.js"]
