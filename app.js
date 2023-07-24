var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const RateLimit = require("express-rate-limit");
const helmet = require("helmet");
// Import the mongoose module
const mongoose = require("mongoose");

const compression = require("compression");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog')

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  }),
);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(limiter);
app.use(compression()); // Compress all routes


// Set up rate limiter: maximum of twenty requests per minute

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});

app.use(express.static(path.join(__dirname, 'public')));


// Set up mongoose connection

mongoose.set("strictQuery", false);
// Define the database URL to connect to.
const dev_db_url =
  "mongodb+srv://spider:kVunRROTmXqW4vQL@cluster0.hktvh3o.mongodb.net/game_store?retryWrites=true&w=majority";
const mongoDB = process.env.MONGO_URL || dev_db_url;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}


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
