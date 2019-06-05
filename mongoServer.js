// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var mongojs = require("mongojs");
// Create an instance of the express app.
var app = express();
app.use
var db = mongojs("ricksDB", ['ricksConnections']);

var PORT = process.env.PORT || 8080;
var mysql = require ("mysql");
// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/html/get", function(req, res){
    //1. MongoCall
    //2. Return HTML

    db.ricksConnections.find(function (err, docs) {
        res.render("index", {
            mongoData: docs
        });
        console.log(docs);
    });    
});

var connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user:"webuser",
    password: "UCR",
    database: "personal_journal"
  
  });
  
  connection.connect(function(err){
    if (err){
      console.log("This is bad.");
      return;
    }
    console.log("MySQL Connected:"
    + connection.threadId);
    
  })
  
  app.post("/api/post", function(req, res){
  
    console.log("PUT", req.body);
  
    var sql ="  UPDATE events ";
    sql += "SET type=?,";
    sql += "journal_time=UTC_TIMESTAMP(),";
    sql += "begin_time=?,";
    sql += "end_time=?";
    sql += "WHERE id=?";
    sql += ";";
  
    console.log(sql);
  
    connection.query(sql, [
      req.body.type,
      req.body.begin_time,
      req.body.end_time,
      req.body.id
  
    ],function (err, sqlResults){
        if (err){
          console.log("you fucked up");
          throw err;
        }
        res.json(sqlResults);
        console.log(sqlResults);
  
    }) 
  
  //   var returnValue = {
  //     "parker": "is smart!"
  
  //   };
  //   res.json(returnValue);
   })
  
  app.get("/api/get", function(req, res){
    var sql ="SELECT * FROM events ORDER BY ID DESC;";
    connection.query(sql, function(err, sqlResults){
      if(err){
        console.log("This is bad.");
        throw err;
      }
      res.json(sqlResults);
  
    });
  
  //   var returnValue = {
  //     "hello": "world!"
  
  //   };
  
  //   res.json(returnValue);
   });
  
  app.put("/api/put", function(req, res){
    var returnValue = {
      "hello": "world!"
  
    };
  
    res.json(returnValue);
  })
  
  app.delete("/api/delete", function(req, res){
    var returnValue = {
      "hello": "world!"
  
    };
  
    res.json(returnValue);
  })
  
  
  
  
  app.listen(PORT, function(){
    console.log("web server is running on port:" + PORT);
  
  });
  