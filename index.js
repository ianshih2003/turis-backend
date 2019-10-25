const express = require("express");
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const io = require('socket.io').listen(server);

dotenv.config();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


//sockets 
let touristSocket = null;
let guideSocket = null;

io.on("connection", socket => {
  console.log("a user connected :D");

  socket.on("guideRequest", touristLocation => {
    touristSocket = socket;
    console.log("Someone is looking for a Guide");    //show in console when a tourist emit a guideRequest socket
    console.log(touristLocation);
    
    if (guideSocket !== null){                         //if a guide emits a "looking for tourists" socket
      guideSocket.emit("touristRequest", touristLocation); //sending tourist's location to the guide assigned
    }

  });

  socket.on("guideLocation", guideLocation => {
    console.log(guideLocation);

    if (touristSocket !== null) {
      touristSocket.emit("guideLocation", guideLocation);
    }
  });

  socket.on("lookingForTourists", () => {
    console.log("A guide is looking for tourists");
     guideSocket = socket;
  });

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

httpServer.listen(3000, () => console.log("Server up"));