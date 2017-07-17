var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Post = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    index: {
      unique: true
    }
  },
  content: String,
  date: Date,
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  author: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updateAt: {
    type: Date,
    require: true
  }
});

module.exports = mongoose.model('Post', Post);

Post.pre('findOneAndUpdate', (next) => {
  let post = this;
  post.updateAt = Date.now();
  next();
});
