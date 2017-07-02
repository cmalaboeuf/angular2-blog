var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Tag = new Schema({
  name: { type: String, index: { unique: true } },
  slug: { type: String, index: { unique: true } },
  description: String,
  date: Date
});
module.exports = mongoose.model('Tag', Tag);