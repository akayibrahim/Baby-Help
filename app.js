var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser');
var mysql= require('mysql');
var http = require('http');

var index = require('./routes/index');
var users = require('./routes/users');
var helps = require('./routes/helps');
var week = require('./routes/week');
var month = require('./routes/month');
var addUser = require('./routes/addUser');
var updateUser = require('./routes/updateUser');
var read = require('./routes/read');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// process.env['MYSQL_HOST_IP'] = 'localhost';
// process.env['MYSQL_HOST_PORT'] = '6603';

//Database connection
app.use(function(req, res, next){
	global.connection = mysql.createPool({ // global.connection = mysql.createConnection({
	    host     : process.env.MYSQL_HOST_IP,
      user     : 'root',
      password : 'babyhelp',
      database : 'babyhelp',
      port: process.env.MYSQL_HOST_PORT,
      insecureAuth : false,
  });
  /*
	connection.connect(function (err) {
    if (err) throw err;
    console.log ('Connected');
  });
  */
  next();  
});

app.use('/', index);
app.use('/api/v1/users', users);
app.use('/api/v1/helps', helps);
app.use('/api/v1/week', week);
app.use('/api/v1/month', month);
app.use('/api/v1/addUser', addUser);
app.use('/api/v1/updateUser', updateUser);
app.use('/api/v1/read', read);

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
var server = http.createServer(app);
server.listen(4001);


//DEBUG=babyhelpdb:* npm start
//ALTER USER 'root' IDENTIFIED BY 'babyhelp'; 
//ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'babyhelp';
//flush privileges;
//docker exec -it appsDB bash 
//mysql -uroot or mysql -u root -p 
//https://medium.com/@avanthikameenakshi/building-restful-api-with-nodejs-and-mysql-in-10-min-ff740043d4be
//docker-compose up --force-recreate -d api
//docker-compose build --no-cache
