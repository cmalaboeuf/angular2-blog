var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Post = new Schema({
  title: String,
  url: { type: String, index: { unique: true } },
  content: String,
  date: Date
});

module.exports =  mongoose.model('Post', Post);