var express = require("express");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = {
  article:require('./articleSchema'),
  comment:require('./commentSchema')
}

var PORT = process.env.PORT || 8080;
var app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

// Connect Handlebars to our Express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Have every request go through our route middleware


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);
app.get("/", function (req, res) {
  db.article.find().populate("comments").then(function(articles){
    console.log('_____');
    console.log(articles);
    var data ={
      articles:articles
    }
    res.render("index",data);
  });
})

app.post("/comment",function(req,res){
  // save comments to database//
  var comment = {
    author:req.body.author,
    comment:req.body.comment
  }
  db.comment.create(comment).then(function(newComment){
   db.article.findOneAndUpdate({ _id: req.body._id }, {$push: { comments: newComment._id}}, { new: true })
 .then(function(dbarticle){
   console.log (dbarticle);
 });
   console.log(newComment);
  })  
})

app.get("/scrape", function (req, res) {
  axios.get("https://www.rollingstone.com/culture/culture-news//").then(function (response) {
    // console.log(response);
    var $ = cheerio.load(response.data);
    console.log($(".l-blog__item").length);
   
    $(".l-river article").each(function (i, element) {
      var heading = $(element).find("h3").text().trim();
     
      var link = $(element).find("a").attr("href");

      var summary =$(element).find("p").text().trim();
      
      var mongoDocument = {
          "heading": heading,
          "link" : link,
          "summary": summary
          
      };
      console.log(mongoDocument);
      db.article.find(mongoDocument).then(function(doc){
        console.log(doc);
        
        if(doc.length < 1){
          // creates new mongo document
          db.article.create(mongoDocument);
        }
      });

    })
  })
  res.render("scrapePage");
})

  // Listen on the port
  app.listen(PORT, function () {
    console.log("Listening on port: " + PORT);
  });
