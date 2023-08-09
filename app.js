var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const RateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require('cors');

require('dotenv').config();
// Import the mongoose module
const mongoose = require("mongoose");

const compression = require("compression");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog')


var app = express();

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  }),
);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.enable('trust proxy');



// Set up rate limiter: maximum of twenty requests per minute

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30,
});


app.use(compression()); // Compress all routes

app.use(express.static(path.join(__dirname, 'public')));


// Set up mongoose connection

mongoose.set("strictQuery", false);
// Define the database URL to connect to.

const mongoDB = process.env.MONGODB_URI 

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// Apply rate limiter to all requests
app.use(limiter);

app.use(
  cors({
    origin: ["http://localhost:3000", process.env.ORIGIN],
  })
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
