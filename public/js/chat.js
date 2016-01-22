
var opts = {
  container: document.getElementById('demo'),
  width: 700,
  height: 500,
  appkey: 23015524,
  uid: 'ww1',
  credential: '123456',
  touid: '去你的',
  pluginUrl: 'http://www.taobao.com/market/seller/openim/plugindemo.php'
};
window.onload = function() {
  WKIT.init(opts);

};
