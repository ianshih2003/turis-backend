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

app.listen(3000, () => console.log("Server up"));