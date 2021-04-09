const express = require('express')
const socketio = require("socket.io")
const cors = require('cors');
const bodyParser = require('body-parser')
const bcrypt= require("bcrypt")
const jwt = require('jsonwebtoken');


const maschine = require('./maschine.model')
const user = require('./use.model');

const accessTokenSecret = require('./config')

const authenticate = require('./auth.middleware')


//App setup
const app = express()
const PORT = 8000

app.use(cors());
app.use(bodyParser.json());

const server = app.listen(PORT,function(){
    console.log(`Listening on port ${PORT}`);
})

const io = socketio(server, {
    cors: {
      origin: true,
    },
  });
   

app.get('/', function(req,res){
        res.sendFile(__dirname + '/index.html') 
})

//static files
app.use(express.static("public"))

io.on('connection', function(socket)  {
    console.log("New user was connected")
      
    socket.on('createMessage', (message) => {
        maschine.findOne(message.modelDisplayName ,function(result){
            if(result.length > 0){
                maschine.stateUpdate({id: message.modelDisplayName , state: message.state , date: new Date()})
            } else {
            maschine.create({ modelDisplayName: message.modelDisplayName ,
                modelName: message.modelName,
                classification: message.classification,
                classProbability: message.classProbability,
                classIndex: message.classIndex,
                icon: message.icon})
            maschine.stateUpdate({id: message.modelDisplayName , state: message.state , date: new Date()})
        }})
        io.emit('sendMessage',message)
        console.log("createdMessage", message)
    })

    socket.on("disconnect", function(){
        console.log("user was disconnected")
    })
})

//Get all maschines
app.get('/maschine',authenticate,(request,response) => {
    maschine.findAll( function(results){
        response.json(results)
    });
})

//Sign up User
app.post('/subscribe' ,(request,response) => {
    user.addUser(request.body)
})

//Get users
app.get('/user',authenticate,(request,response) => {
    user.findUser( request.body.name, request.body.password, function(results){
        response.json(results)
    });
})

//Login user
app.post('/login', (request,response) => {
    const {name, password} = request.body;
     user.findUser(name,password,function(result) {
         if(result.length > 0){
            const accessToken = jwt.sign({ name, password }, accessTokenSecret);
            response.json({accessToken})
         } else {
             response.status(401).json({error:"user name or password incorrect"})
         }
       } )
})


  



