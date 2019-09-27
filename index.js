const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
dotenv.config();


var pusher = new Pusher({ // connect to pusher
    appId: process.env.ID, 
    key: process.env.KEY, 
    secret:  process.env.SECRET,
    cluster: process.env.CLUSTER, 
  });


//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true , useCreateIndex: true}, () => console.log('Conection Success'))

//MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Importar Rutas
const authRoute = require('./routes/auth');
const authRouteGuide = require('./routes/authGuide')
const postRoute = require('./routes/posts');
const pusherRoute = require('./routes/pusher');
const returnRoute = require('./routes/returnInfo');
//MiddleWare Ruta
app.use('/api/turista', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/guide', authRouteGuide);
app.use('/api/pusherReq', pusherRoute);
app.use('/api/returnInfo', returnRoute);

app.listen(3000, () => console.log("Server up"));