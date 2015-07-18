var express = require('express');
var router = express.Router();
var utils = require('../util/utils.js');
var Room = require('../models/room.js');

/* GET rooms listing. */
router.get('/:id', function(req, res, next) {
	console.log(req.params.id);
	Room.findOne({"roomNumber": req.params.id}, function(err, room) {
		console.log(room);
	});
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

module.exports = router;
