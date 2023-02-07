const mongoose = require("mongoose");
const COLLECTION_NAME = "chat_users";
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const ChatUserSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
		trim: true
	},
	firstName: {
		type: String,
		required: false,
		trim: true
	},
	lastName: {
		type: String,
		required: false,
		trim: true
	},
	password: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
});

ChatUserSchema.pre("save", function(next) {
	const user = this;
	if (!user.isModified("password")) return next();
	
	bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
		if (err) return next(err);
		
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) return next(err);
			
			user.password = hash;
			next();
		});
	});
});

const ChatUser = mongoose.model('chat_user', ChatUserSchema, COLLECTION_NAME);
module.exports = ChatUser;
