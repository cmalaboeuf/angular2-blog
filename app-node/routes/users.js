var User = require('../models/user.js');

var userApi = {
  getAll : (req,res) => {
    User.find((err,data)=>{
      if(!err)
        return res.send({data});
      else
        return res.send(500,err);
    });
  },
  getById : (req,res)=> {
    User.findById({ '_id': req.params.id },{password:0},(err,data)=>{
      return res.send({'data':data});
    });
  },
  getMe : (req,res) => {
     User.findById({ '_id': req.user._id },{password:0},(err,data)=>{
      return res.send({'data':data});
    });
    
  },
  editUser: (req, res,next) => {
    var id = req.params.id;
    if(!req.body.name){
      res.status(400);
      next();
    }
    else{
      User.findOneAndUpdate({
        _id: id
      }, {
        $set: {
          email: req.body.email,
          firstname : req.body.firstname,
          name: req.body.name ,
          password: req.body.password,
          profile_image :req.body.profile_image,
          facebook_url : req.body.facebook_url
        }}).exec();
      res.status(200);
      return res.send({});

    }
  }
};
module.exports = userApi;