var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Tag = new Schema({
    name: {type:String, index:{unique:true}},
    url: {type:String, index:{unique:true}},
    description: String,
    date: Date });
var Tag = mongoose.model('Tag', Tag);
module.exports=Tag;