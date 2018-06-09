var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var multer  = require('multer')
var sql = require('./config/db-config');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moment = require('moment');
var cors = require('cors');
var allJobs = {}
var app = express();
const http = require('http');
const intervalDts = 5;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/index', indexRouter);
app.use('/users', usersRouter);
// Send all other requests to the Angular app
app.get('*', (req, res) => {
  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

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
app.listen(8080, ()=>{
  console.log('cors')
})
getAllJobs().then(jobs=>{
  jobs.recordset.forEach(j=>{
    xCalendar(j.job, j.minDts, j.maxDts);
  })
})
function xCalendar(job,startDate, endDate){
  let mSDate = moment(startDate);
  let mFDate = moment(endDate);
  let xAxis = [];
  let resArray = [];
  let idx = 0;
  let jobObj = {};
  while(mSDate <= mFDate){
    xAxis.push(mSDate);
    resArray[idx] = 0;
    mSDate = moment(mSDate.add(intervalDts,"minute"));
    ++idx;
  }
  getData().then(cp=>{
    return cp.request()
    .query('select * from table_1').then(data=>{
      data.recordset.forEach(d=>{
        for(let i = 0; i < xAxis.length; ++i){
          if(xAxis[i] > moment(d.dts).utc()){
            // console.log(xAxis[i])
            ++resArray[i];
            break;
          }
        }
      })
      for(let i = 0; i < resArray.length; ++i){
        if(resArray[i]){
          console.log(resArray[i])          
        }
      }
      allJobs[job] = {
        xAxis:xAxis, occurence: resArray
      }
    })
  }).catch(err=>{
  })
}
function getData(){
  return sql.connect();
}
function getAllJobs(){
  return sql.connect().then(cp=>{
    return cp.request()
      .query('select job, minDts, maxDts from table_1');
  })
}
module.exports = app;
