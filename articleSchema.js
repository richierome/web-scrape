var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articleModel = new Schema({

  heading: {
    type: String
  },
  link: {
    type: String
  },
  summary: {
    type: String
    
  },
  comments: [{
    type : Schema.Types.ObjectId,

    ref : "comment"

  }] 
});
var articleSchema = mongoose.model("article", articleModel);
module.exports = articleSchema;