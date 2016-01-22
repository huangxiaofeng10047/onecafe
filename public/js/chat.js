var username=$('.username').data('id');
var password=username;
var other=$('.other').data('id');

var opts = {
  container: document.getElementById('demo'),
  width: 700,
  height: 500,
  appkey: 23302560,
  uid: username,
  credential: password,
  touid: other,
  themeBgColor: '#2db769',
  themeColor: '#fff',
  msgBgColor: '#2db769',
  msgColor: '#fff',
  pluginUrl: 'http://www.taobao.com/market/seller/openim/plugindemo.php'
};
window.onload = function() {
  WKIT.init(opts);

};
