const { response } = require('express');
const connection = require('./db_config')

let maschine = {} 

maschine.findAll = function(result){
    const sqlSelect = "SELECT * FROM maschine;"
    connection.query(sqlSelect, function (err, res) {
        if(err) throw err;
        return  result(res);
      });
}

maschine.findOne = function(result,id){
    connection.query("SELECT * FROM maschine WHERE modelName = ?", [id], function(error,response){
        if(error) throw error;
        return result(response)
    })
}

maschine.create = function(maschineObject){
    const sqlInsert = "INSERT INTO maschine SET ?"
    connection.query(sqlInsert, maschineObject, (err) => {
       });
}


module.exports = maschine;