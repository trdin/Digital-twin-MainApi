var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();
//console.log(process.env)
//const fetch = require('node-fetch');
var schedule = require('node-schedule');
const update = require('./src/fetch/update');

// vključimo mongoose in ga povežemo z MongoDB
var mongoose = require('mongoose');
if (process.env.mongoURL && !process.env.mongoURL.includes(".mongodb.net"))
  process.env.mongoURL = "mongodb://" + process.env.mongoURL + "/webapp"
var mongoDB = (process.env.mongoURL || "mongodb://host.docker.internal/webapp");
mongoose.connect(mongoDB, err => { if (err) console.log(err); });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// vključimo routerje
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoutes');
var dataSeriesRouter = require('./routes/dataSeriesRoutes');
var barRouter = require('./routes/barRoutes');
var dormRouter = require('./routes/dormRoutes')
var eventRouter = require('./routes/eventRoutes')
var facultyRouter = require('./routes/facultyRoutes')
var restaurantRouter = require('./routes/restaurantRoutes')
var studentWorkRouter = require('./routes/studentWorkRoutes')
var wifiRouter = require('./routes/wifiRoutes')
var wifiSpeedRouter = require('./routes/wifiSpeedRoutes')
var messageRouter = require('./routes/messageRoutes');
var imageRouter = require('./routes/imageRoutes');


var app = express();

var cors = require('cors');
app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    return callback(null, true);
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Vključimo session in connect-mongo.
 * Connect-mongo skrbi, da se session hrani v bazi.
 * Posledično ostanemo prijavljeni, tudi ko spremenimo kodo (restartamo strežnik)
 */
var session = require('express-session');
var MongoStore = require('connect-mongo');
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: mongoDB })
}));
//Shranimo sejne spremenljivke v locals
//Tako lahko do njih dostopamo v vseh view-ih (glej layout.hbs)
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dataSeries', dataSeriesRouter);
app.use('/bars', barRouter);
app.use('/dorms', dormRouter)
app.use('/events', eventRouter);
app.use('/faculties', facultyRouter)
app.use('/restaurants', restaurantRouter)
app.use('/studentWork', studentWorkRouter)
app.use('/wifi', wifiRouter)
app.use('/wifiSpeed', wifiSpeedRouter)
app.use('/messages', messageRouter);
app.use('/images', imageRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});


module.exports = app;
