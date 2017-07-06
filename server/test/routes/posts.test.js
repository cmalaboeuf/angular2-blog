process.env.NODE_ENV = 'test';

let Post = require('../../models/post');
let User = require('../../models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let jwt = require('jwt-simple');
var config = require('../../config/'+ process.env.NODE_ENV + ".json")

chai.use(chaiHttp);
//Our parent block

describe('Posts', () => {
  const validUserCredentials = {
    email: 'test',
    password: 'test',
    name : 'test',
    firstname: 'test'
  };

  let token= "";
  let user;

  before((done) => { //Before each test we empty the database
    Post.remove({}, (err) => {
      if(!err){
        let newUser = User(validUserCredentials);
        newUser.save((err)=>{
          if(!err){
            User.findOne({
            email: validUserCredentials.email
          },(err,_user)=>{
            user = _user;
            token = jwt.encode(_user,config.secret);
            done();
            })
          }
        });
      }else{
        return;
      }
    });
  });

  after(done=>{
    User.remove((err)=>{
      if(!err){
        Post.remove(err=>{
          done();
        });
      }
    })
  });

  /*
   * Test the /GET route
   */
  describe('/GET Post', () => {
    it('it should GET all the Posts from unAuth API', (done) => {
      chai.request(server)
        .get('/api/posts')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          res.body.data.length.should.be.eql(0);
          done();
        });
    });

    it('it should GET all the Posts from Auth API', (done) => {
      chai.request(server)
        .get('/api/v1/posts')
        .set('Authorization','JWT ' +token )
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST a Post', () => {
    it('it should POST a post', (done) => {
      let post = {
        'title' : 'Get started',
        'url' : 'get-started',
        'content' : 'Any content',
        'tags' : [],
        'date' : Date.now,
        'author' : []
      };
      chai.request(server)
        .post('/api/v1/posts')
        .set('Authorization','JWT ' +token )
        .send(post)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('object');
          res.body.msg.should.be.eql('Post successfully added');
          done();
        });
    });

    it('it should not POST a post without title field', (done) => {
      let post = {
        'url' : 'get-started',
        'content' : 'Any content',
        'tags' : [],
        'date' : Date.now,
        'author' : []
      };
      chai.request(server)
        .post('/api/v1/posts')
        .set('Authorization','JWT ' +token )
        .send(post)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.err.should.have.be.a('object');
          res.body.err._message.should.be.eql('Post validation failed');
          done();
        });
    });
  });
});