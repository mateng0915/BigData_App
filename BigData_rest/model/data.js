var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var PubNub = require('pubnub');

var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/ctra'
var helper = require('../utils/helper');
var xhr = require("xhr");
var request = require('xhr-request');

var pubnub = new PubNub({
	publishKey: 'pub-c-e676b791-6734-46b4-b379-d87da1391507',
	subscribeKey: 'sub-c-db0b4226-0c9c-11e8-b857-da98488f5703'
});

router.get('/',function(req, res){
	mongoClient.connect(url, function(err, db){
		db.collection('bitcoin').find({}).toArray(function(err, result) {
			if (err) throw err;
			else {
				res.status(200)
					.json({
						status:'success',
						data:result,
						message:'Retrieved all'
					});
			}
			db.close();
		});
	});
});

router.post('/',function(req,res){
	console.log('in');
	
	var getBitCointData = function getData() {
		request('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD',{
			json: true
		},function(err ,data){
			if (err) throw err;
			else {
				console.log(data);
				mongoClient.connect(url, function(err,db){
					db.collection('bitcoin').insert(data,function(err,result){
						if (err) throw err;
						db.close();
					});
				});
			}
		})
	}
	setInterval(getBitCointData,5000);
});

module.exports.router = router;
