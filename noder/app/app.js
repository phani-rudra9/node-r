const app = require('express')();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const SensData = require('./models/data');

const port = process.env.PORT || 4300;
server.listen(port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// mongodb connection
// mongodb user key - Hg6LV2N8QEcKIiK6
// mongoose.connect('mongodb+srv://sampath:Hg6LV2N8QEcKIiK6@temperature-osnvr.mongodb.net/liepu?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 2000
// }).then(() => {
//   console.log('Connected successfully!');
// }).catch(err => {
//   console.log(err.reason)
// });

const humiArray = [];

// create dynamic humidity data every 15 seconds
setInterval(() => {
  var randomHumid = Math.floor(Math.random() * 10 + 15);
  var currentTime = new Date(); 
  var currentDay = currentTime.getDay();
  var currentHr = currentTime.getHours();
  var currentMin = currentTime.getMinutes();
  var currentSec = currentTime.getSeconds();
  var timeSecs = currentTime.getTime();
  onProcessData(randomHumid, currentTime, currentDay, currentHr, currentMin, currentSec, timeSecs); 
}, 1500);

// process dynamic humidity data
function onProcessData(randomHumid, currentTime, currentDay, currentHr, currentMin, currentSec, timeSecs) {
  var humidityData = new SensData({
    humid: randomHumid,
    timstp: currentTime,
    days: currentDay,
    hours: currentHr,
    mins: currentMin,
    secs: currentSec,
    time: timeSecs
  });
  if(humiArray.length > 9) {
    humiArray.shift();
    humiArray.push(humidityData);
  } else {
    humiArray.push(humidityData);
  }
  console.log(humiArray);
};

// humidity data request
app.get('/data', (req, res) => {
  res.status(200).json({
    message: 'recorded data fetch successfully!',
    data: humiArray[humiArray.length - 1]
  });
});

module.exports = app;