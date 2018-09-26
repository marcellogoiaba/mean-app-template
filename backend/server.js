const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const users = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/templateApp', { useNewUrlParser: true });
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Init passport
app.use(passport.initialize());
require('./config/passport')(passport);

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));




app.use('/', users);
const port = process.env.API_PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:`, port));
