var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
 
  author: {
    type: String
  },
  comment: {
    type: String

  }
});

var commentModel = mongoose.model("comment", commentSchema);
module.exports = commentModel;