const { response } = require('express');
const connection = require('./db_config')

let user = {} 

user.addUser = function(userObject){
    const sqlInsert = "INSERT INTO user SET ?"
    connection.query(sqlInsert, userObject, (err) => {
        if(err) throw err;
       });
}

user.findUser = function(name , password, result){
    connection.query("SELECT * FROM user WHERE name = ? and password = ?", [name , password], function(error,response){
        if(error) throw error;
        return result(JSON.parse(JSON.stringify(response)))
    })
}

module.exports = user;