const express = require('express')
const socket = require("socket.io")
const maschine = require('./maschine.model')
const connection = require('./db_config')

//App setup
const app = express()
const PORT = 8000
const server = app.listen(PORT,function(){
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
})

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html')
})

//static files
app.use(express.static("public"))

//socket setup
const io = socket(server)

io.on('connection', function(socket)  {
    console.log("New user was connected")

    socket.on('createdMessage', (message) => {
        io.emit('newMessage', {
            modelDisplayName: message.modelDisplayName,
            modelName: message.modelName,
            classification: message.classification,
            classProbability: message.classProbability,
            classIndex: message.classIndex,
            state: message.state,
            icon: message.icon,
            createdAt: new Date().getTime()
        })
    })
  
    socket.on('createMessage', (message) => {
        maschine.create(message)
        console.log("createdMessage", message)
    })


    socket.on("disconnect", function(){
        console.log("user was disconnected")
    })
})

//Get all maschines
app.get('/maschine',(request,response) => {
    maschine.findAll( function(results){
        console.log(results)
        response.send(results)
    });
})

//Get one maschine
app.get('/maschine/:modelName',(request, response) => {
    const id = request.params.modelName
    maschine.findOne(function(results){
       console.log(results)
       response.send(results)
   },id)
})

//Update maschine
app.put('/maschine',(request, response) => {
    connection.query("UPDATE maschine SET state = ? WHERE modelName = ?" , ["Tunisia", "Aki"], function(error, results){
        if(error) throw error;
        response.send(results)
    })
})


