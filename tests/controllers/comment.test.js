var mocha = require('mocha');
var should = require('chai').should();
var http = require('http');
var rest = require('restler');

var base = 'http://localhost:3000';


describe('comment test', function() {
  it('should return success:0', function(done) {
    rest.post(base + '/q/4', {
      data: {
        'username': '1111a',
        'password': '1111a'
      }
    }).on('complete', function(data) {
      data.success.should.equal(0);
      done();
    });
  });


});
