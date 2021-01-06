const mysql = require('mysql')

const connection = mysql.createConnection({
    host: "db4free.net",
    user: "akram_dbeiri",
    password: "akram_1996",
    database : 'maschine_health'
  });

  connection.connect(function(err) {
    if(err) throw err;
     console.log("Connected!");
  });

  module.exports = connection