var express = require('express');
var router = express.Router();
var fs = require('fs');
var folder = __dirname + '/../conf/';

/* GET users listing. */
router.get('/:file', function(req, res, next) {
  var file = req.params.file;
  fs.readFile(folder + file + '.json', 'utf8', function(err, data) {
		res.json(JSON.parse(data));
	});
});
					 
module.exports = router;
