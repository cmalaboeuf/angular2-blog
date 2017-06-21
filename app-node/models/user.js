var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var UserSchema = new Schema({
  email: {
    type:String,
    unique : true,
    required : true
  },
  firstname : {
    type: String,
    unique : false,
    required : true
  },
  name: {
    type: String,
    unique: false,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile_image : {
    type:String,
    unique: false,
    required : false
  },
  facebook_url : {
    typeS :String,
    unique : false
  }
});

UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.pre('findOneAndUpdate', function(next) {
  var user = this;
  if(user.getUpdate().$set.password){
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.getUpdate().$set.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.findOneAndUpdate({}, { password:hash });
        next();
      });
    });
  }
});

UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);