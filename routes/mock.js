const fs = require('fs-extra'),
      request = require('request'),
      async = require('async'),
      url = require('url');

var mock = {};

mock.setVar = function(variable, value) {
  mock[variable] = value;
}

mock.get = function(req, res, next) {
	var _url = req.query.url;

	if (_url.indexOf('/InstantDEX/allcoins') > -1) {
	  res.end(JSON.stringify({
	  	'native': [],
	  	'basilisk': [ 'KMD', 'BTC'],
	  	'full':[],
	  	'tag': '18430609759584422959'
	  }));
	}
	if (_url.indexOf('/bitcoinrpc/getaddressesbyaccount') > -1) {
		console.log(_url.indexOf('/bitcoinrpc/getaddressesbyaccount'));
		res.end(JSON.stringify({
	  	'result': [
				"RDbGxL8QYdEp8sMULaVZS2E6XThcTKT9Jd",
				"RL4orv22Xch7PhM5w9jUHhVQhX6kF6GkfS",
				"RUrxvPTEKGWEDTvAtgiqbUTTFE53Xdpj8a",
				"RPJoLDa7RezvfUUBr7R3U8wrP16AgUsNw3",
				"RQPTpRJEeafNx5hkDzgjcsPyU4E8RFVApT"
			]
		}));
	}
	if (_url.indexOf('/api/dex/listunspent') > -1 ||
			_url.indexOf('/api/dex/listtransactions') > -1 ||
			//_url.indexOf('/api/dex/getbalance') > -1 ||
			_url.indexOf('/api/dex/refresh') > -1) {
		res.end(JSON.stringify({
			'some key': 'some value'
		}));
	}

	if (_url.indexOf('/api/dex/getbalance') > -1) {
		if (_url.indexOf('/api/dex/getbalance') > -1) {
			res.end(JSON.stringify({
				"result":"success",
				"received":0,
				"sent":0,
				"balancef":0,
				"balance":0,
				"interest":0,
				"height":351716,
				"mined":1055148,
				"randipbits":2064902657,
				"coin":"KMD",
				"tag":"17286985499889946142"
			}));
		} else if (_url.indexOf('&balance=0') > -1) {
			res.end(JSON.stringify([]));
		}
	}
}

module.exports = mock;