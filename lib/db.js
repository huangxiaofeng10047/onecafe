var mongoose = require('mongoose');
var config = require('../config/config');

var mongodbHost = config.mongodbHost || '127.0.0.1',
  mongodbPort = config.mongodbPort || 27017,
  MongodbDbName = config.MongodbDbName || 'mico';

var db = mongoose.createConnection(mongodbHost, MongodbDbName, mongodbPort,{
  server: {
      auto_reconnect: true
    }
});

db.on('error', console.error.bind(console, '连接数据库出错:'));
db.once('open', function(){
	console.log('连接mongodb数据库成功');
});

module.exports = db;
