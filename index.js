const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Pusher = require('pusher');
dotenv.config();

app.get('/api/test', function(req, res){
  res.send('<h1>Hello world</h1>');
});

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECT, 
  { useNewUrlParser: true , useCreateIndex: true}, () => console.log('Conection Success'))

//MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

//Importar Rutas
const authRoute = require('./routes/auth');
const authRouteGuide = require('./routes/authGuide')
const postRoute = require('./routes/posts');
const returnRoute = require('./routes/returnInfo');
//MiddleWare Ruta
app.use('/api/turista', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/guide', authRouteGuide);
app.use('/api/returnInfo', returnRoute);


var pusher = new Pusher({ // connect to pusher
    appId: process.env.ID, 
    key: process.env.KEY, 
    secret:  process.env.SECRET,
    cluster: process.env.CLUSTER, 
  });

  app.get('/test', function(req, res, next){
    console.log("everything ok");
    res.send("hello world");
    next();
});


// for authenticating users
app.get("/pusher/auth", function(req, res) {
  var query = req.query;
  var socketId = query.socket_id;
  var channel = query.channel_name;
  var callback = query.callback;

  var auth = JSON.stringify(pusher.authenticate(socketId, channel));
  var cb = callback.replace(/\"/g,"") + "(" + auth + ");";

  res.set({
    "Content-Type": "application/javascript"
  });

  res.send(cb);
});
  
app.post('/pusher/auth', function(req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});

app.listen(3000, () => console.log("Server up"));