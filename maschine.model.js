const { response } = require('express');
const connection = require('./db_config')

let maschine = {} 

maschine.findAll = function(result){
    
    connection.query( "SELECT * FROM maschine JOIN ( SELECT * FROM maschinestate WHERE date IN ( SELECT MAX(date) FROM maschinestate GROUP BY id ) ) S ON maschine.modelDisplayName = S.id ",  function (err, res) {
        if(err) throw err;
        return  result(res);
      });
}

maschine.findOne = function(id,result){
    connection.query("SELECT * FROM maschine WHERE modelName = ?", [id], function(error,response){
        if(error) throw error;
        return result(response)
    })
}

maschine.create = function(maschineObject){
    const sqlInsert = "INSERT INTO maschine SET ?"
    connection.query(sqlInsert, maschineObject, (err) => {
        if(err) throw err;
       });
}

maschine.stateUpdate = function(stateObject){
    const sqlInsert = "INSERT INTO maschinestate SET ?"
    connection.query(sqlInsert, stateObject, (err) => {
        if(err) throw err;
       });
}


/*maschine.update = function(id,state){
    connection.query("UPDATE maschine SET state = ? WHERE modelName = ?" , [state, id], function(error, results){
        if(error) throw error;
        response.send(results)
    })
}*/


module.exports = maschine;