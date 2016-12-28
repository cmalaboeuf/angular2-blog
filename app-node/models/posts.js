var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Post = new Schema({
    title: String,
    url: {type:String, index:{unique:true}},
    content: String,
    menuIndex: Number,
    date: Date    });
var Post = mongoose.model('Post', Post);
module.exports=Post;