var express = require("express");
var app = express();
app.use(express.json());
var mongojs = require('mongojs')
var db = mongojs("ricksDB", ['ricksConnections']);

var PORT = process.env.PORT || 8080;
var mysql = require ("mysql");


// hot to DELETE !!!///

app.delete("/mongo/delete", function(req, res){

    db.ricksConnections.remove(
        req.body.where,
        
    );
    res.json({
           "hello" : "world"
            
     });
});


//how to PUT!!//

// app.put("/mongo/put", function(req, res){

//     db.ricksConnections.update(
//         req.body.where,
//         {
//             $set: req.body.set
//         }
//     );
//     res.json({
//            "hello" : "put"
            
//      });
   
        
// });
   

// howt to POST//!!!!

// app.post("/mongo/post", function(req, res){

// db.ricksConnections.insert(
//     req.body
//     );

//     res.json({
//         "hello" : "world"
    
//     });
// });


// how to GET//!!!!!

// app.get("/mongo/get", function(req, res){


// db.ricksConnections.find(function (err, docs) {
//         res.json(docs);
//         console.log(docs);
//     });
// });

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
  


