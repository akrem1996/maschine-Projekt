const mysql = require('mysql')

const connection = mysql.createConnection({
    host: "localhost",
    user: "Akrem",
    password: "Akrem081920",
    database : 'maschinen',
    port: "3306"
  });

  connection.connect(function(err) {
    if(err) throw err;
     console.log("DB Connected!");
  });

  module.exports = connection