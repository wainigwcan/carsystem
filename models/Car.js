var mongoose = require("mongoose");

var schema = new mongoose.Schema({
	"id": Number,
	"brand": String,
	"series_name": String,
	"type": String,
	"seat": String,
	"color": String,
	"image": String,
	"directory": String,
	"province": String,
	"engine": String,
	"paifang": String,
	"biansuxiang": String,
	"price": Number,
	"km": Number,
	"goumaidate": String,
	"saler": String,
	"detail": String,
	"colorEnglist": String
});

module.exports = mongoose.model("Car", schema);