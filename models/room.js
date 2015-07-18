var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var roomSchema = new Schema({
    roomNumber: Number,
    cuisines: [],
    prices: [],
    allergies: [],
    members: [],
    name: String
});

roomSchema.statics.getRooms = function(callback) {
    Room.find({}, function(err, rooms){
        callback(rooms);
    });
};

// create new room
roomSchema.statics.createNew = function(name, callback) {
    Room.findOne({name: name}, function(err, room) {
        if (err) {
            callback({code: 500, err: 'Unknown error'});
        } else if (room) {
            callback({code: 403, err: 'The room "' + name + '" is already taken.'});
        } else {
            Room.update({name: name},
                        {$setOnInsert: {name: name}},
                        {upsert: true}, function(err, room) {
                            if (err) {
                                callback({code: 500, err: 'Unknown error'});
                            } else {
                                callback({code: 200, data: room});
                            }
            });
        }
    });
};


// delete room
roomSchema.statics.deleteRoom = function(name) {
    Room.findOne({name: name}, function(err, room) {
        if (err) {
            callback({code: 500, err: "Unknown error"});
        } else if (!room) {
            callback({code: 404, err: "Comment not found"});
        } else {
            room.remove(function(err, result){
                if (err) {
                    callback({code: 500, err: "Could not delete room"});
                } else {
                    callback({code: 200, data: result});
                }
            });
        }
    });
};

var Room = mongoose.model('Room', roomSchema);
module.exports = Room;