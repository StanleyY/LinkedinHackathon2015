var express = require('express');
var router = express.Router();
var utils = require('../util/utils.js');
var Room = require('../models/room.js');

/* GET rooms listing. */
router.get('/:id', function(req, res, next) {
	console.log(req.params.id);
	/*
	Room.findOne({"roomNumber": req.params.id}, function(err, room) {
		console.log(room);
	});
	*/
	res.render('preferences', {groupNumber: req.params.id});

});;

router.post('/', function(req, res, next) {
		var name = req.body.groupName;
		var roomNumber = Math.round(100 + Math.random()*899);
	var newRoom = new Room({
		"name":name,
		"roomNumber": roomNumber});
	newRoom.save(function(err, room){
		if(err){console.log("error")}
	});
	res.json({"roomNumber":roomNumber});
});

router.get('/:id/info', function(req, res) {
	var id = req.params.id;
	Room.getRoomById(id, function(result) {
		if (result.code === 200) {
			var room = result.data;
			res.render('room', {
				title: room.name,
				room: room
			})
		} else {
			utils.sendErrResponse(res, result.code, result.err);
		}
	});
});

router.post('/:id', function(req, res) {
	console.log(req.body);
	var id = req.params.id;
	var username = req.body.name;
	var cuisines = req.body['cuisines[]'];
	var prices = req.body['prices[]'];
	console.log(id);
	console.log(username);
	console.log(cuisines);
	console.log(prices);
	Room.addPreferences(id, username, cuisines, prices, function(result) {
		if (result.code === 200) {
			utils.sendSuccessResponse(res);
		} else {
			utils.sendErrResponse(res, result.code, result.err);
		}
	});
});

module.exports = router;
