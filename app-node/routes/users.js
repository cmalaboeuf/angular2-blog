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
  getMe : (req,res) => {
    return res.send({'data':req.user});
  }
};
module.exports = userApi;