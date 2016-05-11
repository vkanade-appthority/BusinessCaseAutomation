var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    http = require('http'),
    path = require('path');


// Routing Info
var routes = require('./routes'),
    api = require('./routes/api');

var app = express();

// Environment Variables
//app.set('port', '3000');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(routes);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3232');
  res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie, cookie');
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method === "OPTIONS") {
    console.log("Server options");
    res.end('');
  } else {
    next();
  }
});

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  // configure stuff here
  app.use(errorHandler());
}


// Exposed API

// returns Total count of
app.get('/countByPlatform', api.totalCountByPlatform);
app.get('/missingAppsByPlatform', api.missingApps);
app.get('/countOfAppsForOrg', api.countOfAppsForOrg);
app.get('/countByLastStage', api.totalCountByLastStage);
app.get('/missingAppsForOrg', api.totalMissingAppsForOrg);
app.get('/missingAppsByStatus', api.totalMissingAppsByStatus);
app.get('/appsWithLastStage', api.totalAppsWithLastStage); //appDetails
app.get('/detailsOfApplication', api.appDetails);
app.get('/appsWithNoReportScore', api.appsWithNoReportScore);


http.createServer(app).listen(3000, function(){
  console.log('Express server listening on port ' + 3000);
});



// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handlers
//
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });