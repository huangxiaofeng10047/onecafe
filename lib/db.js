var mongoose = require('mongoose');
var config = require('../config/config');

var mongodbHost = config.MongodbHost || '127.0.0.1',
  mongodbPort = config.MongodbPort || 27017,
  mongodbDbName = config.MongodbDbName || 'onecafe';
  mongodbPoolSize = config.MongodbPoolSize || 3;


var db = mongoose.createConnection(mongodbHost, mongodbDbName, mongodbPort,{
  server: {
      auto_reconnect: true,
      poolSize:mongodbPoolSize
    }
});

db.on('error', console.error.bind(console, '连接数据库出错:'));
db.once('open', function(){
	console.log('连接mongodb数据库成功');
});

module.exports = db;
