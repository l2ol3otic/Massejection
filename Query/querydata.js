var express = require('express');
var router = express.Router();
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;


function connections() {
  
  var config = {
    userName: 'sa', // update me
    password: 'critical4875', // update me
    server: '45.77.38.34',
    options: {
      encrypt: true,
      database: 'SP4808',
      rowCollectionOnRequestCompletion: true
    }
  }
  var queryType;

  var connection = new Connection(config);

  connection.on('connect', function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("connection")
      //var x = verifySQLtype();
      console.log('Test mission : ', verifySQLtype())
    }
  });

  function verifySQLtype() {
    var result = [];
    var sqlcommand = "SELECT * FROM invSQL"
    request = new Request(sqlcommand, function (err, rowCount, rows) {
      if (err) {
        console.log(err);
      } else {
        console.log(rowCount + ' rows');
      }
    });

    request.on("row", function (columns) {
      var item = {};
      columns.forEach(function (column) {
        item[column.metadata.colName] = column.value;
      });
      result.push(item);   
    });
    request.on('done', function(){
      connection.close();
      return result;
  })

    //request.addParameter('username', TYPES.VarChar, sd);
    connection.execSql(request);
  }
 //return result

}
module.exports = {
  connections,
}