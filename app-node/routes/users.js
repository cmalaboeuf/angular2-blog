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
    User.findById({ '_id': req.params.id },(err,data)=>{
      return res.send({'data':data});
    });
  },
  getMe : (req,res,next) => {
    return res.send({"user":req.user});
  },
  editUser: (req, res,next) => {
    var id = req.params.id;    
    if(!req.body.name || ! req.body.password || !req.body.name && !req.body.password){     
      res.status(400);
      next();
    }
    else{
      User.findOneAndUpdate({
        _id: id
      }, {
        $set: {
          name: req.body.name || '',
          password: req.body.password || '',  
        }}).exec();
      res.status(200);
      return res.send({});
      
    }
  }
};
module.exports = userApi;