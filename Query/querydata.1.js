var express = require('express');
var router = express.Router();
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;


function getData (data, callback){
  var connection = new Connection(config);
  var newdata = [];
  var dataset = [];
  connection.on('connect', function(err) {

      var sql = "SELECT * FROM dbo."+data.entity+" WHERE "+data.field+" LIKE '%"+data.params+"%'";

      var Request = require('tedious').Request;
      var request = new Request(sql, function (err, rowCount) {
          if (err) {
              callback(err);
          } else {
              if (rowCount < 1) {
                  callback(null, false);
              } else {
                  callback(null, newdata);
              }
          }
      });

      request.on('row', function(columns) {

          columns.forEach(function(column) {
                 dataset.push({
                     col: column.metadata.colName,
                     val: column.value
                 });


          });

          newdata.push(dataset);

      });

      connection.execSql(request);

  });

}