var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var FormatedData = require('../models/formatedData');
var MotionData = require('../models/motionData');

router.get('/formatedData/:cookie', function(req, res) {
	FormatedData.find({"type": "Temperature", "name": req.params.cookie}).sort("-timestamp").limit(384).exec(function(err, data) {
		if(err) {
			console.log(err);
		}	
		else if(!data) {
			console.log('empty');
		}
		else {
			console.log(data);
			var dataList = [];
			data.forEach(function(item) {
				if(new Date(item.timestamp) != 'Invalid Date') {
					var temp = {'x': '', 'y': ''};
					temp.x = new Date(item.timestamp);
					temp.y = item.valueCelsius;
					dataList.unshift(temp);
				}
			});
			res.json(dataList);
		}
	});
});

router.get('/motionData', function(req, res) {
	MotionData.find().sort("-date").exec(function(err, data) {
		if(err) {
			console.log(err);
		}	
		else if(!data) {
			console.log('empty');
		}
		else {
			console.log(data);
			res.json(data);
		}
	});
});

module.exports = router;

