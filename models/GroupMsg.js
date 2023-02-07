const mongoose = require("mongoose");
const COLLECTION_NAME = "group_messages";

const GroupMsgSchema = new mongoose.Schema({
	fromUser: {
		type: String,
		required: true
	},
	room: {
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

const GroupMsg = mongoose.model('private_msg', GroupMsgSchema, COLLECTION_NAME);
module.exports = GroupMsg;
