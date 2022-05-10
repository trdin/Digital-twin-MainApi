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
var mongoDB = "mongodb://" + (process.env.mongoURL || "host.docker.internal") + "/webapp";
mongoose.connect(mongoDB);
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


var app = express();

var cors = require('cors');
var allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = "The CORS policy does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
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
app.use('/faculty', facultyRouter)
app.use('/restaurants', restaurantRouter)
app.use('/studentWork', studentWorkRouter)
app.use('/wifi', wifiRouter)
app.use('/wifiSpeed', wifiSpeedRouter)

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
  //res.render('error');
  res.json(err);
});
/*console.log('oskar')
var j = schedule.scheduleJob('*5 * * * * *', function () {  // this for one hour
  console.log('this is in ')
  update.update();
});*/

module.exports = app;
