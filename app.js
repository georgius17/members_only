const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require('./models/user');

var mongoose = require('mongoose');
require('dotenv').config();

const mongoDB = process.env.APP_SECRET;

// const mongoDB = 'mongodb+srv://skielnet:sekvojovec1@cluster0.8twmn.azure.mongodb.net/auth_odin?retryWrites=true&w=majority';

mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const MongoStore = require('connect-mongo')(session);
const connection = mongoose.createConnection(mongoDB, { useNewUrlParser: true });
const sessionStore = new MongoStore({ mongooseConnection: connection, collection: 'sessions' });

const indexRouter = require('./routes/index');
const app = express();
app.use(helmet());
app.use(compression());

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {return done(err);}
      if (!user) {return done(null, false, { msg: "Incorrect username" });}
      else {
        bcrypt.compare(password, user.password, (err, res) => {
        if (res){
          return done(null, user);
        } else {
          return done(null, false, { msg: "Incorrect password" })
        }
      })
      }
    })
  }))

passport.serializeUser(function (user, done){
  done(null, user.id)
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done (err, user);
  });
});

// view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    cookie:{ maxAge: 60000 }, 
    secret: "cats", 
    resave: false, 
    saveUninitialized: true,
    store: sessionStore 
  }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);

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
