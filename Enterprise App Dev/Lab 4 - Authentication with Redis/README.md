## Simple User Login and Signup System 

This is a simple and working user registration and authentication system built using Node, MongoDB and Redis. 

MongoDB acts as a primary data store and Redis is used as a external session store. 

You need to have following softwares installed in your system. Node, MongoDB, Redis

## How to run

npm install --save express express-session redis connect-redis nconf mongoose body-parser chalk ejs @hapi/joi

Change the config.json file according to your system configuration. mainly the mongodb local server address

Run redis server using redis-server on local

Then run the application using the following command.

node app.js

Application can be viewed throgu localhost:3000 on any browser
