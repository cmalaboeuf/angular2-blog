process.env.NODE_ENV = 'test';

var config = require('../../config/'+ process.env.NODE_ENV + ".json")
let chaiHttp = require('chai-http');
let chai = require('chai');
let server = require('../../server');
let User = require('../../models/user');
var jwt = require('jwt-simple');
chai.should();
chai.use(chaiHttp);

describe('Auth', () => {

  const validUserCredentials = {
    email: 'test',
    password: 'test',
    name : 'test',
    firstname: 'test'
  };

  const invalidUserCredentials = {
    email: 'test',
    password: 'wrong',
    name : 'test',
    firstname: 'test'
  };

  after(done=>{
    User.remove((err)=>{
      if(!err){
        done();
      }
    })
    server.server.close();
  });
  describe('/POST /api/authenticate', () => {
    it('should return Authentication succes', (done) => {
      chai.request(server.app)
        .post('/api/adduser')
        .send(validUserCredentials)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.msg.should.be.to.eql('Successfully saved');
          res.body.success.should.be.to.eql(true);
          done();
        });
    });
    it('should return error wrong user', (done) => {
      chai.request(server.app)
        .post('/api/authenticate')
        .send(invalidUserCredentials)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.msg.should.be.to.eql('Authentication failed');
          res.body.success.should.be.to.eql(false);
          done();
        });

    });
    it('should return error wrong password', (done) => {
      chai.request(server.app)
        .post('/api/authenticate')
        .send(invalidUserCredentials)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.msg.should.be.to.eql('Authentication failed');
          res.body.success.should.be.to.eql(false);
          done();
        });
    });

    it('should return a token', (done) => {
      chai.request(server.app)
        .post('/api/authenticate')
        .send(validUserCredentials)
        .end((err, res) => {
          res.should.have.status(200);
          User.findOne({
            email: validUserCredentials.email
          },(err,user)=>{
            let encodedToken = jwt.encode(user,config.secret);
            res.body.token.should.be.to.eql(encodedToken);
            res.body.success.should.be.to.eql(true);
            done();
          });
        });
    });
  });
});