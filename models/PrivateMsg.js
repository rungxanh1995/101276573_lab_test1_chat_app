const mongoose = require("mongoose");
const COLLECTION_NAME = "private_messages";

const PrivateMsgSchema = new mongoose.Schema({
	fromUser: {
		type: String,
		required: true
	},
	toUser: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	},
	dateSent: {
		type: Date,
		default: Date.now()
	}
});

const PrivateMsg = mongoose.model('private_msg', PrivateMsgSchema, COLLECTION_NAME);
module.exports = PrivateMsg;
