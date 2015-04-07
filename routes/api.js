var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');

var FormatedData = require('../models/formatedData');
var MotionData = require('../models/motionData');

router.get('/formatedData/:cookie', function(req, res) {
	FormatedData.find({"type": "Temperature", "name": req.params.cookie}).sort("-timestamp").limit(24).exec(function(err, data) {
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

router.get('/motions', function(req, res) {
    var startDate =  moment().hours(0).minutes(0).seconds(0).subtract(6, 'days');
    console.log(startDate.toString());
    console.log(moment().toString());
    FormatedData.find({'name': 'Double Anooshaboor', 'type': 'Accelerometer'}).sort("timestamp").exec(function(err, data) {
      if(err) {
        return res.json(err);
      }
      if(!data) {
        return res.json({message: 'There is no data available'});
      }
      else {
      	console.log(data);
        var dataList = {
          'day': [],
          'number': []
        };

        var dayCorrespondance = ['Sunday', 'Monday', 'Tuesday', 'Wedneday','Thursday', 'Friday', 'Saturday'];

        for(i = 0; i < 7; i++) {
          var count = 0;
          var temp = moment().hours(0).minutes(0).seconds(0).subtract(i, 'days').weekday();
          data.forEach(function(item) {
            if(moment(item.date).weekday() == temp) {
              count ++;
            }
          });
          dataList.day.unshift(dayCorrespondance[temp]);
          dataList.number.unshift(count/7);
        }

        return res.json(dataList);
      }
    });
  });

module.exports = router;

