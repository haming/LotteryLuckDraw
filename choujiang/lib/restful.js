/**
 * Created by yons on 11/18/15.
 */
var http = require('https');
var equal = require('assert').equal;
var Buffer =require('Buffer');
var xml2js = require('xml2js');


exports.httpsRequest = function(host,path, data, callback){
    var req = http.request({
        host: host,
        port: 443,
        path: path,
        //pfx: pfx,
        method: 'POST'
    }, function(res) {
        var content = '';
        res.on('data', function(chunk) {
            content += chunk;
        });
        res.on('end', function(){
            callback(null, content);
        });
    });

    req.on('error', function(e) {
        callback(e);
    });
    req.write(data);
    req.end();
};

exports.buildXml = function (obj) {
    var builder = new xml2js.Builder();
    var xml = builder.buildObject({xml:obj});
    return xml;
};

exports.httpget = function(host,urlpath,data,callback){
    var result = [];
    var size = 0;
    var options = {
        host: host,
        port: 443,
        path: urlpath,
        method: 'GET',
        headers:{
            'accept': '*/*',
            'content-type': "application/json",
            'accept-encoding': 'utf-8'
        }
    };
    var req = http.request(options, function (res) {
//        equal(200, res.statusCode);
        res.on('data',function (chunk) {
            result.push(chunk);
            size += chunk.length;
        });
        res.on('end',function(){
            var buf = Buffer.concat(result,size);
            callback(buf,res.statusCode);
        })
    });
    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
        callback(null,304);
    });
    if(data != null){
        req.write(data + "\n");
    }
    req.end();
};
exports.httppost = function(host,urlpath,data,callback){
    data = JSON.stringify(data);
    var result = [];
    var size = 0;
    var options = {
        host: host,
        port: 443,
        path: urlpath,
        method: 'POST',
        headers:{
            'accept': '*/*',
            'content-type': "application/json",
            'accept-encoding': 'utf-8'
        }
    };
    var req = http.request(options, function (res) {
//        equal(200, res.statusCode);
        res.on('data',function (chunk) {
            result.push(chunk);
            size += chunk.length;
        });
        res.on('end',function(){
            var buf = Buffer.concat(result,size);
            callback(buf,res.statusCode);
        })
    });
    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
        callback(null,res.statusCode);
    });
    if(data != null){
        req.write(data + "\n");
    }
    req.end();
};