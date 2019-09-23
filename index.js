const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const bodyParser = require('body-parser');
const cors = require('cors');
const Chatkit = require('@pusher/chatkit-server');

const long = 1231;

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true , useCreateIndex: true}, () => console.log('Conection Success'))

//MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//Importar Rutas
const authRoute = require('./routes/auth');
const authRouteGuide = require('./routes/authGuide')
const postRoute = require('./routes/posts');

//MiddleWare Ruta
app.use('/api/turista', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/guide', authRouteGuide)

// Chat 

// const instance_locator_id = 'v1:us1:d22b9637-d7b1-472d-b55b-a371e79f8b0b';
// const chatkit_secret = 'f6b7348a-4e4d-413f-9868-c39427055302:ThzQLlIVgwfILWu9qlRv9MhepQCZInOI24sEylMJYQ0=';

// const chatkit = new Chatkit.default({
//     instanceLocator: `v1:us1:${instance_locator_id}`,
//     key: chatkit_secret,
// });


//Pusher
var Pusher = require('pusher');

var channels_client = new Pusher({
  appId: '862698',
  key: '10c16690daf2f2d3896a',
  secret: '8706804bb8a865283e46',
  cluster: 'us2',
  encrypted: true
});

channels_client.trigger('my-channel', 'my-event', {
   "coords": {
        "latitude": 0.34343,
        "longitude": long
             }
  });


app.listen(3000, () => console.log("Server up"));