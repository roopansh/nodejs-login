var mongoose = require('mongoose')

// mongoose schema for UsersModel
var UsersSchema = mongoose.Schema({
	username : {type: String, index: true, unique: true},
	password : String,
	firstname : String,
	lastname : String,
	lastlogin : {type: Date, default : Date.now}
});

// model/collection 
var Users = mongoose.model('Users', UsersSchema);
module.exports = Users