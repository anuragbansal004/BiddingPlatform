var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var bidding= require('./routes/bidding');

var mysql=require('mysql');

var connection=mysql.createConnection({
  host: 'tester.cjok0ugblgew.ap-southeast-1.rds.amazonaws.com',
  user: 'test',
  password:'test1234',
  port: 3306,
  database:'bidding'
});

connection.connect(function(err)
{
  if(!err)
    console.log('Connected');
  else 
    console.log('Not connected to Mysql'+err);
});




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('html', require('hjs').renderFile);
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  
  req.connection=connection;
  next();
  
});

app.use('/', routes); 
app.use('/users', users);

app.use('/bidding',bidding);


// catch 404 and forward to error handler

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
