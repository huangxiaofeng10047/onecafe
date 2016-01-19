var mocha = require('mocha');
var should = require('chai').should();
var http = require('http');
var rest = require('restler');

var base = 'http://localhost:3000';


describe('reg', function() {
  it('should return success:1', function(done) {
    rest.post(base + '/reg', {
      data: {
        'username': '1111a',
        'password': '1111a'
      }
    }).on('complete', function(data) {
      data.success.should.equal(1);
      done();
    });
  });
});


describe('sign', function() {


    it('should return success:0', function(done) {
      rest.post(base + '/login', {
        data: {
          'username': 'aaa',
          'password': 'aaaaaa'
        }

      }).on('complete', function(data) {
        data.success.should.equal(0);
        done();
      });
    });
    it('should return success:0', function(done) {
      rest.post(base + '/login', {
        data: {
          'username': 'aassssa',
          'password': 'aaa'
        }

      }).on('complete', function(data) {
        data.success.should.equal(0);
        done();
      });
    });
    it('should return success:0', function(done) {
      rest.post(base + '/login', {
        data: {
          'username': 'aassssa',
          'password': 'aaaasdasd'
        }

      }).on('complete', function(data) {
        data.success.should.equal(0);
        done();
      });
    });

    it('should return success:1', function(done) {
      rest.post(base + '/login', {
        data: {
          'username': 'aaa',
          'password': 'aaa'
        }
      }).on('complete', function(data) {
        data.success.should.equal(1);
        done();
      });
    });





});
