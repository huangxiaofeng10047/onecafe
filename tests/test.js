var _ = require('lodash');


var array=[1,2,2];
var newArray=_.map(array,function (value) {
  return value*2;
});
console.log(newArray);
console.log('end');
