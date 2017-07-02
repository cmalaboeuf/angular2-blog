process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Post = require('../models/post');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Posts', () => {
    beforeEach((done) => { //Before each test we empty the database
        Post.remove({}, (err) => { 
           done();         
        });     
    });
/*
  * Test the /GET route
  */
  describe('/GET Post', () => {
      it('it should GET all the Posts', (done) => {
        chai.request(server)
            .get('/api/v1/posts')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});