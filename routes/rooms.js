var express = require('express');
var router = express.Router();
var utils = require('../util/utils.js');
var Room = require('../models/room.js');

/* GET rooms listing. */
router.get('/', function(req, res, next) {
	Room.getRooms(function(rooms){
		res.render('rooms', {
			title: 'Rooms',
			rooms: rooms
		});
	});
});

router.post('/', function(req, res, next) {
	var name = req.body.name;
	Room.createNew(name, function(result) {
		if (result.code === 200) {
			utils.sendSuccessResponse(res);
		} else {
			utils.sendErrResponse(res, result.code, result.err);
		}
	});
});

module.exports = router;
