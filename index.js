const express = require('express')
const socketio = require("socket.io")
const cors = require('cors');


const maschine = require('./maschine.model')
const connection = require('./db_config')

//App setup
const app = express()
const PORT = 8000

app.use(cors());

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
            if(result){
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
app.get('/maschine',(request,response) => {
   
    maschine.findAll( function(results){
        response.json(results)
    });
})



  



