const { request, response } = require('express')
const express = require('express')
const maschine = require('./maschine.model')
const connection = require('./db_config')

const app = express()
const port = 8000

//Get all maschines
app.get('/maschine',(request,response) => {
    maschine.findAll( function(results){
        console.log(results)
        response.send(results)
    });
})

//Get one maschine
app.get('/maschine/:modelName',(request, response) => {
    connection.query("SELECT * FROM maschine WHERE modelName = ?", [request.params.modelName], function(error, results){
        if(error) throw error;
        response.send(results)
    })
})

//Update maschine
app.put('/maschine',(request, response) => {
    connection.query("UPDATE maschine SET modelDisplayName = ? WHERE modelName = ?" , ["Tunisia", "Aki"], function(error, results){
        if(error) throw error;
        response.send(results)
    })
})


app.listen(port,() =>{
    console.log('hello')
})