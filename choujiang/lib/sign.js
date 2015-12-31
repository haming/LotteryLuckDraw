jsSHA = require('jssha');
var createNonceStr = function () {
  return Math.random().toString(36).substr(2, 15);
};

var createTimestamp = function () {
  return parseInt(new Date().getTime() / 1000) + '';
};

var raw = function (args) {
  var keys = Object.keys(args);
  keys = keys.sort();
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });

  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
};

var swap = function(items, firstIndex, secondIndex){
  var temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
};
var partition = function(items, left, right) {
  var pivot   = items[Math.floor((right + left) / 2)],
      i       = left,
      j       = right;
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j);
      i++;
      j--;
    }
  }
  return i;
};
var split =function(items, left, right) {
  var index;
  if (items.length > 1) {
    index = partition(items, left, right);
    if (left < index - 1) {
      split(items, left, index - 1);
    }
    if (index < right) {
      split(items, index, right);
    }

  }
  return items;
};

/*---------------快速排序算法---------------*/


/**
 * @synopsis 签名算法
 *
 * @param jsapi_ticket 用于签名的 jsapi_ticket
 * @param url 用于签名的 url ，注意必须动态获取，不能 hardcode
 *
 * @returns
 */
exports.sign = function (jsapi_ticket, url) {
  var ret = {
    jsapi_ticket: jsapi_ticket,
    nonceStr: createNonceStr(),
    timestamp: createTimestamp(),
    url: url
  };
  var string = raw(ret);
  shaObj = new jsSHA(string, 'TEXT');
  ret.signature = shaObj.getHash('SHA-1', 'HEX');

  return ret;
};
exports.signTicket = function (api_ticket,card_id) {
  var result = {
    timestamp: createTimestamp(),
    nonce_str: createNonceStr(),
    api_ticket: api_ticket,
    card_id:card_id
  };

  var array = [];
  array[0] = result.timestamp;
  array[1] = result.nonce_str;
  array[2] = result.api_ticket;
  array[3] = result.card_id;

  var resultToDeal = split(array,0,array.length-1);
  var stringToDeal = resultToDeal[0]+resultToDeal[1]+resultToDeal[2]+resultToDeal[3];
  //console.log("string1"+stringToDeal);
  shaObj1 = new jsSHA(stringToDeal, 'TEXT');
  result.signature = shaObj1.getHash('SHA-1', 'HEX');

  return result;
};
