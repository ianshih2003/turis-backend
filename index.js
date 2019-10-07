const express = require("express");
const app = express();
const httpServer = require('http').createServer(app);
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const io = require('socket.io')(httpServer);

dotenv.config();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
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

app.post('/pusher/auth', function(req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});

//Sockets
io.on('connection', function(socket)
{
  socket.on('passengerCoordinates', function(msg){
    io.emit('driverSocket', msg);
  })
})

httpServer.listen(3000, () => console.log("Server up"));